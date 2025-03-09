
import { Group, User } from "@/lib/types";
import { calculateBalances, mockUsers } from "@/lib/data";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { format } from "date-fns";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

interface GroupCardProps {
  group: Group;
  currentUserId: string;
}

export default function GroupCard({ group, currentUserId }: GroupCardProps) {
  const balances = calculateBalances(group.id);
  const currentUserBalance = balances.find(balance => balance.user.id === currentUserId);
  const balance = currentUserBalance ? currentUserBalance.amount : 0;
  
  // Get up to 3 other members for display
  const otherMembers = group.members
    .filter(member => member.userId !== currentUserId)
    .map(member => mockUsers.find(user => user.id === member.userId))
    .filter((user): user is User => user !== undefined)
    .slice(0, 3);
  
  const totalMembers = group.members.length;
  const additionalMembers = Math.max(0, totalMembers - otherMembers.length - 1); // -1 for current user
  
  return (
    <Link to={`/groups/${group.id}`}>
      <Card className="glass-card h-full hover-scale overflow-hidden">
        <CardHeader className="p-4 pb-2">
          <div className="flex justify-between items-start">
            <h3 className="font-medium text-lg">{group.name}</h3>
            <ChevronRight className="h-5 w-5 text-muted-foreground" />
          </div>
          {group.description && (
            <p className="text-sm text-muted-foreground">{group.description}</p>
          )}
        </CardHeader>
        <CardContent className="p-4 pt-2">
          <div className="flex items-center mt-2">
            <div className="flex -space-x-2">
              {otherMembers.map(member => (
                <Avatar key={member.id} className="h-7 w-7 border-2 border-background">
                  <AvatarImage src={member.avatar} alt={member.name} />
                  <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                </Avatar>
              ))}
              {additionalMembers > 0 && (
                <div className="h-7 w-7 rounded-full bg-muted flex items-center justify-center text-xs border-2 border-background">
                  +{additionalMembers}
                </div>
              )}
            </div>
            <span className="text-sm text-muted-foreground ml-2">
              {totalMembers} {totalMembers === 1 ? 'member' : 'members'}
            </span>
          </div>
        </CardContent>
        <CardFooter className="p-4 pt-0 flex justify-between">
          <div className="text-sm text-muted-foreground">
            Created {format(group.createdAt, "MMM d, yyyy")}
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
        </CardFooter>
      </Card>
    </Link>
  );
}
