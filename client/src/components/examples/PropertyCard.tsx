import PropertyCard from "../PropertyCard";

export default function PropertyCardExample() {
  return (
    <div className="p-4">
      <PropertyCard
        id="1"
        title="Modern 2BR Apartment in Westlands"
        address="Riverside Drive"
        city="Nairobi"
        bedrooms={2}
        bathrooms={2}
        rent={85000}
        image="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&auto=format&fit=crop"
        status="approved"
        onCardClick={() => console.log("Property card clicked")}
      />
    </div>
  );
}
