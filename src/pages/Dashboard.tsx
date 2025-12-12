import { Wallet, TrendingUp, TrendingDown, PiggyBank, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { SummaryCard } from "@/components/dashboard/SummaryCard";
import { CategoryChart } from "@/components/dashboard/CategoryChart";
import { SpendingTrends } from "@/components/dashboard/SpendingTrends";
import { RecentTransactions } from "@/components/dashboard/RecentTransactions";
import { AIRecommendations } from "@/components/dashboard/AIRecommendations";
import { Button } from "@/components/ui/button";
import { summaryData } from "@/data/mockData";

export default function Dashboard() {
  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground mt-1">Welcome back! Here's your financial overview.</p>
        </div>
        <Button asChild className="gradient-primary hover:opacity-90 transition-opacity">
          <Link to="/add-expense">
            <Plus className="w-4 h-4 mr-2" />
            Add Expense
          </Link>
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        <SummaryCard
          title="Total Balance"
          value={`$${summaryData.totalBalance.toLocaleString()}`}
          icon={Wallet}
          variant="primary"
        />
        <SummaryCard
          title="Monthly Income"
          value={`$${summaryData.monthlyIncome.toLocaleString()}`}
          icon={TrendingUp}
          trend={{ value: 12, isPositive: true }}
        />
        <SummaryCard
          title="Monthly Expenses"
          value={`$${summaryData.monthlyExpenses.toLocaleString()}`}
          icon={TrendingDown}
          trend={{ value: 8, isPositive: false }}
        />
        <SummaryCard
          title="Savings Rate"
          value={`${summaryData.savingsRate}%`}
          icon={PiggyBank}
          trend={{ value: 5, isPositive: true }}
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CategoryChart />
        <SpendingTrends />
      </div>

      {/* AI Recommendations */}
      <AIRecommendations />

      {/* Recent Transactions */}
      <RecentTransactions />
    </div>
  );
}
