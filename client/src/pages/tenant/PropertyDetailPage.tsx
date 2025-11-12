import { useState } from "react";
import { useRoute, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ArrowLeft, MapPin, Bed, Bath, Calendar } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

export default function PropertyDetailPage() {
  const [, params] = useRoute("/tenant/property/:id");
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [bookingDialogOpen, setBookingDialogOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  const property = {
    id: params?.id,
    title: "Modern 2BR Apartment in Westlands",
    address: "Riverside Drive",
    city: "Nairobi",
    bedrooms: 2,
    bathrooms: 2,
    rent: 85000,
    description: "Beautiful modern apartment with stunning city views. Features include fully equipped kitchen, spacious living room, and access to gym and swimming pool. Located in a secure gated community with 24/7 security.",
    images: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&auto=format&fit=crop",
    ],
    amenities: ["Gym", "Swimming Pool", "Parking", "24/7 Security", "Backup Generator"],
  };

  const handleBookViewing = () => {
    if (!selectedDate || !selectedTime) return;
    
    toast({
      title: "Viewing Booked",
      description: `Your viewing has been scheduled for ${selectedDate} at ${selectedTime}`,
    });
    setBookingDialogOpen(false);
    setTimeout(() => {
      setLocation("/tenant/bookings");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background pb-6">
      <div className="relative">
        <div className="aspect-video overflow-hidden">
          <img
            src={property.images[0]}
            alt={property.title}
            className="w-full h-full object-cover"
          />
        </div>
        <Button
          size="icon"
          variant="outline"
          className="absolute top-4 left-4 bg-background/80 backdrop-blur-sm"
          onClick={() => setLocation("/tenant/search")}
          data-testid="button-back"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <Badge className="absolute top-4 right-4 bg-green-500 text-white">
          Verified
        </Badge>
      </div>

      <div className="p-4 space-y-6">
        <div>
          <div className="flex items-start justify-between mb-2">
            <h1 className="text-2xl font-semibold" data-testid="text-title">
              {property.title}
            </h1>
            <div className="text-right">
              <p className="text-2xl font-bold text-primary" data-testid="text-rent">
                KES {property.rent.toLocaleString()}
              </p>
              <p className="text-sm text-muted-foreground">per month</p>
            </div>
          </div>
          <div className="flex items-center gap-1 text-muted-foreground">
            <MapPin className="w-4 h-4" />
            <span>{property.address}, {property.city}</span>
          </div>
        </div>

        <div className="flex gap-6">
          <div className="flex items-center gap-2">
            <Bed className="w-5 h-5 text-muted-foreground" />
            <span className="font-medium">{property.bedrooms} Bedrooms</span>
          </div>
          <div className="flex items-center gap-2">
            <Bath className="w-5 h-5 text-muted-foreground" />
            <span className="font-medium">{property.bathrooms} Bathrooms</span>
          </div>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-2">Description</h2>
          <p className="text-muted-foreground leading-relaxed">
            {property.description}
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-3">Amenities</h2>
          <div className="flex flex-wrap gap-2">
            {property.amenities.map((amenity, index) => (
              <Badge key={index} variant="secondary">
                {amenity}
              </Badge>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-3">Gallery</h2>
          <div className="grid grid-cols-3 gap-2">
            {property.images.slice(1).map((image, index) => (
              <div key={index} className="aspect-square rounded-lg overflow-hidden">
                <img
                  src={image}
                  alt={`Gallery ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        <Button
          className="w-full"
          size="lg"
          onClick={() => setBookingDialogOpen(true)}
          data-testid="button-book-viewing"
        >
          <Calendar className="w-5 h-5 mr-2" />
          Book Viewing
        </Button>
      </div>

      <Dialog open={bookingDialogOpen} onOpenChange={setBookingDialogOpen}>
        <DialogContent className="max-w-md mx-4">
          <DialogHeader>
            <DialogTitle>Book Property Viewing</DialogTitle>
            <DialogDescription>
              Select your preferred date and time for the viewing
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="date">Viewing Date</Label>
              <Select value={selectedDate} onValueChange={setSelectedDate}>
                <SelectTrigger data-testid="select-date">
                  <SelectValue placeholder="Select date" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2025-01-15">Wednesday, January 15, 2025</SelectItem>
                  <SelectItem value="2025-01-16">Thursday, January 16, 2025</SelectItem>
                  <SelectItem value="2025-01-17">Friday, January 17, 2025</SelectItem>
                  <SelectItem value="2025-01-18">Saturday, January 18, 2025</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="time">Viewing Time</Label>
              <Select value={selectedTime} onValueChange={setSelectedTime}>
                <SelectTrigger data-testid="select-time">
                  <SelectValue placeholder="Select time" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="09:00">9:00 AM</SelectItem>
                  <SelectItem value="10:00">10:00 AM</SelectItem>
                  <SelectItem value="11:00">11:00 AM</SelectItem>
                  <SelectItem value="14:00">2:00 PM</SelectItem>
                  <SelectItem value="15:00">3:00 PM</SelectItem>
                  <SelectItem value="16:00">4:00 PM</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setBookingDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleBookViewing}
              disabled={!selectedDate || !selectedTime}
              data-testid="button-confirm-booking"
            >
              Confirm Booking
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
