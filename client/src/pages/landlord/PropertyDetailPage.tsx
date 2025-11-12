import { useState } from "react";
import { useRoute, useLocation, useSearch } from "wouter";
import TopBar from "@/components/TopBar";
import BottomNav from "@/components/BottomNav";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { MapPin, Bed, Bath, Calendar, User, Phone, Mail, CheckCircle, XCircle, Edit, Plus, Home } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

type Unit = {
  id: string;
  unitNumber: string;
  bedrooms: number;
  bathrooms: number;
  rent: number;
  status: "available" | "occupied" | "maintenance";
  floor: number;
  squareFeet?: number;
};

export default function LandlordPropertyDetailPage() {
  const [, params] = useRoute("/landlord/properties/:id");
  const [, setLocation] = useLocation();
  const searchString = useSearch();
  const { toast } = useToast();
  
  // Get the navigation context from URL query params
  const queryParams = new URLSearchParams(searchString);
  const fromTab = queryParams.get("fromTab") || "active";
  const fromPage = queryParams.get("from"); // "dashboard" or null
  const [imageViewerOpen, setImageViewerOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  
  // Units management state
  const [addUnitDialogOpen, setAddUnitDialogOpen] = useState(false);
  const [editUnitDialogOpen, setEditUnitDialogOpen] = useState(false);
  const [selectedUnit, setSelectedUnit] = useState<Unit | null>(null);
  const [units, setUnits] = useState<Unit[]>([
    {
      id: "1",
      unitNumber: "A-101",
      bedrooms: 2,
      bathrooms: 2,
      rent: 85000,
      status: "occupied",
      floor: 1,
      squareFeet: 850,
    },
    {
      id: "2",
      unitNumber: "A-102",
      bedrooms: 2,
      bathrooms: 2,
      rent: 85000,
      status: "available",
      floor: 1,
      squareFeet: 850,
    },
    {
      id: "3",
      unitNumber: "B-201",
      bedrooms: 3,
      bathrooms: 3,
      rent: 120000,
      status: "occupied",
      floor: 2,
      squareFeet: 1200,
    },
  ]);
  
  // Form state for add/edit unit
  const [unitForm, setUnitForm] = useState<{
    unitNumber: string;
    bedrooms: string;
    bathrooms: string;
    rent: string;
    status: "available" | "occupied" | "maintenance";
    floor: string;
    squareFeet: string;
  }>({
    unitNumber: "",
    bedrooms: "",
    bathrooms: "",
    rent: "",
    status: "available",
    floor: "",
    squareFeet: "",
  });

  const handleImageClick = (image: string) => {
    setSelectedImage(image);
    setImageViewerOpen(true);
  };

  // Mock property data - in real app, this would be fetched based on params.id
  // Using different data based on ID to demonstrate different states
  const propertyId = params?.id || "1";
  
  // Determine status based on property ID for demo purposes
  const getPropertyByStatus = () => {
    if (propertyId === "1" || propertyId === "2") {
      // Pending properties
      return {
        status: "pending" as const,
        evaluation: null,
      };
    } else if (propertyId === "3") {
      // In review properties
      return {
        status: "awaiting_evaluation" as const,
        evaluation: {
          evaluatorName: "Sarah Wanjiku",
          assignedDate: "January 10, 2025, 2:30 PM",
          evaluationStatus: "In Progress" as const,
          evaluationReason: null,
          completedDate: null,
        },
      };
    } else if (propertyId === "6" || propertyId === "7") {
      // Rejected properties
      return {
        status: "rejected" as const,
        evaluation: {
          evaluatorName: "John Kimani",
          assignedDate: "January 9, 2025, 10:15 AM",
          evaluationStatus: "Rejected" as const,
          evaluationReason: "Property does not meet minimum safety standards. Issues found: inadequate fire safety equipment, structural concerns in the foundation, and insufficient ventilation in bathrooms.",
          completedDate: "January 11, 2025, 4:20 PM",
        },
      };
    } else {
      // Approved properties
      return {
        status: "approved" as const,
        evaluation: {
          evaluatorName: "David Omondi",
          assignedDate: "January 9, 2025, 9:00 AM",
          evaluationStatus: "Approved" as const,
          evaluationReason: "Property meets all required standards. Excellent condition, well-maintained, and fully compliant with safety regulations.",
          completedDate: "January 10, 2025, 3:45 PM",
        },
      };
    }
  };

  const propertyStatus = getPropertyByStatus();

  const property = {
    id: propertyId,
    title: "Luxury 3BR Penthouse",
    address: "Westlands, Riverside Drive",
    city: "Nairobi",
    bedrooms: 3,
    bathrooms: 3,
    rent: 200000,
    description: "Stunning penthouse with panoramic city views. Features include modern kitchen, spacious living areas, and premium finishes throughout. Located in a secure, upscale neighborhood with excellent amenities.",
    images: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&auto=format&fit=crop",
    ],
    amenities: ["Swimming Pool", "Gym", "24/7 Security", "Parking", "Backup Generator", "High-speed Internet"],
    ...propertyStatus,
    submittedDate: "January 8, 2025",
    landlord: {
      name: "James Mwangi",
      email: "james.mwangi@email.com",
      phone: "+254 712 345 678",
    },
  };


  const statusColors = {
    pending: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300",
    awaiting_evaluation: "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300",
    approved: "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300",
    rejected: "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300",
  };

  const getStatusLabel = (status: typeof property.status) => {
    if (status === "awaiting_evaluation") return "In Review";
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  const getUnitStatusColor = (status: Unit["status"]) => {
    switch (status) {
      case "available":
        return "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300";
      case "occupied":
        return "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300";
      case "maintenance":
        return "bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300";
    }
  };

  const handleAddUnit = () => {
    setUnitForm({
      unitNumber: "",
      bedrooms: "",
      bathrooms: "",
      rent: "",
      status: "available",
      floor: "",
      squareFeet: "",
    });
    setAddUnitDialogOpen(true);
  };

  const handleEditUnit = (unit: Unit) => {
    setSelectedUnit(unit);
    setUnitForm({
      unitNumber: unit.unitNumber,
      bedrooms: unit.bedrooms.toString(),
      bathrooms: unit.bathrooms.toString(),
      rent: unit.rent.toString(),
      status: unit.status,
      floor: unit.floor.toString(),
      squareFeet: unit.squareFeet?.toString() || "",
    });
    setEditUnitDialogOpen(true);
  };

  const handleSaveUnit = () => {
    // Validation
    const unitNumber = unitForm.unitNumber.trim();
    if (!unitNumber) {
      toast({
        title: "Validation Error",
        description: "Unit number is required",
        variant: "destructive",
      });
      return;
    }

    // Validate bedrooms
    if (!/^\d+$/.test(unitForm.bedrooms.trim())) {
      toast({
        title: "Validation Error",
        description: "Bedrooms must be a valid number",
        variant: "destructive",
      });
      return;
    }
    const bedrooms = Number(unitForm.bedrooms);
    if (bedrooms < 1) {
      toast({
        title: "Validation Error",
        description: "Bedrooms must be greater than 0",
        variant: "destructive",
      });
      return;
    }

    // Validate bathrooms
    if (!/^\d+$/.test(unitForm.bathrooms.trim())) {
      toast({
        title: "Validation Error",
        description: "Bathrooms must be a valid number",
        variant: "destructive",
      });
      return;
    }
    const bathrooms = Number(unitForm.bathrooms);
    if (bathrooms < 1) {
      toast({
        title: "Validation Error",
        description: "Bathrooms must be greater than 0",
        variant: "destructive",
      });
      return;
    }

    // Validate rent
    if (!/^\d+$/.test(unitForm.rent.trim())) {
      toast({
        title: "Validation Error",
        description: "Rent must be a valid number",
        variant: "destructive",
      });
      return;
    }
    const rent = Number(unitForm.rent);

    // Validate floor
    if (!/^\d+$/.test(unitForm.floor.trim())) {
      toast({
        title: "Validation Error",
        description: "Floor must be a valid number",
        variant: "destructive",
      });
      return;
    }
    const floor = Number(unitForm.floor);
    if (floor < 1) {
      toast({
        title: "Validation Error",
        description: "Floor must be greater than 0",
        variant: "destructive",
      });
      return;
    }

    // Validate square feet (optional)
    let squareFeet: number | undefined = undefined;
    if (unitForm.squareFeet.trim()) {
      if (!/^\d+$/.test(unitForm.squareFeet.trim())) {
        toast({
          title: "Validation Error",
          description: "Square feet must be a valid number",
          variant: "destructive",
        });
        return;
      }
      squareFeet = Number(unitForm.squareFeet);
    }

    const newUnit: Unit = {
      id: Date.now().toString(),
      unitNumber,
      bedrooms,
      bathrooms,
      rent,
      status: unitForm.status,
      floor,
      squareFeet,
    };

    setUnits([...units, newUnit]);
    setAddUnitDialogOpen(false);
    toast({
      title: "Unit Added",
      description: `Unit ${newUnit.unitNumber} has been successfully added.`,
    });
  };

  const handleUpdateUnit = () => {
    if (!selectedUnit) return;

    // Validation
    const unitNumber = unitForm.unitNumber.trim();
    if (!unitNumber) {
      toast({
        title: "Validation Error",
        description: "Unit number is required",
        variant: "destructive",
      });
      return;
    }

    // Validate bedrooms
    if (!/^\d+$/.test(unitForm.bedrooms.trim())) {
      toast({
        title: "Validation Error",
        description: "Bedrooms must be a valid number",
        variant: "destructive",
      });
      return;
    }
    const bedrooms = Number(unitForm.bedrooms);
    if (bedrooms < 1) {
      toast({
        title: "Validation Error",
        description: "Bedrooms must be greater than 0",
        variant: "destructive",
      });
      return;
    }

    // Validate bathrooms
    if (!/^\d+$/.test(unitForm.bathrooms.trim())) {
      toast({
        title: "Validation Error",
        description: "Bathrooms must be a valid number",
        variant: "destructive",
      });
      return;
    }
    const bathrooms = Number(unitForm.bathrooms);
    if (bathrooms < 1) {
      toast({
        title: "Validation Error",
        description: "Bathrooms must be greater than 0",
        variant: "destructive",
      });
      return;
    }

    // Validate rent
    if (!/^\d+$/.test(unitForm.rent.trim())) {
      toast({
        title: "Validation Error",
        description: "Rent must be a valid number",
        variant: "destructive",
      });
      return;
    }
    const rent = Number(unitForm.rent);

    // Validate floor
    if (!/^\d+$/.test(unitForm.floor.trim())) {
      toast({
        title: "Validation Error",
        description: "Floor must be a valid number",
        variant: "destructive",
      });
      return;
    }
    const floor = Number(unitForm.floor);
    if (floor < 1) {
      toast({
        title: "Validation Error",
        description: "Floor must be greater than 0",
        variant: "destructive",
      });
      return;
    }

    // Validate square feet (optional)
    let squareFeet: number | undefined = undefined;
    if (unitForm.squareFeet.trim()) {
      if (!/^\d+$/.test(unitForm.squareFeet.trim())) {
        toast({
          title: "Validation Error",
          description: "Square feet must be a valid number",
          variant: "destructive",
        });
        return;
      }
      squareFeet = Number(unitForm.squareFeet);
    }

    const updatedUnit: Unit = {
      ...selectedUnit,
      unitNumber,
      bedrooms,
      bathrooms,
      rent,
      status: unitForm.status,
      floor,
      squareFeet,
    };

    setUnits(units.map(u => u.id === selectedUnit.id ? updatedUnit : u));
    setEditUnitDialogOpen(false);
    toast({
      title: "Unit Updated",
      description: `Unit ${updatedUnit.unitNumber} has been successfully updated.`,
    });
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <TopBar
        title="Property Details"
        role="landlord"
        notificationCount={3}
        showBackIcon={true}
        onMenuClick={() => {
          if (fromPage === "dashboard") {
            setLocation("/landlord/dashboard");
          } else {
            setLocation(`/landlord/properties?tab=${fromTab}`);
          }
        }}
        onNotificationClick={() => setLocation("/landlord/notifications")}
        actionIcon={<Edit className="w-5 h-5" />}
        onActionClick={() => setLocation(`/landlord/properties/${propertyId}/edit?fromTab=${fromTab}${fromPage ? `&from=${fromPage}` : ''}`)}
      />

      <div className="p-4 space-y-6">
        {/* Property Images */}
        <div 
          className="aspect-video rounded-lg overflow-hidden cursor-pointer hover-elevate active-elevate-2"
          onClick={() => handleImageClick(property.images[0])}
          data-testid="image-main"
        >
          <img
            src={property.images[0]}
            alt={property.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Property Header */}
        <div>
          <div className="flex items-start justify-between mb-2">
            <div className="flex-1">
              <h1 className="text-2xl font-semibold mb-2" data-testid="text-title">
                {property.title}
              </h1>
              <div className="flex items-center gap-1 text-muted-foreground mb-2">
                <MapPin className="w-4 h-4" />
                <span>{property.address}</span>
              </div>
            </div>
            <Badge className={statusColors[property.status]}>
              {getStatusLabel(property.status)}
            </Badge>
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
          <div className="mt-3">
            <p className="text-2xl font-bold text-primary">
              KES {property.rent.toLocaleString()}
              <span className="text-sm font-normal text-muted-foreground"> / month</span>
            </p>
          </div>
        </div>

        {/* Property Info */}
        <Card className="p-4">
          <h2 className="text-lg font-semibold mb-3">Property Information</h2>
          <div className="space-y-3 text-sm">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-muted-foreground" />
              <span className="text-muted-foreground">Submitted:</span>
              <span className="font-medium">{property.submittedDate}</span>
            </div>
          </div>
        </Card>

        {/* Evaluation Information */}
        {property.evaluation && (
          <Card className="p-4">
            <h2 className="text-lg font-semibold mb-3">Evaluation Information</h2>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-2">
                <User className="w-4 h-4 text-muted-foreground mt-0.5" />
                <div className="flex-1">
                  <span className="text-muted-foreground">Evaluator:</span>
                  <span className="font-medium ml-2">{property.evaluation.evaluatorName}</span>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Calendar className="w-4 h-4 text-muted-foreground mt-0.5" />
                <div className="flex-1">
                  <span className="text-muted-foreground">Assigned:</span>
                  <span className="font-medium ml-2">{property.evaluation.assignedDate}</span>
                </div>
              </div>
              {property.evaluation.completedDate && (
                <div className="flex items-start gap-2">
                  <Calendar className="w-4 h-4 text-muted-foreground mt-0.5" />
                  <div className="flex-1">
                    <span className="text-muted-foreground">Completed:</span>
                    <span className="font-medium ml-2">{property.evaluation.completedDate}</span>
                  </div>
                </div>
              )}
              <div className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-muted-foreground mt-0.5" />
                <div className="flex-1">
                  <span className="text-muted-foreground">Status:</span>
                  <Badge 
                    className={`ml-2 ${
                      property.evaluation.evaluationStatus === "Approved" 
                        ? "bg-green-500 text-white" 
                        : property.evaluation.evaluationStatus === "Rejected"
                        ? "bg-red-500 text-white"
                        : "bg-blue-500 text-white"
                    }`}
                  >
                    {property.evaluation.evaluationStatus}
                  </Badge>
                </div>
              </div>
              {property.evaluation.evaluationReason && (
                <div className="pt-2 border-t">
                  <p className="text-muted-foreground font-medium mb-1">Evaluation Notes:</p>
                  <p className="text-foreground leading-relaxed">
                    {property.evaluation.evaluationReason}
                  </p>
                </div>
              )}
            </div>
          </Card>
        )}

        {/* Landlord Info */}
        <Card className="p-4">
          <h2 className="text-lg font-semibold mb-3">Landlord Information</h2>
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-muted-foreground" />
              <span className="font-medium">{property.landlord.name}</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-muted-foreground" />
              <span className="text-muted-foreground">{property.landlord.email}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-muted-foreground" />
              <span className="text-muted-foreground">{property.landlord.phone}</span>
            </div>
          </div>
        </Card>

        {/* Description */}
        <Card className="p-4">
          <h2 className="text-lg font-semibold mb-2">Description</h2>
          <p className="text-muted-foreground leading-relaxed">
            {property.description}
          </p>
        </Card>

        {/* Amenities */}
        <Card className="p-4">
          <h2 className="text-lg font-semibold mb-3">Amenities</h2>
          <div className="flex flex-wrap gap-2">
            {property.amenities.map((amenity, index) => (
              <Badge key={index} variant="secondary">
                {amenity}
              </Badge>
            ))}
          </div>
        </Card>

        {/* Units */}
        <Card className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Units ({units.length})</h2>
            <Button 
              size="sm" 
              onClick={handleAddUnit}
              data-testid="button-add-unit"
            >
              <Plus className="w-4 h-4 mr-1" />
              Add Unit
            </Button>
          </div>
          
          {units.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Home className="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p>No units added yet</p>
              <p className="text-sm mt-1">Add units to manage your property rentals</p>
            </div>
          ) : (
            <div className="grid gap-3">
              {units.map((unit) => (
                <Card 
                  key={unit.id} 
                  className="p-3 hover-elevate cursor-pointer"
                  onClick={() => handleEditUnit(unit)}
                  data-testid={`card-unit-${unit.id}`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Home className="w-5 h-5 text-muted-foreground" />
                      <span className="font-semibold" data-testid={`text-unit-number-${unit.id}`}>
                        {unit.unitNumber}
                      </span>
                    </div>
                    <Badge className={getUnitStatusColor(unit.status)} data-testid={`badge-unit-status-${unit.id}`}>
                      {unit.status.charAt(0).toUpperCase() + unit.status.slice(1)}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Bed className="w-4 h-4" />
                      <span>{unit.bedrooms} Bed</span>
                    </div>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Bath className="w-4 h-4" />
                      <span>{unit.bathrooms} Bath</span>
                    </div>
                    <div className="col-span-2">
                      <p className="font-semibold text-primary" data-testid={`text-unit-rent-${unit.id}`}>
                        KES {unit.rent.toLocaleString()}
                        <span className="text-xs font-normal text-muted-foreground"> / month</span>
                      </p>
                    </div>
                    <div className="text-muted-foreground">
                      Floor {unit.floor}
                    </div>
                    {unit.squareFeet && (
                      <div className="text-muted-foreground">
                        {unit.squareFeet} sqft
                      </div>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          )}
        </Card>

        {/* Location Map */}
        <Card className="p-4">
          <h2 className="text-lg font-semibold mb-3">Location</h2>
          <div className="aspect-video rounded-lg overflow-hidden relative bg-[#e5e3df]">
            {/* Map base with zones */}
            <div className="absolute inset-0">
              {/* Green park areas */}
              <div className="absolute top-[10%] left-[5%] w-[25%] h-[30%] bg-[#c8e6c9] rounded-lg opacity-80"></div>
              <div className="absolute bottom-[15%] right-[10%] w-[20%] h-[25%] bg-[#c8e6c9] rounded-lg opacity-80"></div>
              
              {/* Water bodies */}
              <div className="absolute top-[45%] right-[5%] w-[18%] h-[35%] bg-[#b3d9ff] rounded-lg opacity-70"></div>
              
              {/* Main roads - horizontal */}
              <div className="absolute top-[25%] left-0 right-0 h-[3px] bg-[#ffd54f]"></div>
              <div className="absolute top-[25%] left-0 right-0 h-[6px] bg-white mt-[3px]"></div>
              
              <div className="absolute top-[60%] left-0 right-0 h-[3px] bg-[#ffd54f]"></div>
              <div className="absolute top-[60%] left-0 right-0 h-[6px] bg-white mt-[3px]"></div>
              
              {/* Main roads - vertical */}
              <div className="absolute left-[35%] top-0 bottom-0 w-[3px] bg-[#ffd54f]"></div>
              <div className="absolute left-[35%] top-0 bottom-0 w-[6px] bg-white ml-[3px]"></div>
              
              <div className="absolute left-[70%] top-0 bottom-0 w-[3px] bg-[#ffd54f]"></div>
              <div className="absolute left-[70%] top-0 bottom-0 w-[6px] bg-white ml-[3px]"></div>
              
              {/* Smaller streets */}
              <div className="absolute top-[15%] left-0 right-0 h-[2px] bg-white opacity-60"></div>
              <div className="absolute top-[40%] left-0 right-0 h-[2px] bg-white opacity-60"></div>
              <div className="absolute top-[75%] left-0 right-0 h-[2px] bg-white opacity-60"></div>
              
              <div className="absolute left-[15%] top-0 bottom-0 w-[2px] bg-white opacity-60"></div>
              <div className="absolute left-[50%] top-0 bottom-0 w-[2px] bg-white opacity-60"></div>
              <div className="absolute left-[85%] top-0 bottom-0 w-[2px] bg-white opacity-60"></div>
              
              {/* Building blocks */}
              {[
                { top: '8%', left: '8%', w: '12%', h: '10%' },
                { top: '8%', left: '40%', w: '15%', h: '12%' },
                { top: '30%', left: '10%', w: '18%', h: '15%' },
                { top: '30%', left: '52%', w: '12%', h: '10%' },
                { top: '65%', left: '5%', w: '20%', h: '8%' },
                { top: '65%', left: '40%', w: '15%', h: '12%' },
                { top: '45%', left: '75%', w: '18%', h: '10%' },
              ].map((block, i) => (
                <div
                  key={i}
                  className="absolute bg-[#d4d4d4] opacity-70"
                  style={{
                    top: block.top,
                    left: block.left,
                    width: block.w,
                    height: block.h,
                  }}
                ></div>
              ))}
            </div>
            
            {/* Location marker */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative z-10">
                <MapPin className="w-12 h-12 text-red-600 drop-shadow-lg" fill="currentColor" />
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-8 h-2 bg-red-600/30 rounded-full blur-sm"></div>
              </div>
            </div>
            
            {/* Location label */}
            <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-sm p-3 rounded-lg shadow-lg z-10">
              <p className="text-sm font-medium flex items-center gap-2">
                <MapPin className="w-4 h-4 text-red-600" />
                {property.address}, {property.city}
              </p>
            </div>
          </div>
        </Card>

        {/* Gallery */}
        <Card className="p-4">
          <h2 className="text-lg font-semibold mb-3">Gallery</h2>
          <div className="grid grid-cols-3 gap-2">
            {property.images.slice(1).map((image, index) => (
              <div 
                key={index} 
                className="aspect-square rounded-lg overflow-hidden cursor-pointer hover-elevate active-elevate-2"
                onClick={() => handleImageClick(image)}
                data-testid={`image-gallery-${index}`}
              >
                <img
                  src={image}
                  alt={`Gallery ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </Card>

      </div>

      <BottomNav role="landlord" />

      {/* Image Viewer Dialog */}
      <Dialog open={imageViewerOpen} onOpenChange={setImageViewerOpen}>
        <DialogContent className="max-w-4xl w-[95vw] h-[90vh] p-0">
          <DialogDescription className="sr-only">
            Property image viewer
          </DialogDescription>
          <div className="relative w-full h-full flex items-center justify-center bg-black/95">
            {selectedImage && (
              <img
                src={selectedImage}
                alt="Property view"
                className="max-w-full max-h-full object-contain"
                data-testid="image-viewer"
              />
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Add Unit Dialog */}
      <Dialog open={addUnitDialogOpen} onOpenChange={setAddUnitDialogOpen}>
        <DialogContent className="max-w-md mx-4">
          <DialogHeader>
            <DialogTitle>Add New Unit</DialogTitle>
            <DialogDescription>
              Add a new unit to this property
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="unit-number">Unit Number</Label>
                <Input
                  id="unit-number"
                  placeholder="A-101"
                  value={unitForm.unitNumber}
                  onChange={(e) => setUnitForm({ ...unitForm, unitNumber: e.target.value })}
                  data-testid="input-unit-number"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="floor">Floor</Label>
                <Input
                  id="floor"
                  type="number"
                  min="1"
                  placeholder="1"
                  value={unitForm.floor}
                  onChange={(e) => setUnitForm({ ...unitForm, floor: e.target.value })}
                  data-testid="input-floor"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="bedrooms">Bedrooms</Label>
                <Input
                  id="bedrooms"
                  type="number"
                  min="1"
                  placeholder="2"
                  value={unitForm.bedrooms}
                  onChange={(e) => setUnitForm({ ...unitForm, bedrooms: e.target.value })}
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
                  placeholder="2"
                  value={unitForm.bathrooms}
                  onChange={(e) => setUnitForm({ ...unitForm, bathrooms: e.target.value })}
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
                placeholder="85000"
                value={unitForm.rent}
                onChange={(e) => setUnitForm({ ...unitForm, rent: e.target.value })}
                data-testid="input-rent"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="square-feet">Square Feet (Optional)</Label>
              <Input
                id="square-feet"
                type="number"
                min="0"
                placeholder="850"
                value={unitForm.squareFeet}
                onChange={(e) => setUnitForm({ ...unitForm, squareFeet: e.target.value })}
                data-testid="input-square-feet"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select
                value={unitForm.status}
                onValueChange={(value: "available" | "occupied" | "maintenance") => 
                  setUnitForm({ ...unitForm, status: value })
                }
              >
                <SelectTrigger data-testid="select-status">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="available" data-testid="option-available">Available</SelectItem>
                  <SelectItem value="occupied" data-testid="option-occupied">Occupied</SelectItem>
                  <SelectItem value="maintenance" data-testid="option-maintenance">Maintenance</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter className="gap-2">
            <Button 
              variant="outline" 
              onClick={() => setAddUnitDialogOpen(false)}
              data-testid="button-cancel-add"
            >
              Cancel
            </Button>
            <Button 
              onClick={handleSaveUnit}
              data-testid="button-save-unit"
            >
              Add Unit
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Unit Dialog */}
      <Dialog open={editUnitDialogOpen} onOpenChange={setEditUnitDialogOpen}>
        <DialogContent className="max-w-md mx-4">
          <DialogHeader>
            <DialogTitle>Edit Unit</DialogTitle>
            <DialogDescription>
              Update unit details
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-unit-number">Unit Number</Label>
                <Input
                  id="edit-unit-number"
                  placeholder="A-101"
                  value={unitForm.unitNumber}
                  onChange={(e) => setUnitForm({ ...unitForm, unitNumber: e.target.value })}
                  data-testid="input-edit-unit-number"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-floor">Floor</Label>
                <Input
                  id="edit-floor"
                  type="number"
                  min="1"
                  placeholder="1"
                  value={unitForm.floor}
                  onChange={(e) => setUnitForm({ ...unitForm, floor: e.target.value })}
                  data-testid="input-edit-floor"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-bedrooms">Bedrooms</Label>
                <Input
                  id="edit-bedrooms"
                  type="number"
                  min="1"
                  placeholder="2"
                  value={unitForm.bedrooms}
                  onChange={(e) => setUnitForm({ ...unitForm, bedrooms: e.target.value })}
                  data-testid="input-edit-bedrooms"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-bathrooms">Bathrooms</Label>
                <Input
                  id="edit-bathrooms"
                  type="number"
                  min="1"
                  placeholder="2"
                  value={unitForm.bathrooms}
                  onChange={(e) => setUnitForm({ ...unitForm, bathrooms: e.target.value })}
                  data-testid="input-edit-bathrooms"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-rent">Monthly Rent (KES)</Label>
              <Input
                id="edit-rent"
                type="number"
                min="0"
                placeholder="85000"
                value={unitForm.rent}
                onChange={(e) => setUnitForm({ ...unitForm, rent: e.target.value })}
                data-testid="input-edit-rent"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-square-feet">Square Feet (Optional)</Label>
              <Input
                id="edit-square-feet"
                type="number"
                min="0"
                placeholder="850"
                value={unitForm.squareFeet}
                onChange={(e) => setUnitForm({ ...unitForm, squareFeet: e.target.value })}
                data-testid="input-edit-square-feet"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-status">Status</Label>
              <Select
                value={unitForm.status}
                onValueChange={(value: "available" | "occupied" | "maintenance") => 
                  setUnitForm({ ...unitForm, status: value })
                }
              >
                <SelectTrigger data-testid="select-edit-status">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="available" data-testid="option-edit-available">Available</SelectItem>
                  <SelectItem value="occupied" data-testid="option-edit-occupied">Occupied</SelectItem>
                  <SelectItem value="maintenance" data-testid="option-edit-maintenance">Maintenance</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter className="gap-2">
            <Button 
              variant="outline" 
              onClick={() => setEditUnitDialogOpen(false)}
              data-testid="button-cancel-edit"
            >
              Cancel
            </Button>
            <Button 
              onClick={handleUpdateUnit}
              data-testid="button-update-unit"
            >
              Update Unit
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
