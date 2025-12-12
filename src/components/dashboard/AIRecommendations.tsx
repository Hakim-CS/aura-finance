import { Sparkles, TrendingUp, Coffee, Receipt, AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const recommendations = [
  {
    id: 1,
    icon: TrendingUp,
    text: "You spent 32% more on Food this week compared to your average.",
    type: "warning",
  },
  {
    id: 2,
    icon: Coffee,
    text: "You can save ₺450 by limiting Café expenses to 3 times a week.",
    type: "tip",
  },
  {
    id: 3,
    icon: Receipt,
    text: "Your utilities bill is due in 3 days. Don't forget to pay!",
    type: "reminder",
  },
  {
    id: 4,
    icon: AlertCircle,
    text: "Great job! Your savings rate increased by 5% this month.",
    type: "success",
  },
];

export function AIRecommendations() {
  return (
    <Card className="border-primary/20 bg-gradient-to-r from-primary/5 via-card to-secondary/5">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg font-semibold">
          <div className="p-2 rounded-lg bg-gradient-to-br from-primary to-secondary">
            <Sparkles className="w-5 h-5 text-primary-foreground" />
          </div>
          AI Recommendations
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-3">
          {recommendations.map((rec) => (
            <div
              key={rec.id}
              className="flex items-start gap-3 p-3 rounded-lg bg-background/60 border border-border/50 transition-all hover:bg-background hover:border-border"
            >
              <div className="p-1.5 rounded-md bg-muted">
                <rec.icon className="w-4 h-4 text-muted-foreground" />
              </div>
              <p className="text-sm text-foreground leading-relaxed">{rec.text}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
