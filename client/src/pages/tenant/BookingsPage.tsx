import TopBar from "@/components/TopBar";
import BottomNav from "@/components/BottomNav";
import BookingCard from "@/components/BookingCard";
import EmptyState from "@/components/EmptyState";
import { Calendar } from "lucide-react";

const mockBookings = [
  {
    id: "1",
    propertyTitle: "Modern 2BR Apartment in Westlands",
    propertyAddress: "Riverside Drive, Westlands",
    viewingDate: new Date(2025, 0, 15, 14, 0),
    landlordName: "Sarah Wanjiru",
    status: "confirmed" as const,
  },
  {
    id: "2",
    propertyTitle: "Spacious 3BR House in Karen",
    propertyAddress: "Karen Road, Karen",
    viewingDate: new Date(2025, 0, 18, 10, 0),
    landlordName: "David Mwangi",
    status: "pending" as const,
  },
];

export default function BookingsPage() {
  return (
    <div className="min-h-screen bg-background pb-20">
      <TopBar
        title="My Bookings"
        role="tenant"
        notificationCount={2}
        onMenuClick={() => console.log("Menu clicked")}
        onNotificationClick={() => console.log("Notifications clicked")}
      />
      
      <div className="p-4 space-y-4">
        {mockBookings.length > 0 ? (
          mockBookings.map((booking) => (
            <BookingCard key={booking.id} {...booking} />
          ))
        ) : (
          <EmptyState
            icon={Calendar}
            title="No bookings yet"
            description="You haven't booked any property viewings yet. Browse properties and schedule your first viewing."
            actionLabel="Search Properties"
            onAction={() => console.log("Search properties")}
          />
        )}
      </div>
      
      <BottomNav role="tenant" />
    </div>
  );
}
