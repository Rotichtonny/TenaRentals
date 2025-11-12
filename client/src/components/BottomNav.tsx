import { Link, useLocation } from "wouter";
import { Home, Search, Calendar, Settings, FileText, Users, ClipboardCheck, DollarSign } from "lucide-react";

interface NavItem {
  path: string;
  icon: typeof Home;
  label: string;
}

interface BottomNavProps {
  role: "admin" | "landlord" | "evaluator" | "tenant";
}

const navItems: Record<string, NavItem[]> = {
  admin: [
    { path: "/admin/dashboard", icon: Home, label: "Dashboard" },
    { path: "/admin/users", icon: Users, label: "Users" },
    { path: "/admin/properties", icon: FileText, label: "Properties" },
    { path: "/admin/settings", icon: Settings, label: "Settings" },
  ],
  landlord: [
    { path: "/landlord/dashboard", icon: Home, label: "Dashboard" },
    { path: "/landlord/properties", icon: FileText, label: "Properties" },
    { path: "/landlord/bookings", icon: Calendar, label: "Bookings" },
    { path: "/landlord/tenants", icon: Users, label: "Tenants" },
    { path: "/landlord/payments", icon: DollarSign, label: "Payments" },
  ],
  evaluator: [
    { path: "/evaluator/dashboard", icon: Home, label: "Dashboard" },
    { path: "/evaluator/properties", icon: ClipboardCheck, label: "Assignments" },
    { path: "/evaluator/settings", icon: Settings, label: "Settings" },
  ],
  tenant: [
    { path: "/tenant/search", icon: Search, label: "Search" },
    { path: "/tenant/bookings", icon: Calendar, label: "Bookings" },
    { path: "/tenant/rentals", icon: Home, label: "My Rentals" },
    { path: "/tenant/settings", icon: Settings, label: "Settings" },
  ],
};

export default function BottomNav({ role }: BottomNavProps) {
  const [location] = useLocation();
  const items = navItems[role] || navItems.tenant;

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-card-border z-50">
      <div className="flex items-center justify-around h-16">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = location === item.path;
          
          return (
            <Link key={item.path} href={item.path}>
              <button
                data-testid={`nav-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
                className={`flex flex-col items-center justify-center gap-1 px-4 py-2 transition-colors ${
                  isActive 
                    ? "text-primary" 
                    : "text-muted-foreground hover-elevate"
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? "stroke-[2.5]" : "stroke-2"}`} />
                <span className={`text-xs ${isActive ? "font-medium" : "font-normal"}`}>
                  {item.label}
                </span>
              </button>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
