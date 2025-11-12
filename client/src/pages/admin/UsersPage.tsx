import { useState } from "react";
import { useLocation } from "wouter";
import TopBar from "@/components/TopBar";
import BottomNav from "@/components/BottomNav";
import UserCard from "@/components/UserCard";
import SearchBar from "@/components/SearchBar";
import { Button } from "@/components/ui/button";
import { Plus, Home, Users, FileText, Settings, LogOut } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const initialUsers = [
  {
    id: "1",
    fullName: "John Kamau",
    email: "john.kamau@email.com",
    phone: "+254 712 345 678",
    role: "evaluator" as "admin" | "evaluator" | "landlord" | "tenant",
  },
  {
    id: "2",
    fullName: "Sarah Wanjiru",
    email: "sarah.w@email.com",
    phone: "+254 723 456 789",
    role: "admin" as "admin" | "evaluator" | "landlord" | "tenant",
  },
  {
    id: "3",
    fullName: "David Mwangi",
    email: "david.m@email.com",
    phone: "+254 734 567 890",
    role: "evaluator" as "admin" | "evaluator" | "landlord" | "tenant",
  },
  {
    id: "4",
    fullName: "Grace Akinyi",
    email: "grace.akinyi@email.com",
    phone: "+254 745 678 901",
    role: "tenant" as "admin" | "evaluator" | "landlord" | "tenant",
  },
  {
    id: "5",
    fullName: "Peter Otieno",
    email: "peter.otieno@email.com",
    phone: "+254 756 789 012",
    role: "tenant" as "admin" | "evaluator" | "landlord" | "tenant",
  },
  {
    id: "6",
    fullName: "Mary Njeri",
    email: "mary.njeri@email.com",
    phone: "+254 767 890 123",
    role: "tenant" as "admin" | "evaluator" | "landlord" | "tenant",
  },
  {
    id: "7",
    fullName: "James Omondi",
    email: "james.omondi@email.com",
    phone: "+254 778 901 234",
    role: "tenant" as "admin" | "evaluator" | "landlord" | "tenant",
  },
  {
    id: "8",
    fullName: "Lucy Muthoni",
    email: "lucy.muthoni@email.com",
    phone: "+254 789 012 345",
    role: "tenant" as "admin" | "evaluator" | "landlord" | "tenant",
  },
  {
    id: "9",
    fullName: "Daniel Kipchoge",
    email: "daniel.kipchoge@email.com",
    phone: "+254 790 123 456",
    role: "landlord" as "admin" | "evaluator" | "landlord" | "tenant",
  },
  {
    id: "10",
    fullName: "Anne Wambui",
    email: "anne.wambui@email.com",
    phone: "+254 701 234 567",
    role: "tenant" as "admin" | "evaluator" | "landlord" | "tenant",
  },
];

