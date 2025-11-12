import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Calendar, FileText } from "lucide-react";
import { format } from "date-fns";

interface AgreementCardProps {
  id: string;
  propertyTitle: string;
  propertyAddress: string;
  landlordName?: string;
  tenantName?: string;
  rent: number;
  deposit: number;
  startDate: Date;
  endDate: Date;
  status: "pending" | "signed" | "active" | "expired";
  signed: boolean;
  onSign?: () => void;
  onView?: () => void;
}

const statusConfig = {
  pending: { label: "Pending Signature", className: "bg-amber-500 text-white" },
  signed: { label: "Signed", className: "bg-blue-500 text-white" },
  active: { label: "Active", className: "bg-green-500 text-white" },
  expired: { label: "Expired", className: "bg-gray-500 text-white" },
};

export default function AgreementCard({
  id,
  propertyTitle,
  propertyAddress,
  landlordName,
  tenantName,
  rent,
  deposit,
  startDate,
  endDate,
  status,
  signed,
  onSign,
  onView,
}: AgreementCardProps) {
  const config = statusConfig[status];
  
  return (
    <Card className="p-4" data-testid={`card-agreement-${id}`}>
      <div className="space-y-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1">
            <h3 className="font-medium text-base mb-1">{propertyTitle}</h3>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <MapPin className="w-3.5 h-3.5" />
              <span>{propertyAddress}</span>
            </div>
          </div>
          <Badge className={config.className}>{config.label}</Badge>
        </div>
        
        {(landlordName || tenantName) && (
          <div className="text-sm">
            <span className="text-muted-foreground">With: </span>
            <span className="font-medium">{landlordName || tenantName}</span>
          </div>
        )}
        
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div>
            <p className="text-muted-foreground mb-0.5">Monthly Rent</p>
            <p className="font-semibold" data-testid={`text-rent-${id}`}>KES {rent.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-muted-foreground mb-0.5">Deposit</p>
            <p className="font-semibold" data-testid={`text-deposit-${id}`}>KES {deposit.toLocaleString()}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <Calendar className="w-4 h-4" />
          <span data-testid={`text-dates-${id}`}>
            {format(startDate, "MMM d, yyyy")} - {format(endDate, "MMM d, yyyy")}
          </span>
        </div>
        
        <div className="flex gap-2 pt-2">
          <Button 
            size="sm" 
            variant="outline" 
            className="flex-1"
            onClick={onView}
            data-testid={`button-view-${id}`}
          >
            <FileText className="w-4 h-4 mr-1" />
            View Agreement
          </Button>
          {!signed && onSign && (
            <Button 
              size="sm" 
              className="flex-1"
              onClick={onSign}
              data-testid={`button-sign-${id}`}
            >
              Sign Agreement
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
}
