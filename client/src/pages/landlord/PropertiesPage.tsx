import { useState, useEffect } from "react";
import { useLocation, useSearch } from "wouter";
import TopBar from "@/components/TopBar";
import BottomNav from "@/components/BottomNav";
import PropertyCard from "@/components/PropertyCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const mockActiveProperties = [
  {
    id: "1",
    title: "Modern 2BR Apartment",
    address: "Riverside Drive",
    city: "Nairobi",
    bedrooms: 2,
    bathrooms: 2,
    rent: 85000,
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&auto=format&fit=crop",
    status: "approved" as const,
  },
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

const mockPendingProperties = [
  {
    id: "2",
    title: "Cozy 1BR Apartment",
    address: "Argwings Kodhek Road",
    city: "Nairobi",
    bedrooms: 1,
    bathrooms: 1,
    rent: 55000,
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&auto=format&fit=crop",
    status: "pending" as const,
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
    status: "pending" as const,
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

const mockAllProperties = [
  ...mockActiveProperties,
  ...mockPendingProperties,
  ...mockRejectedProperties,
];

export default function LandlordPropertiesPage() {
  const [, setLocation] = useLocation();
  const searchParams = useSearch();
  const params = new URLSearchParams(searchParams);
  const tabFromUrl = params.get("tab") || "all";
  const [activeTab, setActiveTab] = useState(tabFromUrl);

  useEffect(() => {
    const tab = params.get("tab") || "all";
    setActiveTab(tab);
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-background pb-20">
      <TopBar
        title="My Properties"
        role="landlord"
        notificationCount={3}
        useMenuSheet={true}
        onNotificationClick={() => setLocation("/landlord/notifications")}
      />

      <div className="p-4">
        <Tabs value={activeTab} onValueChange={(tab) => {
          setActiveTab(tab);
          setLocation(`/landlord/properties?tab=${tab}`);
        }}>
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="all" data-testid="tab-all">
              All
            </TabsTrigger>
            <TabsTrigger value="approved" data-testid="tab-approved">
              Approved
            </TabsTrigger>
            <TabsTrigger value="pending" data-testid="tab-pending">
              Pending
            </TabsTrigger>
            <TabsTrigger value="rejected" data-testid="tab-rejected">
              Rejected
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            {mockAllProperties.map((property) => (
              <PropertyCard
                key={property.id}
                {...property}
                onCardClick={() => setLocation(`/landlord/properties/${property.id}?from=properties&fromTab=all`)}
              />
            ))}
          </TabsContent>

          <TabsContent value="approved" className="space-y-4">
            {mockActiveProperties.map((property) => (
              <PropertyCard
                key={property.id}
                {...property}
                onCardClick={() => setLocation(`/landlord/properties/${property.id}?from=properties&fromTab=approved`)}
              />
            ))}
          </TabsContent>

          <TabsContent value="pending" className="space-y-4">
            {mockPendingProperties.map((property) => (
              <PropertyCard
                key={property.id}
                {...property}
                onCardClick={() => setLocation(`/landlord/properties/${property.id}?from=properties&fromTab=pending`)}
              />
            ))}
          </TabsContent>

          <TabsContent value="rejected" className="space-y-4">
            {mockRejectedProperties.map((property) => (
              <PropertyCard
                key={property.id}
                {...property}
                onCardClick={() => setLocation(`/landlord/properties/${property.id}?from=properties&fromTab=rejected`)}
              />
            ))}
          </TabsContent>
        </Tabs>
      </div>

      <Button
        size="icon"
        className="fixed bottom-20 right-4 w-14 h-14 rounded-full shadow-lg z-40"
        onClick={() => console.log("Add property")}
        data-testid="button-add-property"
      >
        <Plus className="w-6 h-6" />
      </Button>

      <BottomNav role="landlord" />
    </div>
  );
}
