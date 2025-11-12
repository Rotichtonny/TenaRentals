import TopBar from "@/components/TopBar";
import BottomNav from "@/components/BottomNav";
import AgreementCard from "@/components/AgreementCard";
import EmptyState from "@/components/EmptyState";
import { Home } from "lucide-react";

const mockRentals = [
  {
    id: "1",
    propertyTitle: "Modern 2BR Apartment in Westlands",
    propertyAddress: "Riverside Drive, Westlands",
    landlordName: "Sarah Wanjiru",
    rent: 85000,
    deposit: 170000,
    startDate: new Date(2025, 1, 1),
    endDate: new Date(2026, 0, 31),
    status: "active" as const,
    signed: true,
  },
];

export default function RentalsPage() {
  return (
    <div className="min-h-screen bg-background pb-20">
      <TopBar
        title="My Rentals"
        role="tenant"
        notificationCount={2}
        onMenuClick={() => console.log("Menu clicked")}
        onNotificationClick={() => console.log("Notifications clicked")}
      />
      
      <div className="p-4 space-y-4">
        {mockRentals.length > 0 ? (
          mockRentals.map((rental) => (
            <AgreementCard
              key={rental.id}
              {...rental}
              onView={() => console.log("View agreement")}
            />
          ))
        ) : (
          <EmptyState
            icon={Home}
            title="No active rentals"
            description="You don't have any active rental agreements yet. Search for properties and book viewings to get started."
            actionLabel="Search Properties"
            onAction={() => console.log("Search properties")}
          />
        )}
      </div>
      
      <BottomNav role="tenant" />
    </div>
  );
}
