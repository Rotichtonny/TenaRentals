import EmptyState from "../EmptyState";
import { Home } from "lucide-react";

export default function EmptyStateExample() {
  return (
    <EmptyState
      icon={Home}
      title="No properties found"
      description="You haven't added any properties yet. Get started by adding your first property."
      actionLabel="Add Property"
      onAction={() => console.log("Add property clicked")}
    />
  );
}
