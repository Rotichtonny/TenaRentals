import { useState, useEffect } from "react";
import { useLocation, useSearch } from "wouter";
import TopBar from "@/components/TopBar";
import BottomNav from "@/components/BottomNav";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Phone, Mail, MapPin } from "lucide-react";

const mockActiveTenants = [
  {
    id: "1",
    name: "Sarah Kamau",
    email: "sarah.kamau@email.com",
    phone: "+254 712 345 678",
    property: "Modern 2BR Apartment",
    address: "Riverside Drive",
    rentAmount: 85000,
    moveInDate: "2024-01-15",
    leaseEndDate: "2025-01-14",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
  },
  {
    id: "2",
    name: "David Ochieng",
    email: "david.o@email.com",
    phone: "+254 723 456 789",
    property: "Cozy 1BR Garden Flat",
    address: "Lavington",
    rentAmount: 55000,
    moveInDate: "2024-03-01",
    leaseEndDate: "2025-02-28",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
  },
  {
    id: "3",
    name: "Grace Wanjiru",
    email: "grace.w@email.com",
    phone: "+254 734 567 890",
    property: "Elegant 2BR Apartment",
    address: "Parklands",
    rentAmount: 75000,
    moveInDate: "2024-02-10",
    leaseEndDate: "2025-02-09",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Grace",
  },
];

const mockInactiveTenants = [
  {
    id: "4",
    name: "John Mwangi",
    email: "john.m@email.com",
    phone: "+254 745 678 901",
    property: "Budget Studio",
    address: "South B",
    rentAmount: 30000,
    moveInDate: "2023-06-01",
    moveOutDate: "2024-05-31",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
  },
  {
    id: "5",
    name: "Mary Njeri",
    email: "mary.njeri@email.com",
    phone: "+254 756 789 012",
    property: "Modern 2BR Apartment",
    address: "Riverside Drive",
    rentAmount: 85000,
    moveInDate: "2023-01-15",
    moveOutDate: "2023-12-31",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mary",
  },
];

export default function LandlordTenantsPage() {
  const [, setLocation] = useLocation();
  const searchParams = useSearch();
  const params = new URLSearchParams(searchParams);
  const tabFromUrl = params.get("tab") || "active";
  const [activeTab, setActiveTab] = useState(tabFromUrl);

  useEffect(() => {
    const tab = params.get("tab") || "active";
    setActiveTab(tab);
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-background pb-20">
      <TopBar
        title="Tenants"
        role="landlord"
        notificationCount={3}
        useMenuSheet={true}
        onNotificationClick={() => setLocation("/landlord/notifications")}
      />

      <div className="p-4">
        <Tabs value={activeTab} onValueChange={(tab) => {
          setActiveTab(tab);
          setLocation(`/landlord/tenants?tab=${tab}`);
        }}>
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="active" data-testid="tab-active">
              Active
            </TabsTrigger>
            <TabsTrigger value="inactive" data-testid="tab-inactive">
              Inactive
            </TabsTrigger>
          </TabsList>

          <TabsContent value="active" className="space-y-4">
            {mockActiveTenants.map((tenant) => (
              <Card
                key={tenant.id}
                className="p-4 hover-elevate active-elevate-2 cursor-pointer"
                onClick={() => console.log("View tenant details", tenant.id)}
                data-testid={`card-tenant-${tenant.id}`}
              >
                <div className="flex items-start gap-4">
                  <Avatar className="w-14 h-14">
                    <AvatarImage src={tenant.avatar} alt={tenant.name} />
                    <AvatarFallback>{tenant.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-base" data-testid={`text-tenant-name-${tenant.id}`}>
                        {tenant.name}
                      </h3>
                      <Badge variant="default" className="bg-green-500 hover:bg-green-600">
                        Active
                      </Badge>
                    </div>
                    
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 flex-shrink-0" />
                        <span className="truncate">{tenant.property}, {tenant.address}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 flex-shrink-0" />
                        <span className="truncate">{tenant.email}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 flex-shrink-0" />
                        <span>{tenant.phone}</span>
                      </div>
                    </div>
                    
                    <div className="mt-3 pt-3 border-t flex items-center justify-between text-sm">
                      <div>
                        <span className="text-muted-foreground">Rent: </span>
                        <span className="font-semibold">KSh {tenant.rentAmount.toLocaleString()}/mo</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Lease ends: </span>
                        <span>{new Date(tenant.leaseEndDate).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="inactive" className="space-y-4">
            {mockInactiveTenants.map((tenant) => (
              <Card
                key={tenant.id}
                className="p-4 hover-elevate active-elevate-2 cursor-pointer"
                onClick={() => console.log("View tenant details", tenant.id)}
                data-testid={`card-tenant-${tenant.id}`}
              >
                <div className="flex items-start gap-4">
                  <Avatar className="w-14 h-14">
                    <AvatarImage src={tenant.avatar} alt={tenant.name} />
                    <AvatarFallback>{tenant.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-base" data-testid={`text-tenant-name-${tenant.id}`}>
                        {tenant.name}
                      </h3>
                      <Badge variant="secondary">
                        Inactive
                      </Badge>
                    </div>
                    
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 flex-shrink-0" />
                        <span className="truncate">{tenant.property}, {tenant.address}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 flex-shrink-0" />
                        <span className="truncate">{tenant.email}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 flex-shrink-0" />
                        <span>{tenant.phone}</span>
                      </div>
                    </div>
                    
                    <div className="mt-3 pt-3 border-t flex items-center justify-between text-sm">
                      <div>
                        <span className="text-muted-foreground">Rent: </span>
                        <span className="font-semibold">KSh {tenant.rentAmount.toLocaleString()}/mo</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Moved out: </span>
                        <span>{new Date(tenant.moveOutDate).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>

      <BottomNav role="landlord" />
    </div>
  );
}
