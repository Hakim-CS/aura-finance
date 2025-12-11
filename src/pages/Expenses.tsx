import { useState, useMemo } from "react";
import { Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { DateRange } from "react-day-picker";
import { ExpenseFilters } from "@/components/expense/ExpenseFilters";
import { ExpenseTable } from "@/components/expense/ExpenseTable";
import { Button } from "@/components/ui/button";
import { mockExpenses, Expense } from "@/data/mockData";
import { useToast } from "@/hooks/use-toast";

export default function Expenses() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [sortBy, setSortBy] = useState("date-desc");
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const { toast } = useToast();

  const filteredExpenses = useMemo(() => {
    let result = [...mockExpenses];

    // Search filter
    if (search) {
      const searchLower = search.toLowerCase();
      result = result.filter(
        (e) =>
          e.description.toLowerCase().includes(searchLower) ||
          e.notes?.toLowerCase().includes(searchLower)
      );
    }

    // Category filter
    if (category !== "all") {
      result = result.filter((e) => e.category === category);
    }

    // Date range filter
    if (dateRange?.from) {
      result = result.filter((e) => {
        const expenseDate = new Date(e.date);
        const from = dateRange.from!;
        const to = dateRange.to || from;
        return expenseDate >= from && expenseDate <= to;
      });
    }

    // Sort
    result.sort((a, b) => {
      switch (sortBy) {
        case "date-asc":
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        case "date-desc":
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        case "amount-asc":
          return a.amount - b.amount;
        case "amount-desc":
          return b.amount - a.amount;
        default:
          return 0;
      }
    });

    return result;
  }, [search, category, sortBy, dateRange]);

  const totalAmount = filteredExpenses.reduce((sum, e) => sum + e.amount, 0);

  const handleClearFilters = () => {
    setSearch("");
    setCategory("all");
    setSortBy("date-desc");
    setDateRange(undefined);
  };

  const handleEdit = (expense: Expense) => {
    toast({
      title: "Edit expense",
      description: `Editing: ${expense.description}`,
    });
  };

  const handleDelete = (expense: Expense) => {
    toast({
      title: "Delete expense",
      description: `Deleted: ${expense.description}`,
      variant: "destructive",
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Expenses</h1>
          <p className="text-muted-foreground mt-1">
            Manage and track all your expenses
          </p>
        </div>
        <Button asChild className="gradient-primary hover:opacity-90">
          <Link to="/add-expense">
            <Plus className="w-4 h-4 mr-2" />
            Add Expense
          </Link>
        </Button>
      </div>

      {/* Filters */}
      <ExpenseFilters
        search={search}
        onSearchChange={setSearch}
        category={category}
        onCategoryChange={setCategory}
        sortBy={sortBy}
        onSortChange={setSortBy}
        dateRange={dateRange}
        onDateRangeChange={setDateRange}
        onClearFilters={handleClearFilters}
      />

      {/* Summary */}
      <div className="flex items-center justify-between text-sm">
        <p className="text-muted-foreground">
          Showing <span className="font-medium text-foreground">{filteredExpenses.length}</span> expenses
        </p>
        <p className="text-muted-foreground">
          Total: <span className="font-semibold text-primary">${totalAmount.toFixed(2)}</span>
        </p>
      </div>

      {/* Table */}
      <ExpenseTable
        expenses={filteredExpenses}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}
