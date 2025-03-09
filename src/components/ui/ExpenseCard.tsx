
import { format } from "date-fns";
import { Expense, User } from "@/lib/types";
import { categories, mockUsers } from "@/lib/data";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface ExpenseCardProps {
  expense: Expense;
  currentUserId: string;
}

export default function ExpenseCard({ expense, currentUserId }: ExpenseCardProps) {
  const categoryInfo = categories[expense.category];
  const primaryPayer = expense.paidBy[0];
  const payer = mockUsers.find(user => user.id === primaryPayer.userId) as User;
  
  // Calculate what the current user owes or is owed
  const currentUserPaid = expense.paidBy
    .filter(p => p.userId === currentUserId)
    .reduce((sum, p) => sum + p.amount, 0);
    
  const currentUserOwes = expense.splitBetween
    .filter(s => s.userId === currentUserId)
    .reduce((sum, s) => sum + s.amount, 0);
    
  const balance = currentUserPaid - currentUserOwes;
  
  return (
    <Card className="glass-card overflow-hidden animate-slide-up">
      <CardHeader className="p-4 pb-2 flex flex-row items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={cn("p-2 rounded-lg", categoryInfo.color)}>
            <span className="text-xl">{categoryInfo.icon}</span>
          </div>
          <div>
            <h3 className="font-medium text-md">{expense.description}</h3>
            <p className="text-sm text-muted-foreground">
              {format(expense.date, "MMM d, yyyy")}
            </p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-md font-semibold">${expense.amount.toFixed(2)}</p>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-2">
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center gap-2">
            <Avatar className="h-6 w-6">
              <AvatarImage src={payer.avatar} alt={payer.name} />
              <AvatarFallback>{payer.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <span className="text-sm text-muted-foreground">
              {payer.id === currentUserId ? "You paid" : `${payer.name} paid`}
            </span>
          </div>
          {balance !== 0 && (
            <div className={cn(
              "text-sm font-medium",
              balance > 0 ? "text-green-600" : "text-red-600"
            )}>
              {balance > 0 
                ? `You get back $${balance.toFixed(2)}` 
                : `You owe $${Math.abs(balance).toFixed(2)}`}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
