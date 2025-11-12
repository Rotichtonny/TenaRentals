import { useState } from "react";
import { useLocation } from "wouter";
import TopBar from "@/components/TopBar";
import BottomNav from "@/components/BottomNav";
import PropertyCard from "@/components/PropertyCard";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const mockAssignments = [
  {
    id: "1",
    title: "Luxury 3BR Penthouse",
    address: "Westlands",
    city: "Nairobi",
    bedrooms: 3,
    bathrooms: 3,
    rent: 200000,
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&auto=format&fit=crop",
    status: "awaiting_evaluation" as const,
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

const inspectionChecklist = [
  "Property matches listing description",
  "All rooms are in good condition",
  "Plumbing and electrical systems functional",
  "Safety measures in place (fire extinguisher, emergency exits)",
  "Property is clean and well-maintained",
  "Location verified and accessible",
  "Landlord documents verified",
];

export default function AssignmentsPage() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [inspectionDialogOpen, setInspectionDialogOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<string | null>(null);
  const [checkedItems, setCheckedItems] = useState<Record<number, boolean>>({});

  const handleStartInspection = (propertyId: string) => {
    setSelectedProperty(propertyId);
    setInspectionDialogOpen(true);
  };

  const handleApproveProperty = () => {
    toast({
      title: "Property Approved",
      description: "The property has been approved and is now live for tenants to view.",
    });
    setInspectionDialogOpen(false);
    setCheckedItems({});
  };

  const allChecked = inspectionChecklist.every((_, index) => checkedItems[index]);

  return (
    <div className="min-h-screen bg-background pb-20">
      <TopBar
        title="My Assignments"
        role="evaluator"
        notificationCount={2}
        onMenuClick={() => console.log("Menu clicked")}
        onNotificationClick={() => console.log("Notifications clicked")}
      />
      
      <div className="p-4 space-y-4">
        {mockAssignments.map((property) => (
          <div key={property.id} className="space-y-2">
            <PropertyCard
              {...property}
              onCardClick={() => handleStartInspection(property.id)}
            />
            <Button
              className="w-full"
              onClick={() => handleStartInspection(property.id)}
              data-testid={`button-inspect-${property.id}`}
            >
              Start Inspection
            </Button>
          </div>
        ))}
      </div>
      
      <Dialog open={inspectionDialogOpen} onOpenChange={setInspectionDialogOpen}>
        <DialogContent className="max-w-md mx-4 max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Property Inspection Checklist</DialogTitle>
            <DialogDescription>
              Complete all items to approve the property
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            {inspectionChecklist.map((item, index) => (
              <div key={index} className="flex items-start gap-3">
                <Checkbox
                  id={`check-${index}`}
                  checked={checkedItems[index] || false}
                  onCheckedChange={(checked) => 
                    setCheckedItems(prev => ({ ...prev, [index]: checked as boolean }))
                  }
                  data-testid={`checkbox-${index}`}
                />
                <Label
                  htmlFor={`check-${index}`}
                  className="text-sm font-normal leading-relaxed cursor-pointer"
                >
                  {item}
                </Label>
              </div>
            ))}
          </div>
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setInspectionDialogOpen(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleApproveProperty} 
              disabled={!allChecked}
              data-testid="button-approve-property"
            >
              Approve Property
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <BottomNav role="evaluator" />
    </div>
  );
}
