import MaintenanceCard from "../MaintenanceCard";

export default function MaintenanceCardExample() {
  return (
    <div className="p-4">
      <MaintenanceCard
        id="1"
        title="Leaking kitchen faucet"
        description="The kitchen faucet has been leaking for the past week. Water drips continuously even when fully closed."
        propertyTitle="Modern 2BR Apartment"
        propertyAddress="Riverside Drive, Westlands"
        status="pending"
        priority="high"
        createdAt={new Date(2025, 0, 10)}
        onClick={() => console.log("Maintenance card clicked")}
      />
    </div>
  );
}
