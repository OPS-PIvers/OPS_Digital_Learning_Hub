import re
import sys

content = open('Gems.html').read()

modal_body = """
            <!-- Modal Body -->
            <div id="modalBody" class="p-6 space-y-6 max-h-[70vh] overflow-y-auto">

                <!-- 1. Grade Level -->
                <div id="field-grade-level" class="field-container hidden">
                    <label for="gradeLevel" class="block text-sm font-medium text-ops-gray-body mb-2">Grade Level</label>
                    <input type="number" id="gradeLevel" placeholder="e.g. 5"
                        class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-ops-primary focus:border-ops-primary outline-none transition-all">
                </div>

                <!-- 2. Subject -->
                <div id="field-subject" class="field-container hidden">
                    <label for="subject" class="block text-sm font-medium text-ops-gray-body mb-2">Subject / Content Area</label>
                    <input type="text" id="subject" placeholder="e.g. Math, Science, ELA"
                        class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-ops-primary focus:border-ops-primary outline-none transition-all">
                </div>

                <!-- 3. Topic -->
                <div id="field-topic" class="field-container hidden">
                    <label for="topic" class="block text-sm font-medium text-ops-gray-body mb-2">Topic / Learning Objective</label>
                    <input type="text" id="topic" placeholder="e.g. Photosynthesis, Civil War"
                        class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-ops-primary focus:border-ops-primary outline-none transition-all">
                </div>

                <!-- 4. Additional Details -->
                <div id="field-additional-details" class="field-container hidden">
                    <label for="additionalInfo" class="block text-sm font-medium text-ops-gray-body mb-2">Additional Info / Description</label>
                    <textarea id="additionalInfo" rows="3" placeholder="e.g. Focus on vocabulary, include a creative writing prompt..."
                        class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-ops-primary focus:border-ops-primary outline-none transition-all resize-none"></textarea>
                </div>

                <!-- 5. Level of Detail -->
                <div id="field-level-of-detail" class="field-container hidden">
                    <label for="detailSlider" class="block text-sm font-medium text-ops-gray-body mb-2">Level of Detail</label>
                    <div class="space-y-2">
                        <div class="flex items-center justify-between text-xs text-ops-gray-primary font-medium px-1">
                            <span>Visual / Simple</span>
                            <span>Text / Complex</span>
                        </div>
                        <input type="range" id="detailSlider" min="1" max="5" step="1" value="3"
                            oninput="updateSliderLabel(this.value)"
                            class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-ops-primary">
                        <p id="sliderLabel" class="text-sm text-center text-ops-primary font-medium mt-2">
                            Moderate text complexity with visuals
                        </p>
                    </div>
                </div>

                <!-- 6. Student Interests -->
                <div id="field-student-interests" class="field-container hidden">
                    <label for="interests" class="block text-sm font-medium text-ops-gray-body mb-2">Student Interests</label>
                    <input type="text" id="interests" placeholder="e.g. Video games, animals, space explorer"
                        class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-ops-primary focus:border-ops-primary outline-none transition-all">
                </div>

                <!-- 7. Prior Knowledge -->
                <div id="field-prior-knowledge" class="field-container hidden">
                    <label for="priorKnowledge" class="block text-sm font-medium text-ops-gray-body mb-2">Prior Knowledge</label>
                    <input type="text" id="priorKnowledge" placeholder="What do they already know?"
                        class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-ops-primary focus:border-ops-primary outline-none transition-all">
                </div>

                <!-- 8. Assessment Type -->
                <div id="field-assessment-type" class="field-container hidden">
                    <label for="assessmentType" class="block text-sm font-medium text-ops-gray-body mb-2">Assessment Type</label>
                    <input type="text" id="assessmentType" placeholder="e.g. Multiple choice, rubric, exit ticket"
                        class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-ops-primary focus:border-ops-primary outline-none transition-all">
                </div>

                <!-- 9. Standards -->
                <div id="field-standards" class="field-container hidden">
                    <label for="standards" class="block text-sm font-medium text-ops-gray-body mb-2">Standards Alignment</label>
                    <input type="text" id="standards" placeholder="e.g. Common Core, State Standards"
                        class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-ops-primary focus:border-ops-primary outline-none transition-all">
                </div>

                <!-- 10. ELL Support -->
                <div id="field-ell-support" class="field-container hidden">
                    <label for="ellSupport" class="block text-sm font-medium text-ops-gray-body mb-2">ELL / Language Support</label>
                    <input type="text" id="ellSupport" placeholder="e.g. Visual aids, simplified vocabulary"
                        class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-ops-primary focus:border-ops-primary outline-none transition-all">
                </div>

                <!-- 11. Accommodations -->
                <div id="field-accommodations" class="field-container hidden">
                    <label for="accommodations" class="block text-sm font-medium text-ops-gray-body mb-2">Accommodations / Modifications</label>
                    <input type="text" id="accommodations" placeholder="e.g. Extended time, text-to-speech"
                        class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-ops-primary focus:border-ops-primary outline-none transition-all">
                </div>

                <!-- 12. Tone / Style -->
                <div id="field-tone-style" class="field-container hidden">
                    <label for="toneStyle" class="block text-sm font-medium text-ops-gray-body mb-2">Tone / Style</label>
                    <input type="text" id="toneStyle" placeholder="e.g. Humorous, Professional, Encouraging"
                        class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-ops-primary focus:border-ops-primary outline-none transition-all">
                </div>

                <!-- 13. Target Audience -->
                <div id="field-target-audience" class="field-container hidden">
                    <label for="targetAudience" class="block text-sm font-medium text-ops-gray-body mb-2">Target Audience</label>
                    <input type="text" id="targetAudience" placeholder="e.g. Students, Parents, Teachers"
                        class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-ops-primary focus:border-ops-primary outline-none transition-all">
                </div>

                <!-- 14. Output Format -->
                <div id="field-output-format" class="field-container hidden">
                    <label for="outputFormat" class="block text-sm font-medium text-ops-gray-body mb-2">Output Format</label>
                    <input type="text" id="outputFormat" placeholder="e.g. Table, List, Paragraph, Slides outline"
                        class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-ops-primary focus:border-ops-primary outline-none transition-all">
                </div>

                <!-- 15. Resource Checkbox -->
                <div id="field-resource" class="field-container flex items-center hidden">
                    <input type="checkbox" id="hasResource" class="h-4 w-4 text-ops-primary focus:ring-ops-primary border-gray-300 rounded cursor-pointer">
                    <label for="hasResource" class="ml-2 block text-sm text-ops-gray-body cursor-pointer select-none">
                        Provide a specific resource? (This will be attached later)
                    </label>
                </div>

            </div>
"""

start_tag = "<!-- Modal Body -->"
end_tag = "<!-- Modal Footer -->"
pattern = re.compile(re.escape(start_tag) + ".*?" + re.escape(end_tag), re.DOTALL)
content = pattern.sub(start_tag + modal_body + end_tag, content)

with open('Gems.html', 'w') as f:
    f.write(content)
