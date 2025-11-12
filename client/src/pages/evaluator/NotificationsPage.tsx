import { useLocation } from "wouter";
import TopBar from "@/components/TopBar";
import BottomNav from "@/components/BottomNav";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bell, CheckCircle, AlertCircle, Info } from "lucide-react";

const mockNotifications = [
  {
    id: "1",
    type: "success",
    title: "Inspection Completed",
    message: "Your inspection for Elegant 2BR Apartment has been successfully submitted.",
    time: "10 minutes ago",
    read: false,
  },
  {
    id: "2",
    type: "warning",
    title: "New Property Assignment",
    message: "Modern Studio Apartment in Kilimani has been assigned for your evaluation.",
    time: "2 hours ago",
    read: false,
  },
  {
    id: "3",
    type: "info",
    title: "Inspection Deadline Reminder",
    message: "Property inspection for Executive 4BR Villa is due in 2 days.",
    time: "5 hours ago",
    read: false,
  },
  {
    id: "4",
    type: "success",
    title: "Property Approved",
    message: "Cozy 1BR Garden Flat has been approved by admin and is now live.",
    time: "1 day ago",
    read: true,
  },
  {
    id: "5",
    type: "info",
    title: "System Update",
    message: "Platform maintenance scheduled for this weekend.",
    time: "2 days ago",
    read: true,
  },
];

const getNotificationIcon = (type: string) => {
  switch (type) {
    case "success":
      return <CheckCircle className="w-5 h-5 text-green-600" />;
    case "warning":
      return <AlertCircle className="w-5 h-5 text-orange-600" />;
    case "info":
      return <Info className="w-5 h-5 text-blue-600" />;
    default:
      return <Bell className="w-5 h-5" />;
  }
};

export default function NotificationsPage() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-background pb-20">
      <TopBar
        title="Notifications"
        role="evaluator"
        notificationCount={0}
        showBackIcon={true}
        onMenuClick={() => setLocation("/evaluator/dashboard")}
        onNotificationClick={() => setLocation("/evaluator/notifications")}
      />

      <div className="p-4 space-y-3">
        {mockNotifications.map((notification) => (
          <Card
            key={notification.id}
            className={`p-4 hover-elevate active-elevate-2 ${
              !notification.read ? "border-l-4 border-l-primary" : ""
            }`}
          >
            <button
              className="w-full text-left"
              onClick={() => console.log("View notification", notification.id)}
              data-testid={`notification-${notification.id}`}
            >
              <div className="flex items-start gap-3">
                <div className="mt-1">{getNotificationIcon(notification.type)}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <p className="font-medium">{notification.title}</p>
                    {!notification.read && (
                      <Badge className="bg-primary text-white text-xs shrink-0">New</Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    {notification.message}
                  </p>
                  <p className="text-xs text-muted-foreground">{notification.time}</p>
                </div>
              </div>
            </button>
          </Card>
        ))}
      </div>

      <BottomNav role="evaluator" />
    </div>
  );
}
