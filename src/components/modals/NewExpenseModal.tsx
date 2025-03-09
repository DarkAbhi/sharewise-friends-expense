
import { useState } from "react";
import { DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectGroup, 
  SelectItem, 
  SelectLabel, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { categories, mockGroups, mockUsers } from "@/lib/data";
import { ExpenseCategory, SplitMethod } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useToast } from "@/hooks/use-toast";

export default function NewExpenseModal() {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<ExpenseCategory | "">("");
  const [group, setGroup] = useState("");
  const [splitMethod, setSplitMethod] = useState<SplitMethod>("equal");
  const [date, setDate] = useState<Date>(new Date());
  const [notes, setNotes] = useState("");
  const { toast } = useToast();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, we would validate and submit the expense
    toast({
      title: "Expense added",
      description: "Your expense has been added successfully.",
    });
    
    // Clear form
    setAmount("");
    setDescription("");
    setCategory("");
    setGroup("");
    setSplitMethod("equal");
    setDate(new Date());
    setNotes("");
  };
  
  return (
    <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden">
      <div className="bg-card animate-fade-in">
        <DialogHeader className="px-6 pt-6 pb-2">
          <DialogTitle className="text-2xl font-semibold">Add an expense</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6 px-6 pb-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="amount">Amount</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                <Input
                  id="amount"
                  type="number"
                  placeholder="0.00"
                  className="pl-8"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  required
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                placeholder="What was this expense for?"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="category">Category</Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {Object.entries(categories).map(([key, { label, icon }]) => (
                        <SelectItem key={key} value={key}>
                          <div className="flex items-center gap-2">
                            <span>{icon}</span>
                            <span>{label}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="date">Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={(date) => date && setDate(date)}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            
            <div>
              <Label htmlFor="group">Group</Label>
              <Select value={group} onValueChange={setGroup}>
                <SelectTrigger id="group">
                  <SelectValue placeholder="Select group" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Your groups</SelectLabel>
                    {mockGroups.map((group) => (
                      <SelectItem key={group.id} value={group.id}>
                        {group.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="split-method">How to split?</Label>
              <Select value={splitMethod} onValueChange={(value) => setSplitMethod(value as SplitMethod)}>
                <SelectTrigger id="split-method">
                  <SelectValue placeholder="Select split method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="equal">Equal split</SelectItem>
                  <SelectItem value="exact">Exact amounts</SelectItem>
                  <SelectItem value="percentage">By percentage</SelectItem>
                  <SelectItem value="shares">By shares</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {group && (
              <div>
                <Label>Split with</Label>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {mockGroups
                    .find(g => g.id === group)
                    ?.members.map(member => {
                      const user = mockUsers.find(u => u.id === member.userId);
                      if (!user) return null;
                      
                      return (
                        <div key={user.id} className="flex items-center space-x-2">
                          <Checkbox id={`user-${user.id}`} defaultChecked />
                          <label
                            htmlFor={`user-${user.id}`}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {user.name}
                          </label>
                        </div>
                      );
                    })}
                </div>
              </div>
            )}
            
            <div>
              <Label htmlFor="notes">Notes (optional)</Label>
              <Textarea
                id="notes"
                placeholder="Add any additional details..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>
          </div>
          
          <Button type="submit" className="w-full">Add Expense</Button>
        </form>
      </div>
    </DialogContent>
  );
}
