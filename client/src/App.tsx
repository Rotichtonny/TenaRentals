import { Switch, Route, Redirect } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";

import LoginPage from "@/pages/LoginPage";
import RegisterPage from "@/pages/RegisterPage";

import TenantSearchPage from "@/pages/tenant/SearchPage";
import TenantBookingsPage from "@/pages/tenant/BookingsPage";
import TenantRentalsPage from "@/pages/tenant/RentalsPage";
import PropertyDetailPage from "@/pages/tenant/PropertyDetailPage";
import TenantSettingsPage from "@/pages/tenant/SettingsPage";

import LandlordDashboardPage from "@/pages/landlord/DashboardPage";
import LandlordBookingsPage from "@/pages/landlord/BookingsPage";
import LandlordPropertiesPage from "@/pages/landlord/PropertiesPage";
import LandlordPropertyDetailPage from "@/pages/landlord/PropertyDetailPage";
import EditPropertyPage from "@/pages/landlord/EditPropertyPage";
import LandlordTenantsPage from "@/pages/landlord/TenantsPage";
import LandlordPaymentsPage from "@/pages/landlord/PaymentsPage";
import LandlordSettingsPage from "@/pages/landlord/SettingsPage";
import LandlordNotificationsPage from "@/pages/landlord/NotificationsPage";

import AdminDashboardPage from "@/pages/admin/DashboardPage";
import AdminUsersPage from "@/pages/admin/UsersPage";
import AdminPropertiesPage from "@/pages/admin/PropertiesPage";
import AdminPropertyDetailPage from "@/pages/admin/PropertyDetailPage";
import AdminSettingsPage from "@/pages/admin/SettingsPage";
import AdminNotificationsPage from "@/pages/admin/NotificationsPage";

import EvaluatorDashboardPage from "@/pages/evaluator/DashboardPage";
import EvaluatorPropertiesPage from "@/pages/evaluator/PropertiesPage";
import EvaluatorPropertyDetailPage from "@/pages/evaluator/PropertyDetailPage";
import EvaluatorSettingsPage from "@/pages/evaluator/SettingsPage";
import EvaluatorNotificationsPage from "@/pages/evaluator/NotificationsPage";

function Router() {
  return (
    <Switch>
      <Route path="/" component={() => <Redirect to="/login" />} />
      <Route path="/login" component={LoginPage} />
      <Route path="/register" component={RegisterPage} />
      
      <Route path="/tenant/search" component={TenantSearchPage} />
      <Route path="/tenant/bookings" component={TenantBookingsPage} />
      <Route path="/tenant/rentals" component={TenantRentalsPage} />
      <Route path="/tenant/property/:id" component={PropertyDetailPage} />
      <Route path="/tenant/settings" component={TenantSettingsPage} />
      
      <Route path="/landlord/dashboard" component={LandlordDashboardPage} />
      <Route path="/landlord/properties" component={LandlordPropertiesPage} />
      <Route path="/landlord/properties/:id/edit" component={EditPropertyPage} />
      <Route path="/landlord/properties/:id" component={LandlordPropertyDetailPage} />
      <Route path="/landlord/bookings" component={LandlordBookingsPage} />
      <Route path="/landlord/tenants" component={LandlordTenantsPage} />
      <Route path="/landlord/payments" component={LandlordPaymentsPage} />
      <Route path="/landlord/settings" component={LandlordSettingsPage} />
      <Route path="/landlord/notifications" component={LandlordNotificationsPage} />
      
      <Route path="/admin/dashboard" component={AdminDashboardPage} />
      <Route path="/admin/users" component={AdminUsersPage} />
      <Route path="/admin/properties" component={AdminPropertiesPage} />
      <Route path="/admin/properties/:id" component={AdminPropertyDetailPage} />
      <Route path="/admin/settings" component={AdminSettingsPage} />
      <Route path="/admin/notifications" component={AdminNotificationsPage} />
      
      <Route path="/evaluator/dashboard" component={EvaluatorDashboardPage} />
      <Route path="/evaluator/properties" component={EvaluatorPropertiesPage} />
      <Route path="/evaluator/properties/:id" component={EvaluatorPropertyDetailPage} />
      <Route path="/evaluator/settings" component={EvaluatorSettingsPage} />
      <Route path="/evaluator/notifications" component={EvaluatorNotificationsPage} />
      
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
