
import { currentUser, getUserExpenses, getUserGroups, calculateTotalUserBalance, getTotalUserExpenses } from "@/lib/data";
import ExpenseCard from "@/components/ui/ExpenseCard";
import GroupCard from "@/components/ui/GroupCard";
import BalanceSummary from "@/components/ui/BalanceSummary";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { ChevronRight, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import NewExpenseModal from "@/components/modals/NewExpenseModal";

export default function Dashboard() {
  const userExpenses = getUserExpenses(currentUser.id);
  const userGroups = getUserGroups(currentUser.id);
  const totalBalance = calculateTotalUserBalance(currentUser.id);
  const totalExpenses = getTotalUserExpenses(currentUser.id);
  
  // Get the total amount owed to the user and total amount the user owes
  const youAreOwed = totalBalance > 0 ? totalBalance : 0;
  const youOwe = totalBalance < 0 ? Math.abs(totalBalance) : 0;
  
  // Get the most recent 5 expenses
  const recentExpenses = [...userExpenses]
    .sort((a, b) => b.date.getTime() - a.date.getTime())
    .slice(0, 5);
  
  return (
    <DashboardLayout>
      <div className="space-y-8 animate-fade-in">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Welcome back</h1>
          <p className="text-muted-foreground">
            Track and split expenses with friends and groups
          </p>
        </div>
        
        <BalanceSummary
          totalExpenses={totalExpenses}
          youOwe={youOwe}
          youAreOwed={youAreOwed}
          className="animate-fade-in"
        />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Recent Expenses</h2>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm" className="gap-1">
                    <Plus className="h-4 w-4" />
                    <span>Add</span>
                  </Button>
                </DialogTrigger>
                <NewExpenseModal />
              </Dialog>
            </div>
            
            {recentExpenses.length > 0 ? (
              <div className="grid gap-4">
                {recentExpenses.map((expense, index) => (
                  <ExpenseCard 
                    key={expense.id} 
                    expense={expense} 
                    currentUserId={currentUser.id} 
                  />
                ))}
              </div>
            ) : (
              <div className="rounded-lg border border-dashed p-8 text-center">
                <h3 className="font-medium mb-2">No expenses yet</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Add your first expense to get started with tracking and splitting
                </p>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      <span>Add an expense</span>
                    </Button>
                  </DialogTrigger>
                  <NewExpenseModal />
                </Dialog>
              </div>
            )}
          </div>
          
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Your Groups</h2>
              <Link to="/groups">
                <Button variant="ghost" size="sm" className="gap-1">
                  <span>View all</span>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
            
            {userGroups.length > 0 ? (
              <div className="grid gap-4">
                {userGroups.slice(0, 3).map((group) => (
                  <GroupCard 
                    key={group.id} 
                    group={group} 
                    currentUserId={currentUser.id} 
                  />
                ))}
              </div>
            ) : (
              <div className="rounded-lg border border-dashed p-8 text-center">
                <h3 className="font-medium mb-2">No groups yet</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Create a group to start tracking shared expenses
                </p>
                <Link to="/groups">
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    <span>Create a group</span>
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
