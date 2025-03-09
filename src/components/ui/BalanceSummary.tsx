
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowDownIcon, ArrowUpIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface BalanceSummaryProps {
  totalExpenses: number;
  youOwe: number;
  youAreOwed: number;
  className?: string;
}

export default function BalanceSummary({ 
  totalExpenses, 
  youOwe, 
  youAreOwed, 
  className 
}: BalanceSummaryProps) {
  const netBalance = youAreOwed - youOwe;
  
  return (
    <div className={cn("grid gap-4 md:grid-cols-3", className)}>
      <Card className="glass-card animate-slide-up">
        <CardHeader className="flex flex-row items-center justify-between p-4 pb-2">
          <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <div className="text-2xl font-bold">${totalExpenses.toFixed(2)}</div>
          <p className="text-xs text-muted-foreground mt-1">
            All expenses you're involved in
          </p>
        </CardContent>
      </Card>
      
      <Card className="glass-card animate-slide-up delay-100">
        <CardHeader className="flex flex-row items-center justify-between p-4 pb-2">
          <CardTitle className="text-sm font-medium text-red-600">You Owe</CardTitle>
          <ArrowUpIcon className="h-4 w-4 text-red-600" />
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <div className="text-2xl font-bold text-red-600">${youOwe.toFixed(2)}</div>
          <p className="text-xs text-muted-foreground mt-1">
            Total amount you need to pay
          </p>
        </CardContent>
      </Card>
      
      <Card className="glass-card animate-slide-up delay-200">
        <CardHeader className="flex flex-row items-center justify-between p-4 pb-2">
          <CardTitle className="text-sm font-medium text-green-600">You Are Owed</CardTitle>
          <ArrowDownIcon className="h-4 w-4 text-green-600" />
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <div className="text-2xl font-bold text-green-600">${youAreOwed.toFixed(2)}</div>
          <p className="text-xs text-muted-foreground mt-1">
            Total amount owed to you
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
