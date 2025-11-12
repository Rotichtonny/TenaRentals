import { useState } from "react";
import { useLocation, useSearch } from "wouter";
import TopBar from "@/components/TopBar";
import BottomNav from "@/components/BottomNav";
import PropertyCard from "@/components/PropertyCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Card } from "@/components/ui/card";
import { Home, Settings, LogOut, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const mockPendingProperties = [
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

const mockApprovedProperties = [
  {
    id: "4",
    title: "Cozy 1BR Garden Flat",
    address: "Lavington",
    city: "Nairobi",
    bedrooms: 1,
    bathrooms: 1,
    rent: 55000,
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&auto=format&fit=crop",
    status: "approved" as const,
  },
  {
    id: "5",
    title: "Elegant 2BR Apartment",
    address: "Parklands",
    city: "Nairobi",
    bedrooms: 2,
    bathrooms: 2,
    rent: 75000,
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop",
    status: "approved" as const,
  },
];

const mockRejectedProperties = [
  {
    id: "7",
    title: "Budget Studio",
    address: "South B",
    city: "Nairobi",
    bedrooms: 1,
    bathrooms: 1,
    rent: 30000,
    image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&auto=format&fit=crop",
    status: "rejected" as const,
  },
];

// Inspected tab contains only approved and rejected (excludes awaiting_evaluation)
const mockInspectedProperties = [
  ...mockApprovedProperties,
  ...mockRejectedProperties,
];

export default function EvaluatorPropertiesPage() {
  const [, setLocation] = useLocation();
  const searchString = useSearch();
  const { toast } = useToast();
  const [menuOpen, setMenuOpen] = useState(false);

  const queryParams = new URLSearchParams(searchString);
  const initialTab = queryParams.get("tab") || "pending";
  const [activeTab, setActiveTab] = useState(initialTab);

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
        title="Properties"
        role="evaluator"
        notificationCount={3}
        onMenuClick={() => setMenuOpen(true)}
        onNotificationClick={() => setLocation("/evaluator/notifications")}
      />

      <div className="p-4">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="pending" data-testid="tab-pending">
              Pending
            </TabsTrigger>
            <TabsTrigger value="approved" data-testid="tab-approved">
              Approved
            </TabsTrigger>
            <TabsTrigger value="rejected" data-testid="tab-rejected">
              Rejected
            </TabsTrigger>
            <TabsTrigger value="inspected" data-testid="tab-inspected">
              Inspected
            </TabsTrigger>
          </TabsList>

          <TabsContent value="pending" className="space-y-4">
            {mockPendingProperties.map((property) => (
              <PropertyCard
                key={property.id}
                {...property}
                onCardClick={() => setLocation(`/evaluator/properties/${property.id}?fromTab=pending`)}
              />
            ))}
          </TabsContent>

          <TabsContent value="approved" className="space-y-4">
            {mockApprovedProperties.map((property) => (
              <PropertyCard
                key={property.id}
                {...property}
                onCardClick={() => setLocation(`/evaluator/properties/${property.id}?fromTab=approved`)}
              />
            ))}
          </TabsContent>

          <TabsContent value="rejected" className="space-y-4">
            {mockRejectedProperties.map((property) => (
              <PropertyCard
                key={property.id}
                {...property}
                onCardClick={() => setLocation(`/evaluator/properties/${property.id}?fromTab=rejected`)}
              />
            ))}
          </TabsContent>

          <TabsContent value="inspected" className="space-y-4">
            {mockInspectedProperties.map((property) => (
              <PropertyCard
                key={property.id}
                {...property}
                onCardClick={() => setLocation(`/evaluator/properties/${property.id}?fromTab=inspected`)}
              />
            ))}
          </TabsContent>
        </Tabs>
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
