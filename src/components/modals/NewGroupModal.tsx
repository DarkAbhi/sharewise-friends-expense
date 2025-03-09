
import { useState } from "react";
import { DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { PlusCircle, Search, X } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { mockUsers } from "@/lib/data";

export default function NewGroupModal() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const { toast } = useToast();
  
  const filteredUsers = mockUsers.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handleAddUser = (userId: string) => {
    if (!selectedUsers.includes(userId)) {
      setSelectedUsers([...selectedUsers, userId]);
    }
    setSearchTerm("");
  };
  
  const handleRemoveUser = (userId: string) => {
    setSelectedUsers(selectedUsers.filter(id => id !== userId));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, we would validate and submit the new group
    toast({
      title: "Group created",
      description: "Your group has been created successfully.",
    });
    
    // Clear form
    setName("");
    setDescription("");
    setSelectedUsers([]);
  };
  
  return (
    <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden">
      <div className="bg-card animate-fade-in">
        <DialogHeader className="px-6 pt-6 pb-2">
          <DialogTitle className="text-2xl font-semibold">Create a new group</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6 px-6 pb-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Group Name</Label>
              <Input
                id="name"
                placeholder="e.g., Roommates, Trip to Paris"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            
            <div>
              <Label htmlFor="description">Description (optional)</Label>
              <Textarea
                id="description"
                placeholder="What's this group for?"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            
            <div>
              <Label>Add Members</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name or email"
                  className="pl-9"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              {searchTerm && (
                <div className="mt-2 bg-background border rounded-md max-h-[200px] overflow-y-auto">
                  {filteredUsers.length > 0 ? (
                    filteredUsers.map(user => (
                      <div
                        key={user.id}
                        className="p-2 hover:bg-muted flex items-center justify-between cursor-pointer"
                        onClick={() => handleAddUser(user.id)}
                      >
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={user.avatar} alt={user.name} />
                            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm font-medium">{user.name}</p>
                            <p className="text-xs text-muted-foreground">{user.email}</p>
                          </div>
                        </div>
                        <PlusCircle className="h-4 w-4 text-muted-foreground" />
                      </div>
                    ))
                  ) : (
                    <p className="p-2 text-sm text-muted-foreground">No users found</p>
                  )}
                </div>
              )}
              
              {selectedUsers.length > 0 && (
                <div className="mt-4">
                  <Label className="mb-2 block">Selected Members</Label>
                  <div className="flex flex-wrap gap-2">
                    {selectedUsers.map(userId => {
                      const user = mockUsers.find(u => u.id === userId);
                      if (!user) return null;
                      
                      return (
                        <div 
                          key={user.id} 
                          className="bg-muted px-3 py-1 rounded-full flex items-center gap-2"
                        >
                          <Avatar className="h-6 w-6">
                            <AvatarImage src={user.avatar} alt={user.name} />
                            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <span className="text-sm">{user.name}</span>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="h-5 w-5 rounded-full"
                            onClick={() => handleRemoveUser(user.id)}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <Button type="submit" className="w-full">Create Group</Button>
        </form>
      </div>
    </DialogContent>
  );
}
