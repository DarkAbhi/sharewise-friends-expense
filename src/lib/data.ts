
import { User, Group, Expense, ExpenseCategory } from './types';

// Mock users
export const mockUsers: User[] = [
  {
    id: 'user1',
    name: 'Alex Johnson',
    email: 'alex@example.com',
    avatar: 'https://i.pravatar.cc/150?img=1',
  },
  {
    id: 'user2',
    name: 'Taylor Smith',
    email: 'taylor@example.com',
    avatar: 'https://i.pravatar.cc/150?img=2',
  },
  {
    id: 'user3',
    name: 'Jordan Lee',
    email: 'jordan@example.com',
    avatar: 'https://i.pravatar.cc/150?img=3',
  },
  {
    id: 'user4',
    name: 'Casey Morgan',
    email: 'casey@example.com',
    avatar: 'https://i.pravatar.cc/150?img=4',
  },
];

// Current user (pretend this is the logged-in user)
export const currentUser = mockUsers[0];

// Categories with colors
export const categories: Record<ExpenseCategory, { label: string, color: string, icon: string }> = {
  food: { label: 'Food & Drinks', color: 'bg-orange-100 text-orange-700', icon: '🍕' },
  transport: { label: 'Transport', color: 'bg-blue-100 text-blue-700', icon: '🚗' },
  shopping: { label: 'Shopping', color: 'bg-pink-100 text-pink-700', icon: '🛍️' },
  entertainment: { label: 'Entertainment', color: 'bg-purple-100 text-purple-700', icon: '🎬' },
  housing: { label: 'Housing', color: 'bg-green-100 text-green-700', icon: '🏠' },
  utilities: { label: 'Utilities', color: 'bg-yellow-100 text-yellow-700', icon: '💡' },
  health: { label: 'Health', color: 'bg-red-100 text-red-700', icon: '🏥' },
  travel: { label: 'Travel', color: 'bg-indigo-100 text-indigo-700', icon: '✈️' },
  education: { label: 'Education', color: 'bg-teal-100 text-teal-700', icon: '📚' },
  other: { label: 'Other', color: 'bg-gray-100 text-gray-700', icon: '📝' },
};

// Mock expenses
export const mockExpenses: Expense[] = [
  {
    id: 'exp1',
    groupId: 'group1',
    createdBy: 'user1',
    description: 'Dinner at Italian Restaurant',
    amount: 120,
    date: new Date('2023-06-15'),
    category: 'food',
    paidBy: [{ userId: 'user1', amount: 120 }],
    splitBetween: [
      { userId: 'user1', amount: 30 },
      { userId: 'user2', amount: 30 },
      { userId: 'user3', amount: 30 },
      { userId: 'user4', amount: 30 },
    ],
    splitMethod: 'equal',
  },
  {
    id: 'exp2',
    groupId: 'group1',
    createdBy: 'user2',
    description: 'Taxi ride',
    amount: 45,
    date: new Date('2023-06-16'),
    category: 'transport',
    paidBy: [{ userId: 'user2', amount: 45 }],
    splitBetween: [
      { userId: 'user1', amount: 15 },
      { userId: 'user2', amount: 15 },
      { userId: 'user3', amount: 15 },
    ],
    splitMethod: 'equal',
  },
  {
    id: 'exp3',
    groupId: 'group2',
    createdBy: 'user1',
    description: 'Groceries',
    amount: 85.75,
    date: new Date('2023-06-17'),
    category: 'shopping',
    paidBy: [{ userId: 'user1', amount: 85.75 }],
    splitBetween: [
      { userId: 'user1', amount: 42.88 },
      { userId: 'user4', amount: 42.87 },
    ],
    splitMethod: 'equal',
  },
  {
    id: 'exp4',
    groupId: 'group1',
    createdBy: 'user3',
    description: 'Movie tickets',
    amount: 60,
    date: new Date('2023-06-18'),
    category: 'entertainment',
    paidBy: [{ userId: 'user3', amount: 60 }],
    splitBetween: [
      { userId: 'user1', amount: 20 },
      { userId: 'user2', amount: 20 },
      { userId: 'user3', amount: 20 },
    ],
    splitMethod: 'equal',
  },
  {
    id: 'exp5',
    groupId: 'group2',
    createdBy: 'user4',
    description: 'Electricity bill',
    amount: 124.50,
    date: new Date('2023-06-20'),
    category: 'utilities',
    paidBy: [{ userId: 'user4', amount: 124.50 }],
    splitBetween: [
      { userId: 'user1', amount: 62.25 },
      { userId: 'user4', amount: 62.25 },
    ],
    splitMethod: 'equal',
  },
  {
    id: 'exp6',
    groupId: 'group3',
    createdBy: 'user1',
    description: 'Weekend Trip Accommodations',
    amount: 350,
    date: new Date('2023-06-25'),
    category: 'travel',
    paidBy: [{ userId: 'user1', amount: 350 }],
    splitBetween: [
      { userId: 'user1', amount: 87.50 },
      { userId: 'user2', amount: 87.50 },
      { userId: 'user3', amount: 87.50 },
      { userId: 'user4', amount: 87.50 },
    ],
    splitMethod: 'equal',
  },
];

