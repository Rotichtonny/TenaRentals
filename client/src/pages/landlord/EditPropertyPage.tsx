import { useState } from "react";
import { useRoute, useLocation, useSearch } from "wouter";
import TopBar from "@/components/TopBar";
import BottomNav from "@/components/BottomNav";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { X } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function EditPropertyPage() {
  const [, params] = useRoute("/landlord/properties/:id/edit");
  const [, setLocation] = useLocation();
  const searchString = useSearch();
  const { toast } = useToast();
  
  const queryParams = new URLSearchParams(searchString);
  const fromTab = queryParams.get("fromTab") || "all";
  const fromPage = queryParams.get("from");
  const propertyId = params?.id || "1";

  // Mock existing property data
  const [formData, setFormData] = useState({
    title: "Luxury 3BR Penthouse",
    address: "Westlands, Riverside Drive",
    city: "Nairobi",
    bedrooms: "3",
    bathrooms: "3",
    rent: "200000",
    description: "Stunning penthouse with panoramic city views. Features include modern kitchen, spacious living areas, and premium finishes throughout. Located in a secure, upscale neighborhood with excellent amenities.",
    amenities: ["Swimming Pool", "Gym", "24/7 Security", "Parking", "Backup Generator", "High-speed Internet"],
  });

  const [newAmenity, setNewAmenity] = useState("");

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleAddAmenity = () => {
    if (newAmenity.trim()) {
      setFormData(prev => ({
        ...prev,
        amenities: [...prev.amenities, newAmenity.trim()]
      }));
      setNewAmenity("");
    }
  };

  const handleRemoveAmenity = (index: number) => {
    setFormData(prev => ({
      ...prev,
      amenities: prev.amenities.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Property Updated",
      description: "Your property details have been successfully updated.",
    });
    // Navigate back to property detail
    setLocation(`/landlord/properties/${propertyId}?fromTab=${fromTab}${fromPage ? `&from=${fromPage}` : ''}`);
  };

  const handleCancel = () => {
    setLocation(`/landlord/properties/${propertyId}?fromTab=${fromTab}${fromPage ? `&from=${fromPage}` : ''}`);
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <TopBar
        title="Edit Property"
        role="landlord"
        notificationCount={3}
        showBackIcon={true}
        onMenuClick={handleCancel}
        onNotificationClick={() => setLocation("/landlord/notifications")}
      />

      <form onSubmit={handleSubmit} className="p-4 space-y-6">
        {/* Basic Information */}
        <Card className="p-4">
          <h2 className="text-lg font-semibold mb-4">Basic Information</h2>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Property Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                data-testid="input-title"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                value={formData.address}
                onChange={(e) => handleInputChange("address", e.target.value)}
                data-testid="input-address"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                value={formData.city}
                onChange={(e) => handleInputChange("city", e.target.value)}
                data-testid="input-city"
                required
              />
            </div>
          </div>
        </Card>

        {/* Property Details */}
        <Card className="p-4">
          <h2 className="text-lg font-semibold mb-4">Property Details</h2>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="bedrooms">Bedrooms</Label>
                <Input
                  id="bedrooms"
                  type="number"
                  min="1"
                  value={formData.bedrooms}
                  onChange={(e) => handleInputChange("bedrooms", e.target.value)}
                  data-testid="input-bedrooms"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="bathrooms">Bathrooms</Label>
                <Input
                  id="bathrooms"
                  type="number"
                  min="1"
                  value={formData.bathrooms}
                  onChange={(e) => handleInputChange("bathrooms", e.target.value)}
                  data-testid="input-bathrooms"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="rent">Monthly Rent (KES)</Label>
              <Input
                id="rent"
                type="number"
                min="0"
                value={formData.rent}
                onChange={(e) => handleInputChange("rent", e.target.value)}
                data-testid="input-rent"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                rows={5}
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                data-testid="textarea-description"
                required
              />
            </div>
          </div>
        </Card>

        {/* Amenities */}
        <Card className="p-4">
          <h2 className="text-lg font-semibold mb-4">Amenities</h2>
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {formData.amenities.map((amenity, index) => (
                <Badge 
                  key={index} 
                  variant="secondary"
                  className="flex items-center gap-1 pr-1"
                  data-testid={`badge-amenity-${index}`}
                >
                  {amenity}
                  <Button
                    type="button"
                    size="icon"
                    variant="ghost"
                    className="h-4 w-4 p-0 hover:bg-transparent"
                    onClick={() => handleRemoveAmenity(index)}
                    data-testid={`button-remove-amenity-${index}`}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              ))}
            </div>

            <div className="flex gap-2">
              <Input
                placeholder="Add amenity"
                value={newAmenity}
                onChange={(e) => setNewAmenity(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddAmenity();
                  }
                }}
                data-testid="input-new-amenity"
              />
              <Button
                type="button"
                onClick={handleAddAmenity}
                data-testid="button-add-amenity"
              >
                Add
              </Button>
            </div>
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={handleCancel}
            className="flex-1"
            data-testid="button-cancel"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="flex-1"
            data-testid="button-save"
          >
            Save Changes
          </Button>
        </div>
      </form>

      <BottomNav role="landlord" />
    </div>
  );
}
