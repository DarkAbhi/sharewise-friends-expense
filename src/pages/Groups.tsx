
import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { currentUser, getUserGroups } from "@/lib/data";
import GroupCard from "@/components/ui/GroupCard";
import { Button } from "@/components/ui/button";
import { Plus, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import NewGroupModal from "@/components/modals/NewGroupModal";

export default function Groups() {
  const [searchTerm, setSearchTerm] = useState("");
  const userGroups = getUserGroups(currentUser.id);
  
  const filteredGroups = userGroups.filter(group => 
    group.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    (group.description && group.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );
  
  return (
    <DashboardLayout>
      <div className="space-y-8 animate-fade-in">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Your Groups</h1>
            <p className="text-muted-foreground">
              Manage and view your shared expense groups
            </p>
          </div>
          
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                <span>New Group</span>
              </Button>
            </DialogTrigger>
            <NewGroupModal />
          </Dialog>
        </div>
        
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search groups..."
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        {filteredGroups.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-slide-up">
            {filteredGroups.map((group, index) => (
              <GroupCard 
                key={group.id} 
                group={group} 
                currentUserId={currentUser.id} 
              />
            ))}
          </div>
        ) : (
          <div className="rounded-lg border border-dashed p-12 text-center">
            {searchTerm ? (
              <>
                <h3 className="font-medium mb-2">No matching groups found</h3>
                <p className="text-sm text-muted-foreground">
                  Try a different search term or create a new group
                </p>
              </>
            ) : (
              <>
                <h3 className="font-medium mb-2">No groups yet</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Create your first group to start tracking shared expenses
                </p>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      <span>Create a group</span>
                    </Button>
                  </DialogTrigger>
                  <NewGroupModal />
                </Dialog>
              </>
            )}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
