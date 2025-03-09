
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";

export default function Profile() {
  const { user } = useAuth();
  
  const handleSave = () => {
    toast.success("Profile saved successfully");
  };
  
  return (
    <DashboardLayout>
      <div className="max-w-2xl mx-auto space-y-8 animate-fade-in">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Your Profile</h1>
          <p className="text-muted-foreground">
            Manage your account information and preferences
          </p>
        </div>
        
        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col items-center gap-4 sm:flex-row">
              <Avatar className="h-20 w-20">
                <AvatarImage src={user?.user_metadata?.avatar_url} alt={user?.user_metadata?.name || 'User'} />
                <AvatarFallback className="text-xl">{user?.user_metadata?.name?.charAt(0) || 'U'}</AvatarFallback>
              </Avatar>
              <Button variant="outline">Change Avatar</Button>
            </div>
            
            <div className="grid gap-4 pt-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" defaultValue={user?.user_metadata?.name || ''} />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" defaultValue={user?.email || ''} readOnly />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="phone">Phone Number (optional)</Label>
                <Input id="phone" type="tel" placeholder="Add your phone number" />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button onClick={handleSave}>Save Changes</Button>
          </CardFooter>
        </Card>
        
        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Notification Preferences</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Email Notifications</p>
                <p className="text-sm text-muted-foreground">
                  Receive updates about new expenses and settlements
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <Label htmlFor="email-notifications" className="sr-only">
                  Email Notifications
                </Label>
                <Button variant="outline" size="sm">
                  Enabled
                </Button>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Push Notifications</p>
                <p className="text-sm text-muted-foreground">
                  Receive real-time updates on your device
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <Label htmlFor="push-notifications" className="sr-only">
                  Push Notifications
                </Label>
                <Button variant="outline" size="sm">
                  Disabled
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Account Security</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="current-password">Current Password</Label>
              <Input id="current-password" type="password" />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="new-password">New Password</Label>
              <Input id="new-password" type="password" />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="confirm-password">Confirm New Password</Label>
              <Input id="confirm-password" type="password" />
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button onClick={handleSave}>Update Password</Button>
          </CardFooter>
        </Card>
      </div>
    </DashboardLayout>
  );
}
