import TopBar from "@/components/TopBar";
import BottomNav from "@/components/BottomNav";
import MenuSheet from "@/components/MenuSheet";
import StatCard from "@/components/StatCard";
import PropertyCard from "@/components/PropertyCard";
import { Home, Users, Calendar, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { useState } from "react";

const mockStats = [
  { title: "Total Properties", value: 8, icon: Home, trend: { value: "2 this month", positive: true } },
  { title: "Active Tenants", value: 12, icon: Users },
  { title: "Pending Bookings", value: 5, icon: Calendar },
  { title: "Monthly Revenue", value: "KES 680K", icon: DollarSign, trend: { value: "8% from last month", positive: true } },
];

const mockProperties = [
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
];

export default function DashboardPage() {
  const [, setLocation] = useLocation();
  
  return (
    <div className="min-h-screen bg-background pb-20">
      <TopBar
        title="Dashboard"
        role="landlord"
        notificationCount={3}
        useMenuSheet={true}
        onNotificationClick={() => setLocation("/landlord/notifications")}
      />
      
      <div className="p-4 space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <StatCard 
            {...mockStats[0]}
            onClick={() => setLocation("/landlord/properties?tab=all")}
            data-testid="stat-total-properties"
          />
          <StatCard 
            {...mockStats[1]}
            onClick={() => setLocation("/landlord/tenants?tab=active")}
            data-testid="stat-active-tenants"
          />
          <StatCard 
            {...mockStats[2]}
            onClick={() => setLocation("/landlord/bookings?tab=pending")}
            data-testid="stat-pending-bookings"
          />
          <StatCard 
            {...mockStats[3]}
            onClick={() => setLocation("/landlord/payments?tab=all")}
            data-testid="stat-monthly-revenue"
          />
        </div>
        
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Recent Properties</h2>
            <Button 
              size="sm"
              onClick={() => setLocation("/landlord/properties")}
              data-testid="button-view-all"
            >
              View All
            </Button>
          </div>
          <div className="space-y-4">
            {mockProperties.map((property) => (
              <PropertyCard
                key={property.id}
                {...property}
                onCardClick={() => setLocation(`/landlord/properties/${property.id}`)}
              />
            ))}
          </div>
        </div>
      </div>
      
      <BottomNav role="landlord" />
    </div>
  );
}
