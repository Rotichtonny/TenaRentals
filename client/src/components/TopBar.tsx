import { Bell, Menu, LogOut, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import MenuSheet from "@/components/MenuSheet";

interface TopBarProps {
  title: string;
  role: "admin" | "landlord" | "evaluator" | "tenant";
  notificationCount?: number;
  onMenuClick?: () => void;
  onNotificationClick?: () => void;
  showLogout?: boolean;
  showBackIcon?: boolean;
  useMenuSheet?: boolean;
  actionIcon?: React.ReactNode;
  onActionClick?: () => void;
}

const roleColors = {
  admin: "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300",
  landlord: "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300",
  evaluator: "bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300",
  tenant: "bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300",
};

export default function TopBar({ 
  title, 
  role, 
  notificationCount = 0, 
  onMenuClick,
  onNotificationClick,
  showLogout = false,
  showBackIcon = false,
  useMenuSheet = false,
  actionIcon,
  onActionClick
}: TopBarProps) {
  return (
    <div className="sticky top-0 z-40 bg-card border-b border-card-border">
      <div className="flex items-center justify-between px-4 h-14">
        <div className="flex items-center gap-3">
          {showLogout ? (
            <Button 
              size="icon" 
              variant="ghost" 
              onClick={onMenuClick}
              data-testid="button-logout"
            >
              <LogOut className="w-5 h-5" />
            </Button>
          ) : showBackIcon ? (
            <Button 
              size="icon" 
              variant="ghost" 
              onClick={onMenuClick}
              data-testid="button-back"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
          ) : useMenuSheet ? (
            <MenuSheet role={role} />
          ) : (
            <Button 
              size="icon" 
              variant="ghost" 
              onClick={onMenuClick}
              data-testid="button-menu"
            >
              <Menu className="w-5 h-5" />
            </Button>
          )}
          <div>
            <h1 className="text-lg font-semibold" data-testid="text-title">{title}</h1>
            <Badge className={`text-xs ${roleColors[role]}`}>
              {role.charAt(0).toUpperCase() + role.slice(1)}
            </Badge>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          {actionIcon && onActionClick && (
            <Button 
              size="icon" 
              variant="ghost" 
              onClick={onActionClick}
              data-testid="button-action"
            >
              {actionIcon}
            </Button>
          )}
          <div className="relative">
            <Button 
              size="icon" 
              variant="ghost" 
              onClick={onNotificationClick}
              data-testid="button-notifications"
            >
              <Bell className="w-5 h-5" />
            </Button>
            {notificationCount > 0 && (
              <Badge 
                className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center p-0 bg-destructive text-white text-xs"
                data-testid="badge-notification-count"
              >
                {notificationCount > 9 ? "9+" : notificationCount}
              </Badge>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
