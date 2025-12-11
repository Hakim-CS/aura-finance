import { Utensils, Car, Gamepad2, ShoppingBag, Zap, Heart, Plane, MoreHorizontal } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { mockExpenses, categories } from "@/data/mockData";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Utensils,
  Car,
  Gamepad2,
  ShoppingBag,
  Zap,
  Heart,
  Plane,
  MoreHorizontal,
};

export function RecentTransactions() {
  const recentExpenses = mockExpenses.slice(0, 5);

  const getCategoryInfo = (categoryId: string) => {
    return categories.find(c => c.id === categoryId) || categories[categories.length - 1];
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const today = new Date();
    const diffDays = Math.floor((today.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">Recent Transactions</CardTitle>
          <Button variant="ghost" size="sm" asChild>
            <Link to="/expenses" className="text-primary hover:text-primary/80">
              View all
            </Link>
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y divide-border">
          {recentExpenses.map((expense, index) => {
            const category = getCategoryInfo(expense.category);
            const Icon = iconMap[category.icon] || MoreHorizontal;

            return (
              <div
                key={expense.id}
                className={cn(
                  "flex items-center gap-4 p-4 hover:bg-muted/50 transition-colors",
                  "animate-fade-in"
                )}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: `${category.color}20` }}
                >
                  <Icon className="w-5 h-5" style={{ color: category.color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-foreground truncate">{expense.description}</p>
                  <p className="text-sm text-muted-foreground">{category.name}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="font-semibold text-foreground">-${expense.amount.toFixed(2)}</p>
                  <p className="text-sm text-muted-foreground">{formatDate(expense.date)}</p>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