// Mock groups
export const mockGroups: Group[] = [
  {
    id: 'group1',
    name: 'Weekend Trip',
    description: 'Expenses for our weekend getaway',
    createdBy: 'user1',
    createdAt: new Date('2023-06-15'),
    members: [
      { userId: 'user1', role: 'admin', balance: 0 },
      { userId: 'user2', role: 'member', balance: 0 },
      { userId: 'user3', role: 'member', balance: 0 },
      { userId: 'user4', role: 'member', balance: 0 },
    ],
    expenses: mockExpenses.filter(exp => exp.groupId === 'group1'),
    totalExpenses: mockExpenses
      .filter(exp => exp.groupId === 'group1')
      .reduce((sum, exp) => sum + exp.amount, 0),
  },
  {
    id: 'group2',
    name: 'Apartment',
    description: 'Shared apartment expenses',
    createdBy: 'user1',
    createdAt: new Date('2023-06-10'),
    members: [
      { userId: 'user1', role: 'admin', balance: 0 },
      { userId: 'user4', role: 'member', balance: 0 },
    ],
    expenses: mockExpenses.filter(exp => exp.groupId === 'group2'),
    totalExpenses: mockExpenses
      .filter(exp => exp.groupId === 'group2')
      .reduce((sum, exp) => sum + exp.amount, 0),
  },
  {
    id: 'group3',
    name: 'Road Trip',
    description: 'Summer road trip expenses',
    createdBy: 'user2',
    createdAt: new Date('2023-06-20'),
    members: [
      { userId: 'user1', role: 'member', balance: 0 },
      { userId: 'user2', role: 'admin', balance: 0 },
      { userId: 'user3', role: 'member', balance: 0 },
      { userId: 'user4', role: 'member', balance: 0 },
    ],
    expenses: mockExpenses.filter(exp => exp.groupId === 'group3'),
    totalExpenses: mockExpenses
      .filter(exp => exp.groupId === 'group3')
      .reduce((sum, exp) => sum + exp.amount, 0),
  },
];

// Helper function to calculate balances
export const calculateBalances = (groupId: string) => {
  const group = mockGroups.find(g => g.id === groupId);
  if (!group) return [];
  
  const balances: Record<string, number> = {};
  group.members.forEach(member => {
    balances[member.userId] = 0;
  });
  
  const expenses = mockExpenses.filter(exp => exp.groupId === groupId);
  
  expenses.forEach(expense => {
    // Add to payer's balances
    expense.paidBy.forEach(payment => {
      balances[payment.userId] += payment.amount;
    });
    
    // Subtract from consumers' balances
    expense.splitBetween.forEach(split => {
      balances[split.userId] -= split.amount;
    });
  });
  
  return Object.entries(balances).map(([userId, amount]) => {
    const user = mockUsers.find(u => u.id === userId);
    return {
      user: user!,
      amount: amount
    };
  });
};

// Calculate total user balances across all groups
export const calculateTotalUserBalance = (userId: string) => {
  let totalBalance = 0;
  
  mockGroups.forEach(group => {
    const groupBalances = calculateBalances(group.id);
    const userBalance = groupBalances.find(balance => balance.user.id === userId);
    if (userBalance) {
      totalBalance += userBalance.amount;
    }
  });
  
  return totalBalance;
};

// Get total expense amount for a user
export const getTotalUserExpenses = (userId: string) => {
  return mockExpenses
    .filter(exp => exp.splitBetween.some(split => split.userId === userId))
    .reduce((sum, exp) => {
      const userSplit = exp.splitBetween.find(split => split.userId === userId);
      return sum + (userSplit?.amount || 0);
    }, 0);
};

// Get expenses for a specific user
export const getUserExpenses = (userId: string) => {
  return mockExpenses.filter(exp => 
    exp.splitBetween.some(split => split.userId === userId) ||
    exp.paidBy.some(payer => payer.userId === userId)
  );
};

// Get groups that a user is a member of
export const getUserGroups = (userId: string) => {
  return mockGroups.filter(group => 
    group.members.some(member => member.userId === userId)
  );
};
