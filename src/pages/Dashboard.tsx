import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import CreateOrderModal from '@/components/orders/CreateOrderModal'
import OrdersTable from '@/components/orders/OrdersTable'
import { 
  Truck, 
  Package, 
  MapPin, 
  BarChart3, 
  Bell, 
  Settings,
  Plus,
  Search,
  Filter,
  Download,
  RefreshCw,
  Calendar,
  DollarSign,
  TrendingUp,
  Clock,
  AlertCircle,
  CheckCircle,
  User,
  LogOut
} from 'lucide-react'

export default function Dashboard() {
  const [selectedTab, setSelectedTab] = useState("overview")
  const [createOrderOpen, setCreateOrderOpen] = useState(false)
  const [orders, setOrders] = useState([
    {
      id: "ORD-2024-001",
      customerName: "TechStore Ltd",
      status: "In Transit",
      destination: "Colombo",
      estimatedValue: 1250,
      createdAt: "2024-01-15T10:30:00Z",
      priority: "express",
      items: [{ name: "Electronics", quantity: 2 }]
    },
    {
      id: "ORD-2024-002", 
      customerName: "Fashion Hub",
      status: "Processing",
      destination: "Kandy",
      estimatedValue: 890,
      createdAt: "2024-01-15T14:20:00Z",
      priority: "standard",
      items: [{ name: "Clothing", quantity: 5 }]
    },
    {
      id: "ORD-2024-003",
      customerName: "Digital World",
      status: "Delivered",
      destination: "Galle",
      estimatedValue: 2100,
      createdAt: "2024-01-14T09:15:00Z",
      priority: "urgent",
      items: [{ name: "Gadgets", quantity: 3 }]
    }
  ])

  // Mock data
  const stats = [
    {
      title: "Active Orders",
      value: "1,247",
      change: "+12.5%",
      icon: <Package className="w-6 h-6" />,
      trend: "up"
    },
    {
      title: "In Transit",
      value: "847",
      change: "+8.2%",
      icon: <Truck className="w-6 h-6" />,
      trend: "up"
    },
    {
      title: "Delivered Today",
      value: "342",
      change: "+15.3%",
      icon: <CheckCircle className="w-6 h-6" />,
      trend: "up"
    },
    {
      title: "Monthly Revenue",
      value: "$45,231",
      change: "+7.4%",
      icon: <DollarSign className="w-6 h-6" />,
      trend: "up"
    }
  ]

  const handleCreateOrder = (newOrder: any) => {
    setOrders(prev => [newOrder, ...prev])
  }

  const handleOrderView = (order: any) => {
    console.log('View order:', order)
    // TODO: Implement order detail modal
  }

  const recentOrders = orders.slice(0, 3).map(order => ({
    id: order.id,
    customer: order.customerName,
    status: order.status,
    destination: order.destination,
    value: `$${order.estimatedValue.toFixed(2)}`,
    date: new Date(order.createdAt).toISOString().split('T')[0]
  }))

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Processing": return "bg-warning text-warning-foreground"
      case "In Transit": return "bg-primary text-primary-foreground"
      case "Delivered": return "bg-success text-success-foreground"
      case "Delayed": return "bg-destructive text-destructive-foreground"
      default: return "bg-muted text-muted-foreground"
    }
  }

  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const notificationsRef = useRef<HTMLDivElement>(null)

  const notifications = [
    { id: 1, message: "Order ORD-2024-004 has been shipped.", date: "2024-01-16" },
    { id: 2, message: "Invoice INV-2024-001 is ready for download.", date: "2024-01-15" },
    { id: 3, message: "Order ORD-2024-003 delivered successfully.", date: "2024-01-14" }
  ]

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        notificationsRef.current &&
        !notificationsRef.current.contains(event.target as Node)
      ) {
        setNotificationsOpen(false)
      }
    }
    if (notificationsOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    } else {
      document.removeEventListener('mousedown', handleClickOutside)
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [notificationsOpen])

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="flex h-16 items-center justify-between px-6">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center">
              <Truck className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl text-foreground">SwiftTrack</span>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-4 relative">
            <div ref={notificationsRef} className="relative">
              <Button
                variant="ghost"
                size="sm"
                type="button"
                onClick={() => setNotificationsOpen((open) => !open)}
              >
                <Bell className="w-4 h-4 mr-2" />
                Notifications
              </Button>
              {notificationsOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-card border border-border rounded-lg shadow-lg z-50">
                  <div className="p-4">
                    <h2 className="text-base font-bold mb-2">Recent Notifications</h2>
                    <ul className="space-y-3 mb-2 max-h-60 overflow-y-auto">
                      {notifications.map(n => (
                        <li key={n.id} className="border-b border-border pb-2 last:border-b-0 last:pb-0">
                          <div className="text-foreground">{n.message}</div>
                          <div className="text-xs text-muted-foreground">{n.date}</div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
            <Button
              variant="ghost"
              size="sm"
              type="button"
              onClick={() => setSelectedTab("profile")}
            >
              <User className="w-4 h-4 mr-2" />
              Profile
            </Button>
            <Button
              variant="ghost"
              size="sm"
              type="button"
              onClick={() => window.location.assign('/')}
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 border-r border-border bg-card/30 min-h-screen">
          <nav className="p-4 space-y-2">
            <Button 
              variant={selectedTab === "overview" ? "default" : "ghost"} 
              className="w-full justify-start"
              onClick={() => setSelectedTab("overview")}
            >
              <BarChart3 className="w-4 h-4 mr-2" />
              Overview
            </Button>
            <Button 
              variant={selectedTab === "orders" ? "default" : "ghost"} 
              className="w-full justify-start"
              onClick={() => setSelectedTab("orders")}
            >
              <Package className="w-4 h-4 mr-2" />
              Orders
            </Button>
            <Button 
              variant={selectedTab === "profile" ? "default" : "ghost"} 
              className="w-full justify-start"
              onClick={() => setSelectedTab("profile")}
            >
              <User className="w-4 h-4 mr-2" />
              Profile
            </Button>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <Tabs value={selectedTab} onValueChange={setSelectedTab}>
            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h1 className="text-3xl font-bold text-foreground">Dashboard Overview</h1>
                  <p className="text-muted-foreground">Welcome back! Here's what's happening with your logistics.</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    <Calendar className="w-4 h-4 mr-2" />
                    Last 30 days
                  </Button>
                  <Button variant="outline" size="sm">
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Refresh
                  </Button>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="space-y-2">
                          <p className="text-sm text-muted-foreground">{stat.title}</p>
                          <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                          <p className="text-sm text-success">
                            {stat.change} from last month
                          </p>
                        </div>
                        <div className="gradient-primary w-12 h-12 rounded-lg flex items-center justify-center text-white">
                          {stat.icon}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Recent Activity */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Orders</CardTitle>
                    <CardDescription>Latest order activity</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentOrders.map((order, index) => (
                        <div key={index} className="flex items-center justify-between p-3 rounded-lg border border-border">
                          <div className="space-y-1">
                            <p className="font-medium text-sm">{order.id}</p>
                            <p className="text-sm text-muted-foreground">{order.customer}</p>
                            <p className="text-xs text-muted-foreground">{order.destination}</p>
                          </div>
                          <div className="text-right space-y-1">
                            <Badge className={getStatusColor(order.status)}>
                              {order.status}
                            </Badge>
                            <p className="text-sm font-medium">{order.value}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                    <CardDescription>Common tasks and shortcuts</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button 
                      variant="outline" 
                      className="w-full justify-start"
                      onClick={() => setCreateOrderOpen(true)}
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Create New Order
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Search className="w-4 h-4 mr-2" />
                      Track Shipment
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Download className="w-4 h-4 mr-2" />
                      Download Report
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Settings className="w-4 h-4 mr-2" />
                      Account Settings
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* Performance Metrics */}
              <Card>
                <CardHeader>
                  <CardTitle>Performance Metrics</CardTitle>
                  <CardDescription>Key performance indicators</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Delivery Success Rate</span>
                        <span className="text-sm font-medium">98.5%</span>
                      </div>
                      <Progress value={98.5} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">On-Time Delivery</span>
                        <span className="text-sm font-medium">95.2%</span>
                      </div>
                      <Progress value={95.2} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Customer Satisfaction</span>
                        <span className="text-sm font-medium">96.8%</span>
                      </div>
                      <Progress value={96.8} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Orders Tab */}
            <TabsContent value="orders" className="space-y-6">
              <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-foreground">Order Management</h1>
                <Button 
                  variant="gradient"
                  onClick={() => setCreateOrderOpen(true)}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  New Order
                </Button>
              </div>

              <OrdersTable 
                orders={orders}
                onOrderView={handleOrderView}
              />
            </TabsContent>

            {/* Profile Tab */}
            <TabsContent value="profile" className="space-y-6">
              <div className="flex flex-col items-center justify-center min-h-[60vh]">
                <div className="bg-card rounded-lg shadow-lg p-8 w-full max-w-lg">
                  <h1 className="text-3xl font-bold mb-6 text-foreground">Company Profile</h1>
                  <div className="space-y-4 mb-6">
                    <div>
                      <span className="block text-sm text-muted-foreground">Company Name</span>
                      <span className="block text-lg font-semibold text-foreground">TechStore Ltd</span>
                    </div>
                    <div>
                      <span className="block text-sm text-muted-foreground">Contact Person</span>
                      <span className="block text-lg font-semibold text-foreground">John Doe</span>
                    </div>
                    <div>
                      <span className="block text-sm text-muted-foreground">Email</span>
                      <span className="block text-lg font-semibold text-foreground">contact@techstore.com</span>
                    </div>
                    <div>
                      <span className="block text-sm text-muted-foreground">Phone</span>
                      <span className="block text-lg font-semibold text-foreground">+94 77 123 4567</span>
                    </div>
                    <div>
                      <span className="block text-sm text-muted-foreground">Business Address</span>
                      <span className="block text-lg font-semibold text-foreground">123, Main Street, Colombo, Sri Lanka</span>
                    </div>
                    <div>
                      <span className="block text-sm text-muted-foreground">Account Type</span>
                      <span className="block text-lg font-semibold text-foreground">E-Commerce Retailer</span>
                    </div>
                    <div>
                      <span className="block text-sm text-muted-foreground">Registered Since</span>
                      <span className="block text-lg font-semibold text-foreground">Jan 2024</span>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Button variant="default" disabled>
                      Edit Profile
                    </Button>
                    <Button variant="outline" onClick={() => setSelectedTab("overview")}>
                      Back to Dashboard
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>

          </Tabs>
        </main>
      </div>

      <CreateOrderModal
        open={createOrderOpen}
        onOpenChange={setCreateOrderOpen}
        onOrderCreate={handleCreateOrder}
      />
    </div>
  )
}
