
export type User = {
  id: string;
  name: string;
  email: string;
  avatar?: string;
};

export type ExpenseCategory = 
  | 'food' 
  | 'transport' 
  | 'shopping' 
  | 'entertainment' 
  | 'housing' 
  | 'utilities' 
  | 'health' 
  | 'travel' 
  | 'education' 
  | 'other';

export type SplitMethod = 'equal' | 'exact' | 'percentage' | 'shares';

export type GroupMember = {
  userId: string;
  role: 'admin' | 'member';
  balance: number;
};

export type Expense = {
  id: string;
  groupId: string;
  createdBy: string;
  description: string;
  amount: number;
  date: Date;
  category: ExpenseCategory;
  paidBy: {
    userId: string;
    amount: number;
  }[];
  splitBetween: {
    userId: string;
    amount: number;
  }[];
  splitMethod: SplitMethod;
  notes?: string;
  receipts?: string[];
};

export type Group = {
  id: string;
  name: string;
  description?: string;
  createdBy: string;
  createdAt: Date;
  members: GroupMember[];
  expenses: Expense[];
  totalExpenses: number;
};

export type Settlement = {
  id: string;
  groupId: string;
  fromUserId: string;
  toUserId: string;
  amount: number;
  date: Date;
  settled: boolean;
  notes?: string;
};

export type DebtSummary = {
  userId: string;
  totalOwed: number; // positive means others owe you, negative means you owe others
};

export interface UserBalance {
  user: User;
  amount: number; // positive for "gets back", negative for "owes"
}
