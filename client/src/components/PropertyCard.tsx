import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Bed, Bath } from "lucide-react";
import { Link } from "wouter";

interface PropertyCardProps {
  id: string;
  title: string;
  address: string;
  city: string;
  bedrooms: number;
  bathrooms: number;
  rent: number;
  image: string;
  status: "pending" | "awaiting_evaluation" | "approved" | "active" | "rejected";
  onCardClick?: () => void;
}

const statusConfig = {
  pending: { label: "Pending", className: "bg-amber-500 text-white" },
  awaiting_evaluation: { label: "Awaiting Evaluation", className: "bg-blue-500 text-white" },
  approved: { label: "Approved", className: "bg-green-500 text-white" },
  active: { label: "Active", className: "bg-green-600 text-white" },
  rejected: { label: "Rejected", className: "bg-red-500 text-white" },
};

export default function PropertyCard({
  id,
  title,
  address,
  city,
  bedrooms,
  bathrooms,
  rent,
  image,
  status,
  onCardClick,
}: PropertyCardProps) {
  const config = statusConfig[status];
  
  const content = (
    <Card 
      data-testid={`card-property-${id}`}
      className="overflow-hidden hover-elevate active-elevate-2 cursor-pointer"
      onClick={onCardClick}
    >
      <div className="relative aspect-video">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
          data-testid={`img-property-${id}`}
        />
        <Badge className={`absolute top-2 right-2 ${config.className}`}>
          {config.label}
        </Badge>
      </div>
      <div className="p-4 space-y-3">
        <div>
          <h3 className="font-medium text-base mb-1" data-testid={`text-title-${id}`}>{title}</h3>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <MapPin className="w-3.5 h-3.5" />
            <span data-testid={`text-address-${id}`}>{address}, {city}</span>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Bed className="w-4 h-4" />
              <span>{bedrooms}</span>
            </div>
            <div className="flex items-center gap-1">
              <Bath className="w-4 h-4" />
              <span>{bathrooms}</span>
            </div>
          </div>
          <div className="text-lg font-semibold" data-testid={`text-rent-${id}`}>
            KES {rent.toLocaleString()}/mo
          </div>
        </div>
      </div>
    </Card>
  );
  
  return content;
}