export default function UsersPage() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [users, setUsers] = useState(initialUsers);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [addUserDialogOpen, setAddUserDialogOpen] = useState(false);
  const [editRoleDialogOpen, setEditRoleDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<typeof initialUsers[0] | null>(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState<string>("");

  const handleAddUser = () => {
    toast({
      title: "User Added",
      description: `Invitation sent to ${email}`,
    });
    setAddUserDialogOpen(false);
    setFullName("");
    setEmail("");
    setPhone("");
    setRole("");
  };

  const handleEditRole = (user: typeof initialUsers[0]) => {
    setSelectedUser(user);
    setRole(user.role);
    setEditRoleDialogOpen(true);
  };

  const handleUpdateRole = () => {
    if (selectedUser && role) {
      // Update the user's role in state
      setUsers(prevUsers => 
        prevUsers.map(u => 
          u.id === selectedUser.id 
            ? { ...u, role: role as "admin" | "evaluator" | "landlord" | "tenant" }
            : u
        )
      );
      
      toast({
        title: "Role Updated",
        description: `${selectedUser.fullName}'s role has been changed to ${role}.`,
      });
      setEditRoleDialogOpen(false);
      setSelectedUser(null);
      setRole("");
    }
  };

  const handleLogout = () => {
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
    setTimeout(() => {
      setLocation("/login");
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <TopBar
        title="User Management"
        role="admin"
        notificationCount={5}
        onMenuClick={() => setMenuOpen(true)}
        onNotificationClick={() => setLocation("/admin/notifications")}
      />
      
      <div className="p-4 space-y-4">
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search users..."
        />
        
        <div className="space-y-4">
          {users.map((user) => (
            <UserCard
              key={user.id}
              {...user}
              onClick={() => handleEditRole(user)}
            />
          ))}
        </div>
      </div>
      
      <Button
        size="icon"
        className="fixed bottom-20 right-4 w-14 h-14 rounded-full shadow-lg z-40"
        onClick={() => setAddUserDialogOpen(true)}
        data-testid="button-add-user"
      >
        <Plus className="w-6 h-6" />
      </Button>
      
      <Dialog open={addUserDialogOpen} onOpenChange={setAddUserDialogOpen}>
        <DialogContent className="max-w-md mx-4">
          <DialogHeader>
            <DialogTitle>Add New User</DialogTitle>
            <DialogDescription>
              Create a new user account with a specific role
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="John Kamau"
                data-testid="input-fullname"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="john@email.com"
                data-testid="input-email"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+254 712 345 678"
                data-testid="input-phone"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <Select value={role} onValueChange={setRole}>
                <SelectTrigger data-testid="select-role">
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="evaluator">Evaluator</SelectItem>
                  <SelectItem value="landlord">Landlord</SelectItem>
                  <SelectItem value="tenant">Tenant</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setAddUserDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddUser} data-testid="button-create-user">
              Add User
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Role Dialog */}
      <Dialog open={editRoleDialogOpen} onOpenChange={setEditRoleDialogOpen}>
        <DialogContent className="max-w-md mx-4">
          <DialogHeader>
            <DialogTitle>Modify User Role</DialogTitle>
            <DialogDescription>
              Change the role for {selectedUser?.fullName}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Current Role</Label>
              <p className="text-sm text-muted-foreground capitalize">
                {selectedUser?.role}
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="newRole">New Role</Label>
              <Select value={role} onValueChange={setRole}>
                <SelectTrigger data-testid="select-new-role">
                  <SelectValue placeholder="Select new role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="evaluator">Evaluator</SelectItem>
                  <SelectItem value="landlord">Landlord</SelectItem>
                  <SelectItem value="tenant">Tenant</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setEditRoleDialogOpen(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleUpdateRole} 
              disabled={!role || role === selectedUser?.role}
              data-testid="button-update-role"
            >
              Update Role
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <BottomNav role="admin" />

      <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
        <SheetContent side="left" className="w-[280px]">
          <SheetHeader>
            <SheetTitle>Menu</SheetTitle>
          </SheetHeader>
          <div className="mt-6 space-y-2">
            <Card className="hover-elevate active-elevate-2">
              <button
                className="w-full p-4 flex items-center gap-3 text-left"
                onClick={() => {
                  setMenuOpen(false);
                  setLocation("/admin/dashboard");
                }}
              >
                <Home className="w-5 h-5" />
                <span className="font-medium">Dashboard</span>
              </button>
            </Card>
            
            <Card className="hover-elevate active-elevate-2">
              <button
                className="w-full p-4 flex items-center gap-3 text-left"
                onClick={() => {
                  setMenuOpen(false);
                  setLocation("/admin/users");
                }}
              >
                <Users className="w-5 h-5" />
                <span className="font-medium">User Management</span>
              </button>
            </Card>
            
            <Card className="hover-elevate active-elevate-2">
              <button
                className="w-full p-4 flex items-center gap-3 text-left"
                onClick={() => {
                  setMenuOpen(false);
                  setLocation("/admin/properties");
                }}
              >
                <FileText className="w-5 h-5" />
                <span className="font-medium">Properties</span>
              </button>
            </Card>
            
            <Card className="hover-elevate active-elevate-2">
              <button
                className="w-full p-4 flex items-center gap-3 text-left"
                onClick={() => {
                  setMenuOpen(false);
                  setLocation("/admin/settings");
                }}
              >
                <Settings className="w-5 h-5" />
                <span className="font-medium">Settings</span>
              </button>
            </Card>

            <div className="pt-4">
              <Card className="hover-elevate active-elevate-2 border-destructive/20">
                <button
                  className="w-full p-4 flex items-center gap-3 text-left text-destructive"
                  onClick={handleLogout}
                >
                  <LogOut className="w-5 h-5" />
                  <span className="font-medium">Logout</span>
                </button>
              </Card>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
