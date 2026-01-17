import type { Option, OptionId, Category, CategoryId } from '@/components/stack-builder/config';

/**
 * Recursively finds an option by its ID within a list of options (including sub-options)
 */
export function findOptionById(options: Option[], id: OptionId): Option | undefined {
    for (const option of options) {
        if (option.id === id) {
            return option;
        }
        if (option.subOptions) {
            const found = findOptionById(option.subOptions, id);
            if (found) {
                return found;
            }
        }
    }
    return undefined;
}

/**
 * Finds an option by ID across all categories
 */
export function findOptionInCategories(
    categories: Category[],
    optionId: OptionId
): { option: Option; category: Category } | undefined {
    for (const category of categories) {
        const option = findOptionById(category.options, optionId);
        if (option) {
            return { option, category };
        }
    }
    return undefined;
}

/**
 * Gets all descendant option IDs (sub-options and their sub-options, recursively)
 */
export function getDescendantOptionIds(option: Option): OptionId[] {
    const ids: OptionId[] = [];

    if (option.subOptions) {
        for (const subOption of option.subOptions) {
            ids.push(subOption.id);
            ids.push(...getDescendantOptionIds(subOption));
        }
    }

    return ids;
}

/**
 * Gets all option IDs from a category (including sub-options)
 */
export function getAllOptionIdsFromCategory(category: Category): OptionId[] {
    const ids: OptionId[] = [];

    for (const option of category.options) {
        ids.push(option.id);
        ids.push(...getDescendantOptionIds(option));
    }

    return ids;
}

/**
 * Flattens options list, injecting sub-options immediately after their parent
 * when the parent is selected. Used for rendering the options grid.
 */
export function flattenOptionsWithSubOptions(
    options: Option[],
    selectedIds: Set<OptionId>
): Option[] {
    const flattened: Option[] = [];

    for (const option of options) {
        flattened.push(option);

        // If this option is selected and has sub-options, inject them
        if (selectedIds.has(option.id) && option.subOptions) {
            flattened.push(...option.subOptions);
        }
    }

    return flattened;
}

/**
 * Checks if a category has any selected options (including sub-options)
 */
export function categoryHasSelection(
    category: Category,
    selectedIds: Set<OptionId>
): boolean {
    const allIds = getAllOptionIdsFromCategory(category);
    return allIds.some((id) => selectedIds.has(id));
}

/**
 * Builds a status map for all categories indicating which have selections
 */
export function buildCategoryStatusMap(
    categories: Category[],
    selectedIds: Set<OptionId>
): Map<CategoryId, boolean> {
    const status = new Map<CategoryId, boolean>();

    for (const category of categories) {
        status.set(category.id, categoryHasSelection(category, selectedIds));
    }

    return status;
}

/**
 * Counts how many categories have at least one selection
 */
export function countEnabledCategories(
    categories: Category[],
    selectedIds: Set<OptionId>
): number {
    return categories.filter((cat) => categoryHasSelection(cat, selectedIds)).length;
}
