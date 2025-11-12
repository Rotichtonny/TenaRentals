import AgreementCard from "../AgreementCard";

export default function AgreementCardExample() {
  return (
    <div className="p-4">
      <AgreementCard
        id="1"
        propertyTitle="Modern 2BR Apartment"
        propertyAddress="Riverside Drive, Westlands"
        landlordName="Sarah Wanjiru"
        rent={85000}
        deposit={170000}
        startDate={new Date(2025, 1, 1)}
        endDate={new Date(2026, 0, 31)}
        status="pending"
        signed={false}
        onSign={() => console.log("Sign agreement")}
        onView={() => console.log("View agreement")}
      />
    </div>
  );
}
