import { useState } from "react";
import { useLocation } from "wouter";
import TopBar from "@/components/TopBar";
import BottomNav from "@/components/BottomNav";
import StatCard from "@/components/StatCard";
import PropertyCard from "@/components/PropertyCard";
import { Home, Users, ClipboardCheck, TrendingUp, User, Settings, LogOut, FileText } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const mockStats = [
  { title: "Total Properties", value: 234, icon: Home, trend: { value: "12% from last month", positive: true } },
  { title: "Active Users", value: 1840, icon: Users, trend: { value: "18% from last month", positive: true } },
  { title: "Pending Approvals", value: 15, icon: ClipboardCheck },
  { title: "Completed Evaluations", value: 189, icon: TrendingUp, trend: { value: "25% from last month", positive: true } },
];

const mockPendingProperties = [
  {
    id: "1",
    title: "Luxury 3BR Penthouse",
    address: "Westlands",
    city: "Nairobi",
    bedrooms: 3,
    bathrooms: 3,
    rent: 200000,
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&auto=format&fit=crop",
    status: "pending" as const,
  },
  {
    id: "2",
    title: "Modern Studio Apartment",
    address: "Kilimani",
    city: "Nairobi",
    bedrooms: 1,
    bathrooms: 1,
    rent: 45000,
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&auto=format&fit=crop",
    status: "awaiting_evaluation" as const,
  },
];

export default function DashboardPage() {
  const [, setLocation] = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
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
        title="Admin Dashboard"
        role="admin"
        notificationCount={5}
        onMenuClick={() => setMenuOpen(true)}
        onNotificationClick={() => setLocation("/admin/notifications")}
      />
      
      <div className="p-4 space-y-6">
        <div className="grid grid-cols-2 gap-4">
          {mockStats.map((stat, index) => (
            <StatCard 
              key={index} 
              {...stat}
              onClick={
                stat.title === "Total Properties" 
                  ? () => setLocation("/admin/properties")
                  : stat.title === "Active Users"
                  ? () => setLocation("/admin/users")
                  : stat.title === "Pending Approvals"
                  ? () => setLocation("/admin/properties")
                  : stat.title === "Completed Evaluations"
                  ? () => setLocation("/admin/properties?tab=processed")
                  : undefined
              }
            />
          ))}
        </div>
        
        <div>
          <h2 className="text-lg font-semibold mb-4">Pending Approvals</h2>
          <div className="space-y-4">
            {mockPendingProperties.map((property) => (
              <PropertyCard
                key={property.id}
                {...property}
                onCardClick={() => setLocation(`/admin/properties/${property.id}?from=dashboard`)}
              />
            ))}
          </div>
        </div>
      </div>
      
      <BottomNav role="admin" />

      <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
        <SheetContent side="left" className="w-[280px]">
          <SheetHeader>
            <SheetTitle>Menu</SheetTitle>
          </SheetHeader>
          <div className="mt-6 space-y-2">
            <Card className="hover-elevate active-elevate-2">
              <button
                className="w-full p-4 flex items-center gap-3 text-left"
                onClick={() => {
                  setMenuOpen(false);
                  setLocation("/admin/dashboard");
                }}
                data-testid="menu-dashboard"
              >
                <Home className="w-5 h-5" />
                <span className="font-medium">Dashboard</span>
              </button>
            </Card>
            
            <Card className="hover-elevate active-elevate-2">
              <button
                className="w-full p-4 flex items-center gap-3 text-left"
                onClick={() => {
                  setMenuOpen(false);
                  setLocation("/admin/users");
                }}
                data-testid="menu-users"
              >
                <Users className="w-5 h-5" />
                <span className="font-medium">User Management</span>
              </button>
            </Card>
            
            <Card className="hover-elevate active-elevate-2">
              <button
                className="w-full p-4 flex items-center gap-3 text-left"
                onClick={() => {
                  setMenuOpen(false);
                  setLocation("/admin/properties");
                }}
                data-testid="menu-properties"
              >
                <FileText className="w-5 h-5" />
                <span className="font-medium">Properties</span>
              </button>
            </Card>
            
            <Card className="hover-elevate active-elevate-2">
              <button
                className="w-full p-4 flex items-center gap-3 text-left"
                onClick={() => {
                  setMenuOpen(false);
                  setLocation("/admin/settings");
                }}
                data-testid="menu-settings"
              >
                <Settings className="w-5 h-5" />
                <span className="font-medium">Settings</span>
              </button>
            </Card>

            <div className="pt-4">
              <Card className="hover-elevate active-elevate-2 border-destructive/20">
                <button
                  className="w-full p-4 flex items-center gap-3 text-left text-destructive"
                  onClick={handleLogout}
                  data-testid="menu-logout"
                >
                  <LogOut className="w-5 h-5" />
                  <span className="font-medium">Logout</span>
                </button>
              </Card>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
