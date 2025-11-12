import { useState } from "react";
import { useLocation } from "wouter";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu, Settings, LogOut, User, Bell, Shield, HelpCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface MenuSheetProps {
  role: "admin" | "landlord" | "evaluator" | "tenant";
}

export default function MenuSheet({ role }: MenuSheetProps) {
  const [open, setOpen] = useState(false);
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const handleLogout = () => {
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
    setTimeout(() => {
      setLocation("/login");
    }, 1000);
  };

  const menuItems = [
    {
      icon: Settings,
      label: "Settings",
      onClick: () => {
        setOpen(false);
        setLocation(`/${role}/settings`);
      },
    },
    {
      icon: User,
      label: "Profile",
      onClick: () => {
        setOpen(false);
        toast({
          title: "Profile",
          description: "Profile page coming soon",
        });
      },
    },
    {
      icon: Bell,
      label: "Notifications",
      onClick: () => {
        setOpen(false);
        toast({
          title: "Notifications",
          description: "Notifications page coming soon",
        });
      },
    },
    {
      icon: HelpCircle,
      label: "Help & Support",
      onClick: () => {
        setOpen(false);
        toast({
          title: "Help & Support",
          description: "Help page coming soon",
        });
      },
    },
  ];

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button 
          size="icon" 
          variant="ghost"
          data-testid="button-menu"
        >
          <Menu className="w-5 h-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-72">
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>
        
        <div className="mt-6 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Button
                key={item.label}
                variant="ghost"
                className="w-full justify-start"
                onClick={item.onClick}
                data-testid={`menu-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
              >
                <Icon className="w-5 h-5 mr-3" />
                {item.label}
              </Button>
            );
          })}
          
          <div className="pt-4 border-t">
            <Button
              variant="ghost"
              className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10"
              onClick={handleLogout}
              data-testid="menu-logout"
            >
              <LogOut className="w-5 h-5 mr-3" />
              Logout
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
