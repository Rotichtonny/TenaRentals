import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Mail, Phone } from "lucide-react";

interface UserCardProps {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  role: "admin" | "evaluator" | "landlord" | "tenant";
  avatar?: string;
  onClick?: () => void;
}

const roleColors = {
  admin: "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300",
  evaluator: "bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300",
  landlord: "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300",
  tenant: "bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300",
};

export default function UserCard({ 
  id, 
  fullName, 
  email, 
  phone, 
  role, 
  avatar,
  onClick 
}: UserCardProps) {
  const initials = fullName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
  
  return (
    <Card 
      className="p-4 hover-elevate active-elevate-2 cursor-pointer" 
      onClick={onClick}
      data-testid={`card-user-${id}`}
    >
      <div className="flex items-center gap-3">
        <Avatar className="w-12 h-12">
          <AvatarImage src={avatar} alt={fullName} />
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-medium text-base truncate" data-testid={`text-name-${id}`}>{fullName}</h3>
            <Badge className={`text-xs ${roleColors[role]}`}>
              {role.charAt(0).toUpperCase() + role.slice(1)}
            </Badge>
          </div>
          
          <div className="space-y-0.5">
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Mail className="w-3.5 h-3.5 flex-shrink-0" />
              <span className="truncate">{email}</span>
            </div>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Phone className="w-3.5 h-3.5 flex-shrink-0" />
              <span>{phone}</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
