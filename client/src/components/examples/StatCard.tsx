import StatCard from "../StatCard";
import { Home } from "lucide-react";

export default function StatCardExample() {
  return (
    <div className="p-4">
      <StatCard
        title="Total Properties"
        value={234}
        icon={Home}
        trend={{ value: "12% from last month", positive: true }}
      />
    </div>
  );
}
