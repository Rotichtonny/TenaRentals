import BookingCard from "../BookingCard";

export default function BookingCardExample() {
  return (
    <div className="p-4">
      <BookingCard
        id="1"
        propertyTitle="Modern 2BR Apartment"
        propertyAddress="Riverside Drive, Westlands"
        viewingDate={new Date(2025, 0, 15, 14, 0)}
        tenantName="John Kamau"
        status="completed"
        showActions={true}
        onConvertToTenant={() => console.log("Convert to tenant")}
        onCancel={() => console.log("Cancel booking")}
      />
    </div>
  );
}
