import { useState } from "react";
import { useLocation, useSearch } from "wouter";
import TopBar from "@/components/TopBar";
import BottomNav from "@/components/BottomNav";
import PropertyCard from "@/components/PropertyCard";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Card } from "@/components/ui/card";
import { Home, Users, FileText, Settings, LogOut } from "lucide-react";

const mockProperties = {
  pending: [
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
      status: "pending" as const,
    },
  ],
  evaluation: [
    {
      id: "3",
      title: "Spacious 2BR in Kilimani",
      address: "Kilimani",
      city: "Nairobi",
      bedrooms: 2,
      bathrooms: 2,
      rent: 75000,
      image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&auto=format&fit=crop",
      status: "awaiting_evaluation" as const,
    },
  ],
  processed: [
    {
      id: "4",
      title: "Modern 2BR Apartment",
      address: "Riverside Drive",
      city: "Nairobi",
      bedrooms: 2,
      bathrooms: 2,
      rent: 85000,
      image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&auto=format&fit=crop",
      status: "approved" as const,
    },
    {
      id: "5",
      title: "Cozy 1BR Apartment",
      address: "Kileleshwa",
      city: "Nairobi",
      bedrooms: 1,
      bathrooms: 1,
      rent: 55000,
      image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&auto=format&fit=crop",
      status: "approved" as const,
    },
    {
      id: "6",
      title: "Old Bedsitter",
      address: "Eastlands",
      city: "Nairobi",
      bedrooms: 1,
      bathrooms: 1,
      rent: 25000,
      image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&auto=format&fit=crop",
      status: "rejected" as const,
    },
    {
      id: "7",
      title: "Unfinished 2BR Unit",
      address: "Industrial Area",
      city: "Nairobi",
      bedrooms: 2,
      bathrooms: 1,
      rent: 35000,
      image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&auto=format&fit=crop",
      status: "rejected" as const,
    },
  ],
};

const mockEvaluators = [
  { id: "1", name: "John Kimani" },
  { id: "2", name: "Sarah Wanjiku" },
  { id: "3", name: "David Omondi" },
];

export default function PropertiesPage() {
  const [, setLocation] = useLocation();
  const searchString = useSearch();
  const { toast } = useToast();
  const [menuOpen, setMenuOpen] = useState(false);
  const [assignDialogOpen, setAssignDialogOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<string | null>(null);
  const [selectedEvaluator, setSelectedEvaluator] = useState("");

  // Get tab from URL query params
  const params = new URLSearchParams(searchString);
  const tabFromUrl = params.get("tab") || "pending";

  const handleLogout = () => {
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
    setTimeout(() => {
      setLocation("/login");
    }, 1000);
  };

  const handleAssignEvaluator = (propertyId: string) => {
    setSelectedProperty(propertyId);
    setAssignDialogOpen(true);
  };

  const handleConfirmAssignment = () => {
    if (!selectedEvaluator) return;

    toast({
      title: "Evaluator Assigned",
      description: "The property has been assigned to an evaluator for inspection.",
    });
    setAssignDialogOpen(false);
    setSelectedProperty(null);
    setSelectedEvaluator("");
  };

  const handleApprove = (propertyId: string) => {
    toast({
      title: "Property Approved",
      description: "The property has been approved and is now live.",
    });
  };

  const handleReject = (propertyId: string) => {
    toast({
      title: "Property Rejected",
      description: "The property has been rejected and the landlord has been notified.",
      variant: "destructive",
    });
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <TopBar
        title="Properties"
        role="admin"
        notificationCount={5}
        onMenuClick={() => setMenuOpen(true)}
        onNotificationClick={() => setLocation("/admin/notifications")}
      />

      <div className="p-4">
        <Tabs defaultValue={tabFromUrl} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="pending" data-testid="tab-pending">
              Pending
            </TabsTrigger>
            <TabsTrigger value="evaluation" data-testid="tab-evaluation">
              In Review
            </TabsTrigger>
            <TabsTrigger value="processed" data-testid="tab-processed">
              Processed
            </TabsTrigger>
          </TabsList>

          <TabsContent value="pending" className="space-y-4">
            {mockProperties.pending.map((property) => (
              <div key={property.id}>
                <PropertyCard
                  {...property}
                  onCardClick={() => setLocation(`/admin/properties/${property.id}?fromTab=pending`)}
                />
                <div className="flex gap-2 mt-2">
                  <Button
                    size="sm"
                    className="flex-1"
                    onClick={() => handleAssignEvaluator(property.id)}
                    data-testid={`button-assign-${property.id}`}
                  >
                    Assign Evaluator
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1"
                    onClick={() => handleReject(property.id)}
                    data-testid={`button-reject-${property.id}`}
                  >
                    Reject
                  </Button>
                </div>
              </div>
            ))}
          </TabsContent>

          <TabsContent value="evaluation" className="space-y-4">
            {mockProperties.evaluation.map((property) => (
              <PropertyCard
                key={property.id}
                {...property}
                onCardClick={() => setLocation(`/admin/properties/${property.id}?fromTab=evaluation`)}
              />
            ))}
          </TabsContent>

          <TabsContent value="processed" className="space-y-4">
            {mockProperties.processed.map((property) => (
              <PropertyCard
                key={property.id}
                {...property}
                onCardClick={() => setLocation(`/admin/properties/${property.id}?fromTab=processed`)}
              />
            ))}
          </TabsContent>
        </Tabs>
      </div>

      <BottomNav role="admin" />

      <Dialog open={assignDialogOpen} onOpenChange={setAssignDialogOpen}>
        <DialogContent className="max-w-md mx-4">
          <DialogHeader>
            <DialogTitle>Assign Property Evaluator</DialogTitle>
            <DialogDescription>
              Select an evaluator to inspect this property
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="space-y-2">
              <Label htmlFor="evaluator">Select Evaluator</Label>
              <Select value={selectedEvaluator} onValueChange={setSelectedEvaluator}>
                <SelectTrigger data-testid="select-evaluator">
                  <SelectValue placeholder="Choose an evaluator" />
                </SelectTrigger>
                <SelectContent>
                  {mockEvaluators.map((evaluator) => (
                    <SelectItem key={evaluator.id} value={evaluator.id}>
                      {evaluator.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setAssignDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleConfirmAssignment}
              disabled={!selectedEvaluator}
              data-testid="button-confirm-assign"
            >
              Assign Evaluator
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

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
