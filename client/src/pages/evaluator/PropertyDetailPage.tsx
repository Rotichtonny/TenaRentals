import { useState } from "react";
import { useRoute, useLocation, useSearch } from "wouter";
import TopBar from "@/components/TopBar";
import BottomNav from "@/components/BottomNav";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { MapPin, Bed, Bath, Calendar, User, Phone, Mail, CheckCircle, FileCheck } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

export default function EvaluatorPropertyDetailPage() {
  const [, params] = useRoute("/evaluator/properties/:id");
  const [, setLocation] = useLocation();
  const searchString = useSearch();
  const { toast } = useToast();
  
  // Get the navigation context from URL query params
  const queryParams = new URLSearchParams(searchString);
  const fromTab = queryParams.get("fromTab") || "pending";
  const fromPage = queryParams.get("from"); // "dashboard" or null
  const [inspectionDialogOpen, setInspectionDialogOpen] = useState(false);
  const [imageViewerOpen, setImageViewerOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleImageClick = (image: string) => {
    setSelectedImage(image);
    setImageViewerOpen(true);
  };

  // Mock property data - in real app, this would be fetched based on params.id
  const propertyId = params?.id || "2";
  
  // Determine status based on property ID for demo purposes
  const getPropertyByStatus = () => {
    if (propertyId === "2" || propertyId === "6" || propertyId === "8") {
      // In progress properties
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
    } else if (propertyId === "7") {
      // Rejected properties
      return {
        status: "rejected" as const,
        evaluation: {
          evaluatorName: "Sarah Wanjiku",
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
          evaluatorName: "Sarah Wanjiku",
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
    title: "Modern Studio Apartment",
    address: "Kilimani Road, Kilimani",
    city: "Nairobi",
    bedrooms: 1,
    bathrooms: 1,
    rent: 45000,
    description: "A beautifully designed modern studio apartment in the heart of Kilimani. Features an open-plan layout with contemporary finishes, ample natural light, and access to building amenities including parking and 24/7 security.",
    images: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&auto=format&fit=crop",
    ],
    amenities: ["Parking", "24/7 Security", "High-speed Internet", "Modern Kitchen", "Gym Access"],
    ...propertyStatus,
    submittedDate: "January 8, 2025",
    landlord: {
      name: "John Kamau",
      email: "john.kamau@email.com",
      phone: "+254 722 345 678",
    },
  };

  const handleStartInspection = () => {
    toast({
      title: "Inspection Started",
      description: "You can now begin the property inspection process.",
    });
    setInspectionDialogOpen(false);
    setTimeout(() => {
      if (fromPage === "dashboard") {
        setLocation("/evaluator/dashboard");
      } else {
        setLocation(`/evaluator/properties?tab=${fromTab}`);
      }
    }, 1500);
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

  return (
    <div className="min-h-screen bg-background pb-20">
      <TopBar
        title="Property Details"
        role="evaluator"
        notificationCount={3}
        showBackIcon={true}
        onMenuClick={() => {
          if (fromPage === "dashboard") {
            setLocation("/evaluator/dashboard");
          } else {
            setLocation(`/evaluator/properties?tab=${fromTab}`);
          }
        }}
        onNotificationClick={() => setLocation("/evaluator/notifications")}
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

        {/* Start Inspection Button */}
        {property.status === "awaiting_evaluation" && (
          <Button
            className="w-full"
            size="lg"
            onClick={() => setInspectionDialogOpen(true)}
            data-testid="button-start-inspection"
          >
            <FileCheck className="w-5 h-5 mr-2" />
            Start Inspection
          </Button>
        )}
      </div>

      <BottomNav role="evaluator" />

      {/* Start Inspection Confirmation Dialog */}
      <Dialog open={inspectionDialogOpen} onOpenChange={setInspectionDialogOpen}>
        <DialogContent className="max-w-md mx-4">
          <DialogHeader>
            <DialogTitle>Start Property Inspection</DialogTitle>
            <DialogDescription>
              Are you ready to begin the inspection for this property?
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p className="text-sm text-muted-foreground">
              You'll be able to evaluate the property and submit your findings.
            </p>
          </div>
          <DialogFooter className="gap-2">
            <Button
              variant="outline"
              onClick={() => setInspectionDialogOpen(false)}
              data-testid="button-cancel-inspection"
            >
              Cancel
            </Button>
            <Button
              onClick={handleStartInspection}
              data-testid="button-confirm-inspection"
            >
              Start Inspection
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

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
    </div>
  );
}
