import { memo, useMemo } from "react";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import type { Category, Option, OptionId, CategoryId } from "./config";
import { flattenOptionsWithSubOptions } from "./utils/optionTree";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useStackBuilder } from "./context/StackBuilderContext";

interface StackCategoryProps {
  category: Category;
}

interface OptionItemProps {
  option: Option;
  categoryId: CategoryId;
  isSelected: boolean;
  onToggle: (optionId: OptionId, categoryId: CategoryId) => void;
}

const OptionItem = memo(
  ({ option, categoryId, isSelected, onToggle }: OptionItemProps) => {
    const handleCheckedChange = () => {
      onToggle(option.id, categoryId);
    };

    return (
      <Label
        htmlFor={option.id}
        className={cn(
          "flex cursor-pointer items-center space-x-1 rounded-md border p-2.5 transition-colors min-h-[44px] pl-4",
          isSelected
            ? "border-primary bg-primary/5"
            : "border-border hover:bg-muted"
        )}
      >
        <Checkbox
          id={option.id}
          checked={isSelected}
          onCheckedChange={handleCheckedChange}
          className="sr-only"
        />

        {/* Icon */}
        <div className="shrink-0">
            <img
              src={option.image}
              alt={option.label}
              className="h-4 w-auto"
            />
        </div>

        {/* Label & Coming Soon Badge */}
        <div className="flex-1 min-w-0 flex items-center gap-1.5">
          <h5 className="text-xs font-medium leading-tight">{option.label}</h5>
          {option.comingSoon && (
            <span className="inline-flex items-center gap-0.5 rounded-full font-medium bg-gray-100 text-gray-600 text-[8px] px-1.5 py-0 whitespace-nowrap">
              Coming soon
            </span>
          )}
        </div>

        {/* Checkmark indicator */}
        <div className="flex h-4 w-4 shrink-0 items-center justify-center">
          {isSelected && <Check className="size-3 text-primary" />}
        </div>
      </Label>
    );
  }
);

OptionItem.displayName = "OptionItem";

export const StackCategory = memo(({ category }: StackCategoryProps) => {
  const { selectedOptions, toggle } = useStackBuilder();

  const visibleOptions = useMemo(
    () => flattenOptionsWithSubOptions(category.options, selectedOptions),
    [category.options, selectedOptions]
  );

  return (
    <div className="space-y-3">
      <h4 className="text-sm font-medium">
        {category.label}
        {category.required && (
          <span className="text-destructive ml-0.5">*</span>
        )}
        {category.multiSelect && (
          <span className="font-normal text-muted-foreground">
            {" "}
            (select all that apply)
          </span>
        )}
      </h4>

      <div className="grid grid-cols-2 gap-2">
        {visibleOptions.map((option) => (
          <OptionItem
            key={option.id}
            option={option}
            categoryId={category.id}
            isSelected={selectedOptions.has(option.id)}
            onToggle={toggle}
          />
        ))}
      </div>
    </div>
  );
});

StackCategory.displayName = "StackCategory";
