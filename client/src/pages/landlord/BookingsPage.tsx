import { useState, useEffect } from "react";
import { useLocation, useSearch } from "wouter";
import TopBar from "@/components/TopBar";
import BottomNav from "@/components/BottomNav";
import BookingCard from "@/components/BookingCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const mockBookings = [
  {
    id: "1",
    propertyTitle: "Modern 2BR Apartment",
    propertyAddress: "Riverside Drive, Westlands",
    viewingDate: new Date(2025, 0, 20, 14, 0),
    tenantName: "John Kamau",
    status: "confirmed" as const,
  },
  {
    id: "2",
    propertyTitle: "Cozy 1BR Apartment",
    propertyAddress: "Argwings Kodhek Road, Kilimani",
    viewingDate: new Date(2025, 0, 12, 15, 30),
    tenantName: "Mary Njeri",
    status: "completed" as const,
  },
];

export default function BookingsPage() {
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const searchParams = useSearch();
  const params = new URLSearchParams(searchParams);
  const tabFromUrl = params.get("tab") || "upcoming";
  const [activeTab, setActiveTab] = useState(tabFromUrl);
  const [convertDialogOpen, setConvertDialogOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<string | null>(null);
  const [rent, setRent] = useState("");
  const [deposit, setDeposit] = useState("");
  const [terms, setTerms] = useState("");

  useEffect(() => {
    const tab = params.get("tab") || "upcoming";
    setActiveTab(tab);
  }, [searchParams]);

  const handleConvertToTenant = (bookingId: string) => {
    setSelectedBooking(bookingId);
    setConvertDialogOpen(true);
  };

  const handleSubmitAgreement = () => {
    toast({
      title: "Agreement Sent",
      description: "Rental agreement has been sent to the tenant for review and signature.",
    });
    setConvertDialogOpen(false);
    setRent("");
    setDeposit("");
    setTerms("");
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <TopBar
        title="Bookings"
        role="landlord"
        notificationCount={3}
        useMenuSheet={true}
        onNotificationClick={() => setLocation("/landlord/notifications")}
      />
      
      <div className="p-4">
        <Tabs value={activeTab} onValueChange={(tab) => {
          setActiveTab(tab);
          setLocation(`/landlord/bookings?tab=${tab}`);
        }} className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="pending" data-testid="tab-pending">Pending</TabsTrigger>
            <TabsTrigger value="upcoming" data-testid="tab-upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="completed" data-testid="tab-completed">Completed</TabsTrigger>
          </TabsList>
          
          <TabsContent value="pending" className="space-y-4">
            <BookingCard
              {...mockBookings[0]}
              status="pending"
            />
          </TabsContent>
          
          <TabsContent value="upcoming" className="space-y-4">
            <BookingCard {...mockBookings[0]} />
          </TabsContent>
          
          <TabsContent value="completed" className="space-y-4">
            <BookingCard
              {...mockBookings[1]}
              showActions={true}
              onConvertToTenant={() => handleConvertToTenant(mockBookings[1].id)}
              onCancel={() => console.log("Cancel booking")}
            />
          </TabsContent>
        </Tabs>
      </div>
      
      <Dialog open={convertDialogOpen} onOpenChange={setConvertDialogOpen}>
        <DialogContent className="max-w-md mx-4">
          <DialogHeader>
            <DialogTitle>Create Rental Agreement</DialogTitle>
            <DialogDescription>
              Fill in the rental terms for this tenant
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="rent">Monthly Rent (KES)</Label>
              <Input
                id="rent"
                type="number"
                placeholder="85000"
                value={rent}
                onChange={(e) => setRent(e.target.value)}
                data-testid="input-rent"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="deposit">Security Deposit (KES)</Label>
              <Input
                id="deposit"
                type="number"
                placeholder="170000"
                value={deposit}
                onChange={(e) => setDeposit(e.target.value)}
                data-testid="input-deposit"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="terms">Additional Terms</Label>
              <Textarea
                id="terms"
                placeholder="Enter any additional terms and conditions..."
                value={terms}
                onChange={(e) => setTerms(e.target.value)}
                rows={4}
                data-testid="textarea-terms"
              />
            </div>
          </div>
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setConvertDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmitAgreement} data-testid="button-send-agreement">
              Send Agreement
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <BottomNav role="landlord" />
    </div>
  );
}
