import { useLocation } from "wouter";
import TopBar from "@/components/TopBar";
import BottomNav from "@/components/BottomNav";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LogOut, User, Bell, Shield, HelpCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function LandlordSettingsPage() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const handleLogout = () => {
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
    setTimeout(() => {
      setLocation("/login");
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <TopBar
        title="Settings"
        role="landlord"
        notificationCount={3}
        showBackIcon={true}
        onMenuClick={() => setLocation("/landlord/dashboard")}
        onNotificationClick={() => setLocation("/landlord/notifications")}
      />

      <div className="p-4 space-y-4">
        <div className="space-y-3">
          <h2 className="text-lg font-semibold px-1">Account</h2>
          
          <Card className="hover-elevate active-elevate-2">
            <button
              className="w-full p-4 flex items-center gap-3 text-left"
              onClick={() => console.log("Profile settings")}
              data-testid="button-profile"
            >
              <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                <User className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <p className="font-medium">Profile Settings</p>
                <p className="text-sm text-muted-foreground">Manage your personal information</p>
              </div>
            </button>
          </Card>

          <Card className="hover-elevate active-elevate-2">
            <button
              className="w-full p-4 flex items-center gap-3 text-left"
              onClick={() => console.log("Notification settings")}
              data-testid="button-notifications-settings"
            >
              <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                <Bell className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <p className="font-medium">Notifications</p>
                <p className="text-sm text-muted-foreground">Configure notification preferences</p>
              </div>
            </button>
          </Card>

          <Card className="hover-elevate active-elevate-2">
            <button
              className="w-full p-4 flex items-center gap-3 text-left"
              onClick={() => console.log("Security settings")}
              data-testid="button-security"
            >
              <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                <Shield className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <p className="font-medium">Security & Privacy</p>
                <p className="text-sm text-muted-foreground">Password and security settings</p>
              </div>
            </button>
          </Card>
        </div>

        <div className="space-y-3">
          <h2 className="text-lg font-semibold px-1">Support</h2>
          
          <Card className="hover-elevate active-elevate-2">
            <button
              className="w-full p-4 flex items-center gap-3 text-left"
              onClick={() => console.log("Help & Support")}
              data-testid="button-help"
            >
              <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                <HelpCircle className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <p className="font-medium">Help & Support</p>
                <p className="text-sm text-muted-foreground">Get help and contact support</p>
              </div>
            </button>
          </Card>
        </div>

        <div className="pt-4">
          <Button
            variant="destructive"
            className="w-full"
            size="lg"
            onClick={handleLogout}
            data-testid="button-logout"
          >
            <LogOut className="w-5 h-5 mr-2" />
            Logout
          </Button>
        </div>
      </div>

      <BottomNav role="landlord" />
    </div>
  );
}
