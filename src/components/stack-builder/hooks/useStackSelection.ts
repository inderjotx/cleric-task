import { useState, useCallback, useMemo } from 'react';
import {
    type OptionId,
    type CategoryId,
    type AssessmentLevel,
    STACK_CONFIG,
    getAssessmentLevel,
} from '@/components/stack-builder/config';
import {
    findOptionById,
    getDescendantOptionIds,
    buildCategoryStatusMap,
    countEnabledCategories,
} from '@/components/stack-builder/utils/optionTree';

export type FlowStep = 'select' | 'connect' | 'success';

export interface UseStackSelectionReturn {
    /** Set of currently selected option IDs */
    selectedOptions: Set<OptionId>;
    /** Toggle an option's selection state */
    toggle: (optionId: OptionId, categoryId: CategoryId) => void;
    /** Map of category ID to whether it has any selections */
    categoryStatus: Map<CategoryId, boolean>;
    /** Current assessment level based on enabled categories */
    assessmentLevel: AssessmentLevel;
    /** Number of categories with at least one selection */
    enabledCategoriesCount: number;
    /** Current step in the flow */
    currentStep: FlowStep;
    /** Navigate to the connect form */
    goToConnect: () => void;
    /** Navigate back to stack selection */
    goToSelect: () => void;
    /** Navigate to success state */
    goToSuccess: () => void;
    /** Reset all state and start over */
    resetState: () => void;
    /** Whether user can proceed to connect (2+ categories selected) */
    canContinue: boolean;
}

export function useStackSelection(): UseStackSelectionReturn {
    const [selectedOptions, setSelectedOptions] = useState<Set<OptionId>>(new Set());
    const [currentStep, setCurrentStep] = useState<FlowStep>('select');

    const toggle = useCallback((optionId: OptionId, categoryId: CategoryId) => {
        setSelectedOptions((prev) => {
            const next = new Set(prev);
            const isCurrentlySelected = next.has(optionId);

            const category = STACK_CONFIG.find((c) => c.id === categoryId);
            if (!category) {
                return prev;
            }

            const optionConfig = findOptionById(category.options, optionId);

            if (isCurrentlySelected) {
                next.delete(optionId);

                if (optionConfig) {
                    const descendantIds = getDescendantOptionIds(optionConfig);
                    descendantIds.forEach((id) => next.delete(id));
                }
            } else {
                // Select the option
                if (category.multiSelect) {
                    // Multi-select: just add the new option
                    next.add(optionId);
                } else {
                    // Single-select: deselect all other options in this category first
                    for (const opt of category.options) {
                        next.delete(opt.id);
                        const descendants = getDescendantOptionIds(opt);
                        descendants.forEach((id) => next.delete(id));
                    }
                    next.add(optionId);
                }
            }

            return next;
        });
    }, []);

    const categoryStatus = useMemo(
        () => buildCategoryStatusMap(STACK_CONFIG, selectedOptions),
        [selectedOptions]
    );

    const enabledCategoriesCount = useMemo(
        () => countEnabledCategories(STACK_CONFIG, selectedOptions),
        [selectedOptions]
    );

    const assessmentLevel = useMemo(
        () => getAssessmentLevel(enabledCategoriesCount),
        [enabledCategoriesCount]
    );

    const canContinue = enabledCategoriesCount >= 2;

    const goToConnect = useCallback(() => {
        if (canContinue) {
            setCurrentStep('connect');
        }
    }, [canContinue]);

    const goToSelect = useCallback(() => {
        setCurrentStep('select');
    }, []);

    const goToSuccess = useCallback(() => {
        setCurrentStep('success');
    }, []);

    const resetState = useCallback(() => {
        setSelectedOptions(new Set());
        setCurrentStep('select');
    }, []);

    return {
        selectedOptions,
        toggle,
        categoryStatus,
        assessmentLevel,
        enabledCategoriesCount,
        currentStep,
        goToConnect,
        goToSelect,
        goToSuccess,
        resetState,
        canContinue,
    };
}
