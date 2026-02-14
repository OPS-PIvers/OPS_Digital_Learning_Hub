        function openModal(index) {
            const card = gemsData[index];
            if (!card) return;

            currentTargetUrl = card.url;
            currentGemTitle = card.title;
            const options = card.options;

            // Reset all fields and hide containers
            Object.values(fieldMapping).forEach(mapping => {
                const container = document.getElementById(mapping.containerId);
                const input = document.getElementById(mapping.inputId);
                if (container) {
                    container.classList.add('hidden');
                    container.classList.remove('flex');
                }
                if (input) {
                    if (input.type === 'checkbox') input.checked = false;
                    else if (input.type === 'range') input.value = 3;
                    else input.value = '';
                }
            });
            updateSliderLabel(3);

            // Determine which options to show - handles empty/whitespace and case-insensitivity
            let optionsToShow = (options && options.trim() !== "") ? options.split(',').map(o => o.trim()) : defaultOptions;
            activeFieldIds = [];

            optionsToShow.forEach(rawOption => {
                // Case-insensitive lookup against fieldMapping keys
                const optionName = Object.keys(fieldMapping).find(k => k.toLowerCase() === rawOption.toLowerCase());

                if (optionName) {
                    const mapping = fieldMapping[optionName];
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
