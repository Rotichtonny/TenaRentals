import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Home } from "lucide-react";

export default function LoginPage() {
  const [, setLocation] = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (email.includes("admin")) {
      setLocation("/admin/dashboard");
    } else if (email.includes("landlord")) {
      setLocation("/landlord/dashboard");
    } else if (email.includes("evaluator")) {
      setLocation("/evaluator/dashboard");
    } else {
      setLocation("/tenant/search");
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-12 h-12 rounded-lg bg-primary flex items-center justify-center">
              <Home className="w-7 h-7 text-primary-foreground" />
            </div>
            <h1 className="text-3xl font-bold">RentNairobi</h1>
          </div>
          <p className="text-muted-foreground">
            Verified property rentals in Nairobi
          </p>
        </div>

        <Card className="p-6">
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                data-testid="input-email"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                data-testid="input-password"
              />
            </div>
            <Button type="submit" className="w-full" data-testid="button-login">
              Sign In
            </Button>
          </form>
        </Card>

        <div className="text-center">
          <p className="text-sm text-muted-foreground mb-2">
            Demo accounts (use any password):
          </p>
          <div className="space-y-1 text-xs text-muted-foreground">
            <p>admin@rentnairobi.com • landlord@rentnairobi.com</p>
            <p>evaluator@rentnairobi.com • tenant@rentnairobi.com</p>
          </div>
        </div>

        <div className="text-center">
          <button
            onClick={() => setLocation("/register")}
            data-testid="link-register"
            className="text-sm text-primary hover-elevate px-4 py-2 rounded-md"
          >
            Don't have an account? Register
          </button>
        </div>
      </div>
    </div>
  );
}
