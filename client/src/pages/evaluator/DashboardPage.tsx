import { useState } from "react";
import { useLocation } from "wouter";
import TopBar from "@/components/TopBar";
import BottomNav from "@/components/BottomNav";
import StatCard from "@/components/StatCard";
import PropertyCard from "@/components/PropertyCard";
import { ClipboardCheck, CheckCircle, XCircle, FileSearch, Home, Settings, LogOut, FileText } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const mockStats = [
  { title: "Pending Inspection", value: 8, icon: ClipboardCheck },
  { title: "Total Inspected", value: 45, icon: FileSearch },
  { title: "Total Approved", value: 38, icon: CheckCircle },
  { title: "Total Rejected", value: 7, icon: XCircle },
];

const mockAwaitingProperties = [
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
  {
    id: "6",
    title: "Spacious 2BR Family Home",
    address: "Karen",
    city: "Nairobi",
    bedrooms: 2,
    bathrooms: 2,
    rent: 85000,
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&auto=format&fit=crop",
    status: "awaiting_evaluation" as const,
  },
  {
    id: "8",
    title: "Executive 4BR Villa",
    address: "Runda",
    city: "Nairobi",
    bedrooms: 4,
    bathrooms: 4,
    rent: 250000,
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&auto=format&fit=crop",
    status: "awaiting_evaluation" as const,
  },
];

export default function EvaluatorDashboardPage() {
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
        title="Evaluator Dashboard"
        role="evaluator"
        notificationCount={3}
        onMenuClick={() => setMenuOpen(true)}
        onNotificationClick={() => setLocation("/evaluator/notifications")}
      />
      
      <div className="p-4 space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <StatCard 
            {...mockStats[0]}
            onClick={() => setLocation("/evaluator/properties?tab=pending")}
            data-testid="stat-pending-inspection"
          />
          <StatCard 
            {...mockStats[1]}
            onClick={() => setLocation("/evaluator/properties?tab=inspected")}
            data-testid="stat-total-inspected"
          />
          <StatCard 
            {...mockStats[2]}
            onClick={() => setLocation("/evaluator/properties?tab=approved")}
            data-testid="stat-total-approved"
          />
          <StatCard 
            {...mockStats[3]}
            onClick={() => setLocation("/evaluator/properties?tab=rejected")}
            data-testid="stat-total-rejected"
          />
        </div>
        
        <div>
          <h2 className="text-lg font-semibold mb-4">Awaiting Inspection</h2>
          <div className="space-y-4">
            {mockAwaitingProperties.map((property) => (
              <PropertyCard
                key={property.id}
                {...property}
                onCardClick={() => setLocation(`/evaluator/properties/${property.id}?from=dashboard`)}
              />
            ))}
          </div>
        </div>
      </div>
      
      <BottomNav role="evaluator" />

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
                  setLocation("/evaluator/dashboard");
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
                  setLocation("/evaluator/properties");
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
                  setLocation("/evaluator/settings");
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
