import { CheckCircle2, CircleX } from "lucide-react";
import {
  ASSESSMENT_FEEDBACK,
  STACK_CONFIG,
  type CategoryId,
} from "./config";
import { cn } from "@/lib/utils";
import { useStackBuilder } from "./context/StackBuilderContext";
import { GlassCard } from "@/components/ui/glass-card";

// Collect unique integrations from all categories for the grid display
const INTEGRATIONS = (() => {
  const seen = new Set<string>();
  const integrations: { label: string; image: string }[] = [];
  
  STACK_CONFIG.forEach((category) => {
    category.options.forEach((option) => {
      if (!seen.has(option.label) && !option.comingSoon) {
        seen.add(option.label);
        integrations.push({ label: option.label, image: option.image });
      }
    });
  });
  
  return integrations.slice(0, 12); // Limit to 12 for 4x3 grid
})();

const Background = () => (
  <>
    <img
      alt=""
      className="absolute inset-0 h-full w-full object-cover object-center"
      src="/images/try-it-out/tree_crowns.webp"
    />
    <div className="absolute inset-0 bg-black/30" />
  </>
);

const FeedbackItem = ({ 
  item, 
  isActive 
}: { 
  item: typeof ASSESSMENT_FEEDBACK[0]; 
  isActive: boolean 
}) => (
  <div
    className={cn(
      "flex gap-3 transition-all duration-300",
      isActive ? "opacity-100" : "opacity-40 grayscale"
    )}
  >
    <div className="shrink-0 mt-0.5">
      {isActive ? (
        <CheckCircle2 className="w-4 h-4 text-green-500" />
      ) : (
        <CircleX className="w-4 h-4 text-gray-400" />
      )}
    </div>
    <div>
      <h4 className="font-medium text-sm text-gray-900 leading-tight">
        {item.title}
      </h4>
      <p className="text-xs text-gray-500 leading-relaxed">
        {item.description}
      </p>
    </div>
  </div>
);

const EmptyStateCard = () => (
  <GlassCard>
    <div className="space-y-1">
      <p className="text-xs font-medium uppercase tracking-wider text-gray-600">
        Assessment
      </p>
      <h2 className="text-2xl font-bold text-gray-900">Select your stack</h2>
      <p className="text-sm text-gray-600 leading-relaxed">
        See what Cleric can do for you
      </p>
    </div>
  </GlassCard>
);

const AssessmentCard = ({ 
  title, 
  description, 
  categoryStatus 
}: { 
  title: string; 
  description: string; 
  categoryStatus: Map<CategoryId, boolean> 
}) => (
  <GlassCard>
    <div className="space-y-6">
      <div className="space-y-1">
        <p className="text-xs font-medium uppercase tracking-wider text-gray-600">
          Assessment
        </p>
        <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
        <p className="text-sm text-gray-600 leading-relaxed">
          {description}
        </p>
      </div>

      <div className="space-y-4">
        <p className="text-xs font-medium uppercase tracking-wider text-gray-600">
          What Cleric can do:
        </p>
        <div className="space-y-3">
          {ASSESSMENT_FEEDBACK.map((item) => {
            const isActive = item.triggerCategories.some((catId) =>
              categoryStatus.get(catId)
            );
            return (
              <FeedbackItem 
                key={item.id} 
                item={item} 
                isActive={isActive} 
              />
            );
          })}
        </div>
      </div>
    </div>
  </GlassCard>
);

const TestimonialCard = () => (
  <GlassCard>
    <div className="space-y-6">
      <p className="text-lg text-gray-900 leading-relaxed">
        "I see Cleric functioning as an SRE companion available for our Software
        Engineers. An SRE in my team should maintain a global view across all
        engineering teams. This means if one team has already solved an alert,
        we can apply that knowledge elsewhere."
      </p>

      <div className="flex items-center gap-3">
        <img
          src="/images/try-it-out/testimonial.png"
          alt="Maxime Fouilleul"
          className="w-10 h-10 rounded-full object-cover"
        />
        <div>
          <p className="font-medium text-gray-900">Maxime Fouilleul</p>
          <p className="text-sm text-gray-500">
            Head of Infrastructure & Operations at BlaBlaCar
          </p>
        </div>
      </div>
    </div>
  </GlassCard>
);

const IntegrationsGrid = () => (
  <div className="text-center w-full">
    <p className="text-white/80 text-sm tracking-widest uppercase mb-6">
      Integrations
    </p>
    <div className="grid grid-cols-4 gap-x-8 gap-y-6 max-w-lg mx-auto">
      {INTEGRATIONS.map((integration) => (
        <div
          key={integration.label}
          className="flex items-center justify-center h-6"
        >
          <img
            alt={integration.label}
            loading="lazy"
            width={100}
            height={32}
            className="max-h-6 w-auto object-contain brightness-0 invert"
            src={integration.image}
          />
        </div>
      ))}
    </div>
  </div>
);

export const AssessmentPanel = () => {
  const { categoryStatus, assessmentLevel, enabledCategoriesCount, currentStep } =
    useStackBuilder();

  const { title, description } = assessmentLevel;
  const hasSelection = enabledCategoriesCount > 0;
  const showTestimonial = currentStep === "connect" || currentStep === "success";

  const renderCard = () => {
    if (showTestimonial) {
      return <TestimonialCard />;
    }

    if (hasSelection) {
      return (
        <AssessmentCard 
          title={title} 
          description={description} 
          categoryStatus={categoryStatus} 
        />
      );
    }

    return <EmptyStateCard />;
  };

  return (
    <div className="relative h-full w-full overflow-hidden">
      <Background />
      
      <div className="relative flex h-full flex-col justify-center items-center px-12 py-12 gap-16">
        {renderCard()}
        <IntegrationsGrid />
      </div>
    </div>
  );
};
