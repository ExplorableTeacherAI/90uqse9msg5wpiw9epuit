import { ReactElement } from 'react';
import {
    EditableH1,
    EditableH2,
    EditableParagraph,
    InlineScrubbleNumber,
    InlineFormula,
    InlineTooltip,
} from '@/components/atoms';
import { StackLayout, SplitLayout } from '@/components/layouts';
import { Block } from '@/components/templates';
import { RecamanVisualization } from '@/components/atoms/visual/RecamanVisualization';
import { getVariableInfo, numberPropsFromDefinition } from '@/data/variables';

/**
 * Beautiful, interactive exploration of the Recamán Sequence
 * Designed for first-time learners of sequences
 */

export const recamanBlocks: ReactElement[] = [
    // ==========================================
    // SECTION 1: INTRODUCTION
    // ==========================================
    // The goal: hook them with the beauty of the visualization before explaining
    <StackLayout key="layout-intro" maxWidth="2xl">
        <Block id="block-intro-title" padding="lg">
            <EditableH1 id="h1-intro-title" blockId="block-intro-title">
                The Recamán Sequence: A Number That Spirals
            </EditableH1>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-intro-visual" maxWidth="2xl">
        <Block id="block-intro-visual" padding="lg">
            <RecamanVisualization
                maxTerms={50}
                width={750}
                height={350}
                arcColor="#3b82f6"
                pointColor="#0f172a"
            />
        </Block>
    </StackLayout>,

    <StackLayout key="layout-intro-text" maxWidth="2xl">
        <Block id="block-intro-text" padding="md">
            <EditableParagraph id="para-intro-text" blockId="block-intro-text">
                Watch the arcs above — they spiral outward, backward, and in unexpected directions. This beautiful pattern comes from a simple rule: start at 0, and at each step, try to move backward. If you can't (you'd hit zero or repeat a number), move forward instead. That's it. No formulas needed. Just a rule that creates something stunning.
            </EditableParagraph>
        </Block>
    </StackLayout>,

    // ==========================================
    // SECTION 2: WHAT IS A SEQUENCE?
    // ==========================================
    <StackLayout key="layout-sequence-intro" maxWidth="2xl">
        <Block id="block-sequence-intro-title" padding="md">
            <EditableH2 id="h2-sequence-intro" blockId="block-sequence-intro-title">
                What is a Sequence?
            </EditableH2>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-sequence-def" maxWidth="2xl">
        <Block id="block-sequence-def" padding="md">
            <EditableParagraph id="para-sequence-def" blockId="block-sequence-def">
                A sequence is simply a list of numbers that follow a rule. You start with a first number, then apply the rule again and again to generate the next number, then the next, and so on. Think of it like a machine: you feed in the current number, the machine applies the rule, and out comes the next number.
            </EditableParagraph>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-sequence-example" maxWidth="2xl">
        <Block id="block-sequence-example" padding="md">
            <EditableParagraph id="para-sequence-example" blockId="block-sequence-example">
                For instance, if the rule is "add 2 each time," starting from 1, you get: 1, 3, 5, 7, 9, ... Each number is exactly 2 more than the one before it. Simple, predictable, boring. The Recamán sequence, by contrast, doesn't always add. It {" "}
                <InlineTooltip
                    id="tooltip-contrast"
                    tooltip="The word 'oscillate' means to move back and forth, like a swing."
                    color="#8b5cf6"
                >
                    oscillates
                </InlineTooltip>
                {" "} between subtracting and adding, creating the spirals you see above.
            </EditableParagraph>
        </Block>
    </StackLayout>,

    // ==========================================
    // SECTION 3: THE RECAMÁN RULE
    // ==========================================
    <StackLayout key="layout-rule-title" maxWidth="2xl">
        <Block id="block-rule-title" padding="md">
            <EditableH2 id="h2-rule-title" blockId="block-rule-title">
                The Recamán Rule
            </EditableH2>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-rule-step1" maxWidth="2xl">
        <Block id="block-rule-step1" padding="md">
            <EditableParagraph id="para-rule-step1" blockId="block-rule-step1">
                <strong>Step 1: Start at 0.</strong> The first term in the Recamán sequence is always {" "}
                <InlineFormula
                    id="formula-start"
                    latex="a_0 = 0"
                />
                .
            </EditableParagraph>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-rule-step2" maxWidth="2xl">
        <Block id="block-rule-step2" padding="md">
            <EditableParagraph id="para-rule-step2" blockId="block-rule-step2">
                <strong>Step 2: Try to subtract.</strong> To find the next term, take the current term and subtract the step number. So if you're at step n, you try to compute {" "}
                <InlineFormula
                    id="formula-subtract"
                    latex="a_{n-1} - n"
                />
                .
            </EditableParagraph>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-rule-step3" maxWidth="2xl">
        <Block id="block-rule-step3" padding="md">
            <EditableParagraph id="para-rule-step3" blockId="block-rule-step3">
                <strong>Step 3: The catch.</strong> But there are two rules you must follow: the result must be <strong>positive</strong> (greater than zero), and it must be a number you <strong>haven't seen before</strong> in the sequence. If either rule is broken, you don't subtract — you {" "}
                <InlineFormula
                    id="formula-add"
                    latex="add"
                />
                {" "} instead: {" "}
                <InlineFormula
                    id="formula-add-expr"
                    latex="a_{n-1} + n"
                />
                .
            </EditableParagraph>
        </Block>
    </StackLayout>,

    // ==========================================
    // SECTION 4: WATCH IT GROW
    // ==========================================
    <StackLayout key="layout-grow-title" maxWidth="2xl">
        <Block id="block-grow-title" padding="md">
            <EditableH2 id="h2-grow-title" blockId="block-grow-title">
                Watch the Sequence Grow
            </EditableH2>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-grow-instruction" maxWidth="2xl">
        <Block id="block-grow-instruction" padding="md">
            <EditableParagraph id="para-grow-instruction" blockId="block-grow-instruction">
                Drag the number below to see how the sequence grows. Start small, then watch it spiral outward as you add more terms. The spirals appear because the sequence keeps bouncing between moving backward and moving forward.
            </EditableParagraph>
        </Block>
    </StackLayout>,

    <SplitLayout key="layout-grow-split" maxWidth="2xl" ratio={45}>
        <Block id="block-grow-control" padding="md">
            <EditableParagraph id="para-grow-control" blockId="block-grow-control">
                Number of terms: {" "}
                <InlineScrubbleNumber
                    id="scrubble-numterms"
                    varName="numTerms"
                    {...numberPropsFromDefinition(getVariableInfo('numTerms'))}
                />
            </EditableParagraph>
        </Block>
        <Block id="block-grow-viz" padding="md">
            <RecamanVisualization
                maxTerms={100}
                width={500}
                height={350}
                arcColor="#3b82f6"
                pointColor="#0f172a"
            />
        </Block>
    </SplitLayout>,

    // ==========================================
    // SECTION 5: WHY DOES IT SPIRAL?
    // ==========================================
    <StackLayout key="layout-spiral-title" maxWidth="2xl">
        <Block id="block-spiral-title" padding="md">
            <EditableH2 id="h2-spiral-title" blockId="block-spiral-title">
                Why Does It Spiral?
            </EditableH2>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-spiral-explanation" maxWidth="2xl">
        <Block id="block-spiral-explanation" padding="md">
            <EditableParagraph id="para-spiral-explanation" blockId="block-spiral-explanation">
                The spiraling pattern reveals the heart of the Recamán rule. At each step, the sequence wants to go backward (subtract), pulling the path toward smaller numbers. But as steps get larger, the subtraction often becomes impossible — the next number has already appeared, or you'd go negative. So the sequence leaps forward (adds), creating the arcs that seem to reach out and back. The result is a never-settling dance between backward and forward, generating a pattern of breathtaking beauty.
            </EditableParagraph>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-spiral-insight" maxWidth="2xl">
        <Block id="block-spiral-insight" padding="md">
            <EditableParagraph id="para-spiral-insight" blockId="block-spiral-insight">
                This sequence was discovered by Bernardo Recamán in 1974 and has fascinated mathematicians ever since. One of the great unsolved questions: <strong>does the sequence contain every positive integer?</strong> We don't know yet. Some sequences hide their secrets for decades.
            </EditableParagraph>
        </Block>
    </StackLayout>,

    // ==========================================
    // SECTION 6: THE FIRST FEW TERMS (Concrete Example)
    // ==========================================
    <StackLayout key="layout-terms-title" maxWidth="2xl">
        <Block id="block-terms-title" padding="md">
            <EditableH2 id="h2-terms-title" blockId="block-terms-title">
                Let's Trace the First Few Terms
            </EditableH2>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-terms-a0" maxWidth="2xl">
        <Block id="block-terms-a0" padding="md">
            <EditableParagraph id="para-terms-a0" blockId="block-terms-a0">
                <strong>n = 0:</strong> {" "}
                <InlineFormula
                    id="formula-a0"
                    latex="a_0 = 0"
                />
                {" "} (by definition, we start at 0)
            </EditableParagraph>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-terms-a1" maxWidth="2xl">
        <Block id="block-terms-a1" padding="md">
            <EditableParagraph id="para-terms-a1" blockId="block-terms-a1">
                <strong>n = 1:</strong> We're at 0. Try {" "}
                <InlineFormula
                    id="formula-a1-try"
                    latex="0 - 1 = -1"
                />
                {". "}
                Negative! Not allowed. So we add: {" "}
                <InlineFormula
                    id="formula-a1-result"
                    latex="a_1 = 0 + 1 = 1"
                />
            </EditableParagraph>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-terms-a2" maxWidth="2xl">
        <Block id="block-terms-a2" padding="md">
            <EditableParagraph id="para-terms-a2" blockId="block-terms-a2">
                <strong>n = 2:</strong> We're at 1. Try {" "}
                <InlineFormula
                    id="formula-a2-try"
                    latex="1 - 2 = -1"
                />
                {". "}
                Negative again. Add: {" "}
                <InlineFormula
                    id="formula-a2-result"
                    latex="a_2 = 1 + 2 = 3"
                />
            </EditableParagraph>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-terms-a3" maxWidth="2xl">
        <Block id="block-terms-a3" padding="md">
            <EditableParagraph id="para-terms-a3" blockId="block-terms-a3">
                <strong>n = 3:</strong> We're at 3. Try {" "}
                <InlineFormula
                    id="formula-a3-try"
                    latex="3 - 3 = 0"
                />
                {". "}
                Zero we've already seen! Can't repeat. Add: {" "}
                <InlineFormula
                    id="formula-a3-result"
                    latex="a_3 = 3 + 3 = 6"
                />
            </EditableParagraph>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-terms-a4" maxWidth="2xl">
        <Block id="block-terms-a4" padding="md">
            <EditableParagraph id="para-terms-a4" blockId="block-terms-a4">
                <strong>n = 4:</strong> We're at 6. Try {" "}
                <InlineFormula
                    id="formula-a4-try"
                    latex="6 - 4 = 2"
                />
                {". "}
                Positive, and we haven't seen 2 before. Success! {" "}
                <InlineFormula
                    id="formula-a4-result"
                    latex="a_4 = 2"
                />
            </EditableParagraph>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-terms-sequence" maxWidth="2xl">
        <Block id="block-terms-sequence" padding="md">
            <EditableParagraph id="para-terms-sequence" blockId="block-terms-sequence">
                So the sequence begins: <strong>0, 1, 3, 6, 2, ...</strong> And it continues with the same rule, bouncing backward and forward, creating the spirals.
            </EditableParagraph>
        </Block>
    </StackLayout>,

    // ==========================================
    // SECTION 7: CLOSING
    // ==========================================
    <StackLayout key="layout-closing" maxWidth="2xl">
        <Block id="block-closing" padding="md">
            <EditableParagraph id="para-closing" blockId="block-closing">
                The Recamán Sequence teaches us that beauty and mystery hide in simple rules. A rule that says "go backward if you can, forward if you must" creates a visual structure that still puzzles mathematicians. Some numbers in the sequence have been computed up to millions of terms — and the spirals never settle into a pattern. Keep the rule simple. Let the patterns emerge.
            </EditableParagraph>
        </Block>
    </StackLayout>,
];

export default recamanBlocks;
