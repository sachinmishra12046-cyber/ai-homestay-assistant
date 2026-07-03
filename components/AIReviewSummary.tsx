"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ThumbsUp, ThumbsDown, Loader2, ChevronDown, ChevronUp } from "lucide-react";
import { summarizeReviews } from "@/lib/ai";
import type { AIReviewSummary } from "@/lib/ai";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";

interface AIReviewSummaryProps {
  propertyName: string;
  reviews: Array<{ rating: number; comment: string }>;
}

export default function AIReviewSummary({ propertyName, reviews }: AIReviewSummaryProps) {
  const [summary, setSummary] = useState<AIReviewSummary | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (reviews.length > 0) {
      generateSummary();
    }
  }, [propertyName, reviews]);

  const generateSummary = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await summarizeReviews(propertyName, reviews);
      setSummary(result);
    } catch (err) {
      setError("Failed to generate review summary");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  if (reviews.length === 0) {
    return null;
  }

  return (
    <Card variant="elevated" className="overflow-hidden">
      <div
        className="flex items-center justify-between p-4 cursor-pointer bg-gradient-primary/5 hover:bg-gradient-primary/10 transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-primary text-white">
            <Sparkles className="h-4 w-4" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">AI Review Summary</h3>
            <p className="text-xs text-muted-foreground">Based on {reviews.length} reviews</p>
          </div>
        </div>
        {isExpanded ? (
          <ChevronUp className="h-5 w-5 text-muted-foreground" />
        ) : (
          <ChevronDown className="h-5 w-5 text-muted-foreground" />
        )}
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="p-4 space-y-4">
              {isLoading ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="h-6 w-6 animate-spin text-primary" />
                  <span className="ml-2 text-sm text-muted-foreground">Analyzing reviews...</span>
                </div>
              ) : error ? (
                <div className="text-center py-4">
                  <p className="text-sm text-destructive">{error}</p>
                  <button
                    onClick={generateSummary}
                    className="mt-2 text-sm text-primary hover:underline"
                  >
                    Try again
                  </button>
                </div>
              ) : summary ? (
                <>
                  {/* Overall Rating */}
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Overall Rating</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-2xl font-bold text-foreground">{summary.rating.toFixed(1)}</span>
                        <span className="text-sm text-muted-foreground">/ 5</span>
                      </div>
                    </div>
                    <Badge variant="primary" size="lg">
                      {summary.rating >= 4.5 ? "Excellent" : summary.rating >= 4 ? "Very Good" : summary.rating >= 3 ? "Good" : "Average"}
                    </Badge>
                  </div>

                  {/* Overall Summary */}
                  <div className="rounded-xl bg-primary/5 p-4">
                    <p className="text-sm text-foreground leading-relaxed">{summary.overall}</p>
                  </div>

                  {/* Pros */}
                  {summary.pros.length > 0 && (
                    <div>
                      <h4 className="flex items-center gap-2 text-sm font-semibold text-foreground mb-2">
                        <ThumbsUp className="h-4 w-4 text-primary" />
                        Pros
                      </h4>
                      <ul className="space-y-1">
                        {summary.pros.map((pro, index) => (
                          <motion.li
                            key={index}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className="flex items-start gap-2 text-sm text-muted-foreground"
                          >
                            <span className="text-primary">•</span>
                            <span>{pro}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Cons */}
                  {summary.cons.length > 0 && (
                    <div>
                      <h4 className="flex items-center gap-2 text-sm font-semibold text-foreground mb-2">
                        <ThumbsDown className="h-4 w-4 text-destructive" />
                        Cons
                      </h4>
                      <ul className="space-y-1">
                        {summary.cons.map((con, index) => (
                          <motion.li
                            key={index}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className="flex items-start gap-2 text-sm text-muted-foreground"
                          >
                            <span className="text-destructive">•</span>
                            <span>{con}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Recommendation */}
                  <div className="rounded-xl border border-primary/20 bg-primary/5 p-4">
                    <h4 className="flex items-center gap-2 text-sm font-semibold text-foreground mb-2">
                      <Sparkles className="h-4 w-4 text-primary" />
                      AI Recommendation
                    </h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">{summary.recommendation}</p>
                  </div>
                </>
              ) : null}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  );
}
