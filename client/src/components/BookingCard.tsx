import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, User } from "lucide-react";
import { format } from "date-fns";

interface BookingCardProps {
  id: string;
  propertyTitle: string;
  propertyAddress: string;
  viewingDate: Date;
  tenantName?: string;
  landlordName?: string;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  showActions?: boolean;
  onConvertToTenant?: () => void;
  onCancel?: () => void;
}

const statusConfig = {
  pending: { label: "Pending", className: "bg-amber-500 text-white" },
  confirmed: { label: "Confirmed", className: "bg-blue-500 text-white" },
  completed: { label: "Completed", className: "bg-green-500 text-white" },
  cancelled: { label: "Cancelled", className: "bg-gray-500 text-white" },
};

export default function BookingCard({
  id,
  propertyTitle,
  propertyAddress,
  viewingDate,
  tenantName,
  landlordName,
  status,
  showActions = false,
  onConvertToTenant,
  onCancel,
}: BookingCardProps) {
  const config = statusConfig[status];
  
  return (
    <Card className="p-4" data-testid={`card-booking-${id}`}>
      <div className="space-y-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1">
            <h3 className="font-medium text-base mb-1" data-testid={`text-property-${id}`}>{propertyTitle}</h3>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <MapPin className="w-3.5 h-3.5" />
              <span>{propertyAddress}</span>
            </div>
          </div>
          <Badge className={config.className}>{config.label}</Badge>
        </div>
        
        <div className="flex items-center gap-1 text-sm">
          <Calendar className="w-4 h-4 text-muted-foreground" />
          <span data-testid={`text-date-${id}`}>{format(viewingDate, "PPP 'at' p")}</span>
        </div>
        
        {(tenantName || landlordName) && (
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <User className="w-4 h-4" />
            <span>{tenantName || landlordName}</span>
          </div>
        )}
        
        {showActions && status === "completed" && (
          <div className="flex gap-2 pt-2">
            <Button 
              size="sm" 
              className="flex-1"
              onClick={onConvertToTenant}
              data-testid={`button-convert-${id}`}
            >
              Convert to Tenant
            </Button>
            <Button 
              size="sm" 
              variant="outline" 
              onClick={onCancel}
              data-testid={`button-cancel-${id}`}
            >
              Cancel
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
}
