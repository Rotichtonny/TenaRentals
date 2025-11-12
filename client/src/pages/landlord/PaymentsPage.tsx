import { useState, useEffect } from "react";
import { useLocation, useSearch } from "wouter";
import TopBar from "@/components/TopBar";
import BottomNav from "@/components/BottomNav";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, TrendingUp, TrendingDown, DollarSign } from "lucide-react";

const mockPayments = [
  {
    id: "1",
    tenant: "Sarah Kamau",
    property: "Modern 2BR Apartment",
    amount: 85000,
    dueDate: "2024-12-01",
    paidDate: "2024-12-01",
    status: "paid" as const,
    month: "December 2024",
  },
  {
    id: "2",
    tenant: "David Ochieng",
    property: "Cozy 1BR Garden Flat",
    amount: 55000,
    dueDate: "2024-12-01",
    paidDate: "2024-11-29",
    status: "paid" as const,
    month: "December 2024",
  },
  {
    id: "3",
    tenant: "Grace Wanjiru",
    property: "Elegant 2BR Apartment",
    amount: 75000,
    dueDate: "2024-12-01",
    paidDate: null,
    status: "pending" as const,
    month: "December 2024",
  },
  {
    id: "4",
    tenant: "Sarah Kamau",
    property: "Modern 2BR Apartment",
    amount: 85000,
    dueDate: "2024-11-01",
    paidDate: "2024-11-01",
    status: "paid" as const,
    month: "November 2024",
  },
  {
    id: "5",
    tenant: "David Ochieng",
    property: "Cozy 1BR Garden Flat",
    amount: 55000,
    dueDate: "2024-11-01",
    paidDate: "2024-11-05",
    status: "late" as const,
    month: "November 2024",
  },
  {
    id: "6",
    tenant: "Grace Wanjiru",
    property: "Elegant 2BR Apartment",
    amount: 75000,
    dueDate: "2024-11-01",
    paidDate: "2024-11-01",
    status: "paid" as const,
    month: "November 2024",
  },
];

const currentMonthRevenue = mockPayments
  .filter(p => p.month === "December 2024" && p.status === "paid")
  .reduce((sum, p) => sum + p.amount, 0);

const pendingPayments = mockPayments
  .filter(p => p.status === "pending")
  .reduce((sum, p) => sum + p.amount, 0);

const lastMonthRevenue = mockPayments
  .filter(p => p.month === "November 2024" && (p.status === "paid" || p.status === "late"))
  .reduce((sum, p) => sum + p.amount, 0);

export default function LandlordPaymentsPage() {
  const [, setLocation] = useLocation();
  const searchParams = useSearch();
  const params = new URLSearchParams(searchParams);
  const tabFromUrl = params.get("tab") || "all";
  const [activeTab, setActiveTab] = useState(tabFromUrl);

  useEffect(() => {
    const tab = params.get("tab") || "all";
    setActiveTab(tab);
  }, [searchParams]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "paid":
        return <Badge className="bg-green-500 hover:bg-green-600">Paid</Badge>;
      case "pending":
        return <Badge variant="secondary">Pending</Badge>;
      case "late":
        return <Badge className="bg-amber-500 hover:bg-amber-600">Late</Badge>;
      default:
        return null;
    }
  };

  const filteredPayments = activeTab === "all" 
    ? mockPayments 
    : mockPayments.filter(p => p.status === activeTab);

  return (
    <div className="min-h-screen bg-background pb-20">
      <TopBar
        title="Payments"
        role="landlord"
        notificationCount={3}
        useMenuSheet={true}
        onNotificationClick={() => setLocation("/landlord/notifications")}
      />

      <div className="p-4 space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <Card className="p-4" data-testid="card-current-revenue">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">This Month</span>
              <TrendingUp className="w-4 h-4 text-green-500" />
            </div>
            <p className="text-2xl font-bold" data-testid="text-current-revenue">
              KSh {currentMonthRevenue.toLocaleString()}
            </p>
            <p className="text-xs text-muted-foreground mt-1">December 2024</p>
          </Card>

          <Card className="p-4" data-testid="card-pending-payments">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Pending</span>
              <DollarSign className="w-4 h-4 text-amber-500" />
            </div>
            <p className="text-2xl font-bold" data-testid="text-pending-payments">
              KSh {pendingPayments.toLocaleString()}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              {mockPayments.filter(p => p.status === "pending").length} payment(s)
            </p>
          </Card>

          <Card className="p-4" data-testid="card-last-month-revenue">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Last Month</span>
              <TrendingDown className="w-4 h-4 text-muted-foreground" />
            </div>
            <p className="text-2xl font-bold" data-testid="text-last-month-revenue">
              KSh {lastMonthRevenue.toLocaleString()}
            </p>
            <p className="text-xs text-muted-foreground mt-1">November 2024</p>
          </Card>

          <Card className="p-4" data-testid="card-total-paid">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Total Paid</span>
              <Calendar className="w-4 h-4 text-blue-500" />
            </div>
            <p className="text-2xl font-bold" data-testid="text-total-paid">
              {mockPayments.filter(p => p.status === "paid" || p.status === "late").length}
            </p>
            <p className="text-xs text-muted-foreground mt-1">Transactions</p>
          </Card>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-4">Payment History</h2>
          
          <Tabs value={activeTab} onValueChange={(tab) => {
            setActiveTab(tab);
            setLocation(`/landlord/payments?tab=${tab}`);
          }}>
            <TabsList className="grid w-full grid-cols-4 mb-6">
              <TabsTrigger value="all" data-testid="tab-all">
                All
              </TabsTrigger>
              <TabsTrigger value="paid" data-testid="tab-paid">
                Paid
              </TabsTrigger>
              <TabsTrigger value="pending" data-testid="tab-pending">
                Pending
              </TabsTrigger>
              <TabsTrigger value="late" data-testid="tab-late">
                Late
              </TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab} className="space-y-3">
              {filteredPayments.map((payment) => (
                <Card
                  key={payment.id}
                  className="p-4 hover-elevate active-elevate-2 cursor-pointer"
                  onClick={() => console.log("View payment details", payment.id)}
                  data-testid={`card-payment-${payment.id}`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-base mb-1" data-testid={`text-tenant-${payment.id}`}>
                        {payment.tenant}
                      </h3>
                      <p className="text-sm text-muted-foreground truncate">
                        {payment.property}
                      </p>
                    </div>
                    {getStatusBadge(payment.status)}
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <div>
                      <span className="text-muted-foreground">Amount: </span>
                      <span className="font-semibold">KSh {payment.amount.toLocaleString()}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">
                        {payment.status === "paid" || payment.status === "late" ? "Paid: " : "Due: "}
                      </span>
                      <span>
                        {payment.paidDate 
                          ? new Date(payment.paidDate).toLocaleDateString()
                          : new Date(payment.dueDate).toLocaleDateString()
                        }
                      </span>
                    </div>
                  </div>

                  {payment.status === "late" && (
                    <p className="text-xs text-amber-600 mt-2">
                      Due: {new Date(payment.dueDate).toLocaleDateString()}
                    </p>
                  )}
                </Card>
              ))}
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <BottomNav role="landlord" />
    </div>
  );
}
