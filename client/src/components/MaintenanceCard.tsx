import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, AlertCircle } from "lucide-react";
import { format } from "date-fns";

interface MaintenanceCardProps {
  id: string;
  title: string;
  description: string;
  propertyTitle: string;
  propertyAddress: string;
  status: "pending" | "in_progress" | "completed";
  priority: "low" | "medium" | "high";
  createdAt: Date;
  onClick?: () => void;
}

const statusConfig = {
  pending: { label: "Pending", className: "bg-amber-500 text-white" },
  in_progress: { label: "In Progress", className: "bg-blue-500 text-white" },
  completed: { label: "Completed", className: "bg-green-500 text-white" },
};

const priorityConfig = {
  low: { label: "Low", className: "bg-gray-500 text-white" },
  medium: { label: "Medium", className: "bg-orange-500 text-white" },
  high: { label: "High", className: "bg-red-500 text-white" },
};

export default function MaintenanceCard({
  id,
  title,
  description,
  propertyTitle,
  propertyAddress,
  status,
  priority,
  createdAt,
  onClick,
}: MaintenanceCardProps) {
  const statusCfg = statusConfig[status];
  const priorityCfg = priorityConfig[priority];
  
  return (
    <Card 
      className="p-4 hover-elevate active-elevate-2 cursor-pointer" 
      onClick={onClick}
      data-testid={`card-maintenance-${id}`}
    >
      <div className="space-y-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1">
            <h3 className="font-medium text-base mb-1" data-testid={`text-title-${id}`}>{title}</h3>
            <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>
          </div>
          <div className="flex flex-col gap-1">
            <Badge className={statusCfg.className}>{statusCfg.label}</Badge>
            <Badge className={priorityCfg.className} variant="outline">
              <AlertCircle className="w-3 h-3 mr-1" />
              {priorityCfg.label}
            </Badge>
          </div>
        </div>
        
        <div className="space-y-1">
          <div className="flex items-center gap-1 text-sm font-medium">
            <MapPin className="w-3.5 h-3.5" />
            <span>{propertyTitle}</span>
          </div>
          <p className="text-xs text-muted-foreground pl-5">{propertyAddress}</p>
        </div>
        
        <p className="text-xs text-muted-foreground" data-testid={`text-date-${id}`}>
          Submitted {format(createdAt, "PPP")}
        </p>
      </div>
    </Card>
  );
}
