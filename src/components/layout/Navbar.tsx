import { Bell, Plus, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import NewExpenseModal from "../modals/NewExpenseModal";
import NewGroupModal from "../modals/NewGroupModal";
import { useAuth } from "@/contexts/AuthContext";

const NavLink = ({ to, children }: { to: string; children: React.ReactNode }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  
  return (
    <Link
      to={to}
      className={cn(
        "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200",
        isActive 
          ? "bg-primary/10 text-primary" 
          : "text-muted-foreground hover:text-foreground hover:bg-secondary"
      )}
    >
      {children}
    </Link>
  );
};

export default function Navbar() {
  const { toast } = useToast();
  const { user, signOut } = useAuth();
  
  const handleProfileClick = () => {
    toast({
      title: "Coming soon",
      description: "Profile settings will be available in the next update.",
    });
  };
  
  const handleNotificationsClick = () => {
    toast({
      title: "No new notifications",
      description: "You're all caught up!",
    });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container flex items-center justify-between h-16 px-4 md:px-6">
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
              <span className="text-white font-bold">CT</span>
            </div>
            <span className="font-bold text-lg">ClearTab</span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-1">
            <NavLink to="/">Dashboard</NavLink>
            <NavLink to="/groups">Groups</NavLink>
          </nav>
        </div>
        
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" className="rounded-full">
                <Plus className="h-4 w-4" />
                <span className="sr-only">Add new</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 p-2">
              <Dialog>
                <DialogTrigger asChild>
                  <DropdownMenuItem className="cursor-pointer py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <Plus className="h-4 w-4 text-primary" />
                      </div>
                      <span>New Expense</span>
                    </div>
                  </DropdownMenuItem>
                </DialogTrigger>
                <NewExpenseModal />
              </Dialog>
              
              <Dialog>
                <DialogTrigger asChild>
                  <DropdownMenuItem className="cursor-pointer py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                        <Plus className="h-4 w-4" />
                      </div>
                      <span>New Group</span>
                    </div>
                  </DropdownMenuItem>
                </DialogTrigger>
                <NewGroupModal />
              </Dialog>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Button 
            variant="ghost" 
            size="icon" 
            className="rounded-full"
            onClick={handleNotificationsClick}
          >
            <Bell className="h-5 w-5" />
            <span className="sr-only">Notifications</span>
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="rounded-full h-8 w-8 p-0">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user?.user_metadata?.avatar_url} alt={user?.user_metadata?.name || 'User'} />
                  <AvatarFallback>{user?.user_metadata?.name?.charAt(0) || 'U'}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{user?.user_metadata?.name || user?.email}</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {user?.email}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleProfileClick}>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={signOut}>
                <span className="flex items-center w-full">Sign out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
