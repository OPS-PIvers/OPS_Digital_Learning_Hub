import re
import sys

content = open('Gems.html').read()

new_script = r"""
    <script>
        let currentTargetUrl = '';
        let currentGemTitle = '';
        let activeFieldIds = [];

        const detailLevels = {
            1: "Visual-based with little to no text",
            2: "Simple sentences with supporting visuals",
            3: "Moderate text complexity with visuals",
            4: "Detailed text with some visuals",
            5: "Comprehensive, robust text analysis"
        };

        const fieldMapping = {
            'Grade Level': { containerId: 'field-grade-level', inputId: 'gradeLevel', label: 'Grade Level' },
            'Subject': { containerId: 'field-subject', inputId: 'subject', label: 'Subject / Content Area' },
            'Topic': { containerId: 'field-topic', inputId: 'topic', label: 'Topic / Learning Objective' },
            'Additional Details': { containerId: 'field-additional-details', inputId: 'additionalInfo', label: 'Additional Details' },
            'Level of Detail': { containerId: 'field-level-of-detail', inputId: 'detailSlider', label: 'Level of Detail' },
            'Student Interests': { containerId: 'field-student-interests', inputId: 'interests', label: 'Student Interests' },
            'Prior Knowledge': { containerId: 'field-prior-knowledge', inputId: 'priorKnowledge', label: 'Prior Knowledge' },
            'Assessment Type': { containerId: 'field-assessment-type', inputId: 'assessmentType', label: 'Assessment Type' },
            'Standards': { containerId: 'field-standards', inputId: 'standards', label: 'Standards' },
            'ELL Support': { containerId: 'field-ell-support', inputId: 'ellSupport', label: 'ELL Support' },
            'Accommodations': { containerId: 'field-accommodations', inputId: 'accommodations', label: 'Accommodations' },
            'Tone/Style': { containerId: 'field-tone-style', inputId: 'toneStyle', label: 'Tone / Style' },
            'Target Audience': { containerId: 'field-target-audience', inputId: 'targetAudience', label: 'Target Audience' },
            'Output Format': { containerId: 'field-output-format', inputId: 'outputFormat', label: 'Output Format' },
            'Resource': { containerId: 'field-resource', inputId: 'hasResource', label: 'Resource Attachment' }
        };

        const defaultOptions = ['Grade Level', 'Subject', 'Topic', 'Additional Details', 'Level of Detail', 'Resource'];

        function openModal(url, title, options) {
            currentTargetUrl = url;
            currentGemTitle = title;

            // Reset all fields and hide containers
            Object.values(fieldMapping).forEach(mapping => {
                const container = document.getElementById(mapping.containerId);
                const input = document.getElementById(mapping.inputId);
                if (container) container.classList.add('hidden');
                if (input) {
                    if (input.type === 'checkbox') input.checked = false;
                    else if (input.type === 'range') input.value = 3;
                    else input.value = '';
                }
            });
            updateSliderLabel(3);

            // Determine which options to show
            let optionsToShow = options ? options.split(',').map(o => o.trim()) : defaultOptions;
            activeFieldIds = [];

            optionsToShow.forEach(optionName => {
                const mapping = fieldMapping[optionName];
                if (mapping) {
                    const container = document.getElementById(mapping.containerId);
                    if (container) {
                        container.classList.remove('hidden');
                        if (mapping.containerId === 'field-resource') {
                            container.classList.add('flex');
                        }
                        activeFieldIds.push(optionName);
                    }
                }
            });

            document.getElementById('gemModal').classList.remove('hidden');
        }

        function closeModal() {
            document.getElementById('gemModal').classList.add('hidden');
        }

        function updateSliderLabel(val) {
            const label = detailLevels[val] || detailLevels[3];
            const labelElement = document.getElementById('sliderLabel');
            if (labelElement) labelElement.innerText = label;
        }

        async function launchGem(event) {
            let promptParts = [];
            const nl = String.fromCharCode(10);

            activeFieldIds.forEach(optionName => {
                const mapping = fieldMapping[optionName];
                const input = document.getElementById(mapping.inputId);
                if (input) {
                    let val = '';
                    if (input.type === 'checkbox') {
                        val = input.checked ? 'I will provide a resource to attach.' : 'No additional resource will be provided.';
                    } else if (input.type === 'range') {
                        val = detailLevels[input.value];
                    } else {
                        val = input.value.trim();
                    }

                    if (val) {
                        promptParts.push(`- **${mapping.label}:** ${val}`);
                    }
                }
            });

            // Construct robust prompt
            let finalPrompt = `I am using the "${currentGemTitle}" Gem to assist me. Here is the context for my request:` + nl + nl + `### Context` + nl;

            if (promptParts.length > 0) {
                finalPrompt += promptParts.join(nl);
            } else {
                finalPrompt += "No specific context provided.";
            }

            finalPrompt += nl + nl + `### Instructions` + nl + `Please use the context provided above to generate a high-quality, relevant response. Let's get started!`;

            if (currentTargetUrl) {
                let baseUrl = currentTargetUrl;
                try {
                    const urlObj = new URL(currentTargetUrl);
                    baseUrl = urlObj.origin + urlObj.pathname;
                } catch (e) {
                    baseUrl = currentTargetUrl.split('?')[0];
                }

                const originalButton = event.currentTarget;
                const originalText = originalButton.textContent;
                let copySuccess = false;

                try {
                    await navigator.clipboard.writeText(finalPrompt);
                    copySuccess = true;
                } catch (err) {
                    try {
                        const textarea = document.createElement('textarea');
                        textarea.value = finalPrompt;
                        textarea.style.position = 'fixed';
                        textarea.style.left = '-9999px';
                        textarea.style.top = '-9999px';
                        document.body.appendChild(textarea);
                        textarea.select();
                        textarea.setSelectionRange(0, finalPrompt.length);
                        copySuccess = document.execCommand('copy');
                        document.body.removeChild(textarea);
                    } catch (fallbackErr) {
                        console.error('Clipboard failed:', fallbackErr);
                    }
                }

                if (copySuccess) {
                    originalButton.textContent = 'Copied! Opening...';
                    originalButton.disabled = true;
                    window.open(baseUrl, '_blank');
                    setTimeout(() => {
                        originalButton.textContent = originalText;
                        originalButton.disabled = false;
                        closeModal();
                    }, 1000);
                } else {
                    const userChoice = confirm('Unable to auto-copy. Click OK to see prompt or Cancel to open Gem without it.');
                    if (userChoice) alert('Copy this prompt:' + nl + nl + finalPrompt);
                    window.open(baseUrl, '_blank');
                    closeModal();
                }
            }
        }

        document.getElementById('gemModal').addEventListener('click', function(e) {
            if (e.target === this) closeModal();
        });
    </script>
"""

start_tag = "<script>"
end_tag = "</script>"
pattern = re.compile(re.escape(start_tag) + ".*?" + re.escape(end_tag), re.DOTALL)
content = pattern.sub(new_script, content)

with open('Gems.html', 'w') as f:
    f.write(content)
