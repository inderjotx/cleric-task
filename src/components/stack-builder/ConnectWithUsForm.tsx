import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod/v4";
import { standardSchemaResolver } from "@hookform/resolvers/standard-schema";
import { ArrowLeft, ExternalLink, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useStackBuilder } from "./context/StackBuilderContext";

const PROBLEM_OPTIONS = [
  { id: "noisy-alerts", label: "Too many alerts / noisy alerts" },
  { id: "slow-rca", label: "Slow RCA process" },
  { id: "cross-team", label: "Cross-team incidents" },
  { id: "sre-agent", label: "We use coding agents and want to explore an SRE agent" },
  { id: "other", label: "Other" },
] as const;

const connectFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  problems: z
    .array(z.string())
    .min(1, "Please select at least one option"),
  additionalInfo: z.string().optional(),
  acceptTerms: z.literal(true, "You must accept the Terms & Conditions"),
});

type ConnectFormValues = z.infer<typeof connectFormSchema>;

export const ConnectWithUsForm = () => {
  const { goToSelect, selectedOptions, goToSuccess } = useStackBuilder();

  const form = useForm<ConnectFormValues>({
    resolver: standardSchemaResolver(connectFormSchema),
    defaultValues: {
      name: "",
      email: "",
      problems: [],
      additionalInfo: "",
      acceptTerms: undefined as unknown as true,
    },
  });

  const onSubmit = async (data: ConnectFormValues) => {
    // Mock submission - simulate network delay
    const payload = {
      formData: data,
      selectedStack: Array.from(selectedOptions),
      submittedAt: new Date().toISOString(),
    };

    console.log("Form submitted (mock):", payload);

    // Simulate a brief delay for realistic UX
    await new Promise((resolve) => setTimeout(resolve, 1000));

    goToSuccess();
  };

  return (
    <div className="flex flex-col min-h-full">
      <button
        onClick={goToSelect}
        className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900 mb-6 cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        Back
      </button>

      <div className="flex-1">
        <div className="w-full max-w-md">
          <h1 className="text-3xl font-medium tracking-tight mb-3">
            Connect with the Cleric team
          </h1>
          <p className="text-muted-foreground mb-8">
            A Cleric engineer will set up your dedicated instance (ready in ~24
            hours). Book a call to discuss your setup and get started.
          </p>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Name <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Your name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Work email <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="you@company.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="problems"
                render={() => (
                  <FormItem>
                    <FormLabel>
                      What are you looking to solve?{" "}
                      <span className="text-red-500">*</span>
                    </FormLabel>
                    <div className="space-y-3 mt-2">
                      {PROBLEM_OPTIONS.map((option) => (
                        <FormField
                          key={option.id}
                          control={form.control}
                          name="problems"
                          render={({ field }) => (
                            <FormItem className="flex items-center gap-3 space-y-0">
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(option.id)}
                                  onCheckedChange={(checked) => {
                                    const current = field.value || [];
                                    if (checked) {
                                      field.onChange([...current, option.id]);
                                    } else {
                                      field.onChange(
                                        current.filter((v) => v !== option.id)
                                      );
                                    }
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="font-normal cursor-pointer">
                                {option.label}
                              </FormLabel>
                            </FormItem>
                          )}
                        />
                      ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="additionalInfo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Anything else about your setup we should know?
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Optional - e.g., 'We use custom auth for K8s'"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="acceptTerms"
                render={({ field }) => (
                  <FormItem className="flex items-start gap-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel className="font-normal cursor-pointer">
                        I accept the{" "}
                        <a
                          href="/terms"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="underline inline-flex items-center gap-0.5"
                        >
                          Terms & Conditions
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </FormLabel>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full bg-gray-900 hover:bg-gray-800 text-white disabled:bg-gray-400"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "Book a call"
                )}
              </Button>
            </form>
          </Form>

          <p className="text-center text-sm text-muted-foreground mt-4">
            Questions?{" "}
            <a
              href="mailto:hello@cleric.io"
              className="font-medium text-gray-900 hover:underline"
            >
              Email us
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};
