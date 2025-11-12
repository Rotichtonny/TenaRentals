import { useState } from "react";
import { useLocation } from "wouter";
import TopBar from "@/components/TopBar";
import BottomNav from "@/components/BottomNav";
import SearchBar from "@/components/SearchBar";
import PropertyCard from "@/components/PropertyCard";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";

const mockProperties = [
  {
    id: "1",
    title: "Modern 2BR Apartment in Westlands",
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
    title: "Spacious 3BR House in Karen",
    address: "Karen Road",
    city: "Nairobi",
    bedrooms: 3,
    bathrooms: 3,
    rent: 150000,
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&auto=format&fit=crop",
    status: "approved" as const,
  },
  {
    id: "3",
    title: "Cozy 1BR Apartment in Kilimani",
    address: "Argwings Kodhek Road",
    city: "Nairobi",
    bedrooms: 1,
    bathrooms: 1,
    rent: 55000,
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&auto=format&fit=crop",
    status: "approved" as const,
  },
];

export default function SearchPage() {
  const [, setLocation] = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  const [bedrooms, setBedrooms] = useState<string>("");
  const [priceRange, setPriceRange] = useState([0, 200000]);

  return (
    <div className="min-h-screen bg-background pb-20">
      <TopBar
        title="Search Properties"
        role="tenant"
        notificationCount={2}
        onMenuClick={() => console.log("Menu clicked")}
        onNotificationClick={() => console.log("Notifications clicked")}
      />
      
      <div className="p-4 space-y-4">
        <Sheet open={filterOpen} onOpenChange={setFilterOpen}>
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            onFilterClick={() => setFilterOpen(true)}
            placeholder="Search by location, name..."
          />
          
          <SheetContent side="bottom" className="h-[80vh]">
            <SheetHeader>
              <SheetTitle>Filter Properties</SheetTitle>
            </SheetHeader>
            <div className="space-y-6 mt-6">
              <div className="space-y-2">
                <Label>Bedrooms</Label>
                <Select value={bedrooms} onValueChange={setBedrooms}>
                  <SelectTrigger data-testid="select-bedrooms">
                    <SelectValue placeholder="Any" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Any</SelectItem>
                    <SelectItem value="1">1 Bedroom</SelectItem>
                    <SelectItem value="2">2 Bedrooms</SelectItem>
                    <SelectItem value="3">3 Bedrooms</SelectItem>
                    <SelectItem value="4">4+ Bedrooms</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label>Price Range (KES/month)</Label>
                <div className="pt-2">
                  <Slider
                    value={priceRange}
                    onValueChange={setPriceRange}
                    max={200000}
                    step={5000}
                    className="mb-2"
                  />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>KES {priceRange[0].toLocaleString()}</span>
                    <span>KES {priceRange[1].toLocaleString()}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button variant="outline" className="flex-1" onClick={() => setFilterOpen(false)}>
                  Cancel
                </Button>
                <Button className="flex-1" onClick={() => setFilterOpen(false)}>
                  Apply Filters
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>

        <div className="space-y-4">
          {mockProperties.map((property) => (
            <PropertyCard
              key={property.id}
              {...property}
              onCardClick={() => setLocation(`/tenant/property/${property.id}`)}
            />
          ))}
        </div>
      </div>
      
      <BottomNav role="tenant" />
    </div>
  );
}
