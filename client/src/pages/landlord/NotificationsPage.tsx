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
    title: "Booking Confirmed",
    message: "New booking request for Modern 2BR Apartment has been confirmed.",
    time: "15 minutes ago",
    read: false,
  },
  {
    id: "2",
    type: "warning",
    title: "Payment Reminder",
    message: "Tenant at Riverside Apartment has a pending payment due in 3 days.",
    time: "1 hour ago",
    read: false,
  },
  {
    id: "3",
    type: "info",
    title: "Property Evaluation Complete",
    message: "Your property at Kilimani has been evaluated and approved.",
    time: "3 hours ago",
    read: false,
  },
  {
    id: "4",
    type: "success",
    title: "New Tenant Registered",
    message: "Jane Mwangi has signed the rental agreement for Unit B2.",
    time: "1 day ago",
    read: true,
  },
  {
    id: "5",
    type: "warning",
    title: "Maintenance Request",
    message: "Tenant at Westlands Apartment submitted a maintenance request.",
    time: "2 days ago",
    read: true,
  },
  {
    id: "6",
    type: "info",
    title: "Monthly Revenue Report",
    message: "Your monthly revenue report for November is now available.",
    time: "3 days ago",
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
        role="landlord"
        notificationCount={0}
        showBackIcon={true}
        onMenuClick={() => setLocation("/landlord/dashboard")}
        onNotificationClick={() => setLocation("/landlord/notifications")}
      />

      <div className="p-4 space-y-3">
        {mockNotifications.map((notification) => (
          <Card
            key={notification.id}
            className={`p-4 hover-elevate active-elevate-2 ${
              !notification.read ? "bg-muted" : ""
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

      <BottomNav role="landlord" />
    </div>
  );
}
