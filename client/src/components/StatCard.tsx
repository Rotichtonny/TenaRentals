import { Card } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: string;
    positive: boolean;
  };
  accentColor?: string;
  onClick?: () => void;
}

export default function StatCard({ title, value, icon: Icon, trend, accentColor = "text-primary", onClick }: StatCardProps) {
  const CardComponent = onClick ? "button" : "div";
  const cardClasses = onClick ? "hover-elevate active-elevate-2 text-left w-full" : "";

  return (
    <Card className={`p-4 ${cardClasses}`} onClick={onClick}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm text-muted-foreground mb-1" data-testid="text-stat-title">{title}</p>
          <p className="text-2xl font-semibold" data-testid="text-stat-value">{value}</p>
          {trend && (
            <p className={`text-xs mt-2 ${trend.positive ? "text-green-600" : "text-red-600"}`}>
              {trend.positive ? "↑" : "↓"} {trend.value}
            </p>
          )}
        </div>
        <div className={`p-2 rounded-lg bg-muted ${accentColor}`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>
    </Card>
  );
}
