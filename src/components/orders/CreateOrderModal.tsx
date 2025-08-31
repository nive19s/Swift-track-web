import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Card, CardContent } from '@/components/ui/card'
import { Plus, X, Package, MapPin, DollarSign } from 'lucide-react'

interface OrderItem {
  id: string
  name: string
  quantity: number
  weight: number
  dimensions: string
}

interface CreateOrderModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onOrderCreate: (order: any) => void
}

export default function CreateOrderModal({ open, onOpenChange, onOrderCreate }: CreateOrderModalProps) {
  const [orderData, setOrderData] = useState({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    pickupAddress: '',
    deliveryAddress: '',
    priority: 'standard',
    specialInstructions: '',
    items: [] as OrderItem[]
  })

  const [newItem, setNewItem] = useState({
    name: '',
    quantity: 1,
    weight: 0,
    dimensions: ''
  })

  const addItem = () => {
    if (newItem.name) {
      const item: OrderItem = {
        id: Math.random().toString(36).substr(2, 9),
        ...newItem
      }
      setOrderData(prev => ({
        ...prev,
        items: [...prev.items, item]
      }))
      setNewItem({ name: '', quantity: 1, weight: 0, dimensions: '' })
    }
  }

  const removeItem = (id: string) => {
    setOrderData(prev => ({
      ...prev,
      items: prev.items.filter(item => item.id !== id)
    }))
  }

  const calculateOrderValue = () => {
    const basePrice = 150
    const priorityMultiplier = orderData.priority === 'urgent' ? 2 : orderData.priority === 'express' ? 1.5 : 1
    const weightCharge = orderData.items.reduce((sum, item) => sum + (item.weight * 10), 0)
    return (basePrice * priorityMultiplier) + weightCharge
  }

  const handleSubmit = () => {
    const orderValue = calculateOrderValue()
    const order = {
      id: `ORD-${Date.now()}`,
      ...orderData,
      status: 'Processing',
      createdAt: new Date().toISOString(),
      estimatedValue: orderValue
    }
    
    // Simulate payment processing for order creation
    const proceedWithPayment = window.confirm(
      `Order total: $${orderValue.toFixed(2)}\n\nProceed to payment?\n\n(Payment integration with Stripe will be implemented based on your requirements)`
    )
    
    if (proceedWithPayment) {
      onOrderCreate(order)
      setOrderData({
        customerName: '',
        customerEmail: '',
        customerPhone: '',
        pickupAddress: '',
        deliveryAddress: '',
        priority: 'standard',
        specialInstructions: '',
        items: []
      })
      onOpenChange(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Package className="w-5 h-5" />
            Create New Order
          </DialogTitle>
          <DialogDescription>
            Fill in the order details and add items for pickup and delivery
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Customer Information */}
          <Card>
            <CardContent className="p-4 space-y-4">
              <h3 className="font-semibold text-lg">Customer Information</h3>
              <div className="space-y-3">
                <div>
                  <Label htmlFor="customerName">Customer Name</Label>
                  <Input
                    id="customerName"
                    value={orderData.customerName}
                    onChange={(e) => setOrderData(prev => ({ ...prev, customerName: e.target.value }))}
                    placeholder="Enter customer name"
                  />
                </div>
                <div>
                  <Label htmlFor="customerEmail">Email</Label>
                  <Input
                    id="customerEmail"
                    type="email"
                    value={orderData.customerEmail}
                    onChange={(e) => setOrderData(prev => ({ ...prev, customerEmail: e.target.value }))}
                    placeholder="customer@example.com"
                  />
                </div>
                <div>
                  <Label htmlFor="customerPhone">Phone</Label>
                  <Input
                    id="customerPhone"
                    value={orderData.customerPhone}
                    onChange={(e) => setOrderData(prev => ({ ...prev, customerPhone: e.target.value }))}
                    placeholder="+94 XX XXX XXXX"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Delivery Information */}
          <Card>
            <CardContent className="p-4 space-y-4">
              <h3 className="font-semibold text-lg flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                Delivery Information
              </h3>
              <div className="space-y-3">
                <div>
                  <Label htmlFor="pickupAddress">Pickup Address</Label>
                  <Textarea
                    id="pickupAddress"
                    value={orderData.pickupAddress}
                    onChange={(e) => setOrderData(prev => ({ ...prev, pickupAddress: e.target.value }))}
                    placeholder="Enter pickup address"
                    rows={2}
                  />
                </div>
                <div>
                  <Label htmlFor="deliveryAddress">Delivery Address</Label>
                  <Textarea
                    id="deliveryAddress"
                    value={orderData.deliveryAddress}
                    onChange={(e) => setOrderData(prev => ({ ...prev, deliveryAddress: e.target.value }))}
                    placeholder="Enter delivery address"
                    rows={2}
                  />
                </div>
                <div>
                  <Label htmlFor="priority">Priority</Label>
                  <Select value={orderData.priority} onValueChange={(value) => setOrderData(prev => ({ ...prev, priority: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="standard">Standard</SelectItem>
                      <SelectItem value="express">Express</SelectItem>
                      <SelectItem value="urgent">Urgent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Order Items */}
        <Card>
          <CardContent className="p-4 space-y-4">
            <h3 className="font-semibold text-lg">Order Items</h3>
            
            {/* Add New Item */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-3 p-3 border border-border rounded-lg bg-muted/30">
              <div>
                <Label htmlFor="itemName">Item Name</Label>
                <Input
                  id="itemName"
                  value={newItem.name}
                  onChange={(e) => setNewItem(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Item name"
                />
              </div>
              <div>
                <Label htmlFor="quantity">Quantity</Label>
                <Input
                  id="quantity"
                  type="number"
                  value={newItem.quantity}
                  onChange={(e) => setNewItem(prev => ({ ...prev, quantity: parseInt(e.target.value) || 1 }))}
                  min="1"
                />
              </div>
              <div>
                <Label htmlFor="weight">Weight (kg)</Label>
                <Input
                  id="weight"
                  type="number"
                  step="0.1"
                  value={newItem.weight}
                  onChange={(e) => setNewItem(prev => ({ ...prev, weight: parseFloat(e.target.value) || 0 }))}
                  placeholder="0.0"
                />
              </div>
              <div>
                <Label htmlFor="dimensions">Dimensions</Label>
                <Input
                  id="dimensions"
                  value={newItem.dimensions}
                  onChange={(e) => setNewItem(prev => ({ ...prev, dimensions: e.target.value }))}
                  placeholder="L×W×H cm"
                />
              </div>
              <div className="flex items-end">
                <Button onClick={addItem} className="w-full">
                  <Plus className="w-4 h-4 mr-1" />
                  Add
                </Button>
              </div>
            </div>

            {/* Items List */}
            {orderData.items.length > 0 && (
              <div className="space-y-2">
                {orderData.items.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-3 border border-border rounded-lg">
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-3">
                      <div>
                        <span className="font-medium">{item.name}</span>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Qty: {item.quantity}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {item.weight}kg
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {item.dimensions}
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeItem(item.id)}
                      className="text-destructive hover:text-destructive"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Special Instructions */}
        <div>
          <Label htmlFor="specialInstructions">Special Instructions</Label>
          <Textarea
            id="specialInstructions"
            value={orderData.specialInstructions}
            onChange={(e) => setOrderData(prev => ({ ...prev, specialInstructions: e.target.value }))}
            placeholder="Any special handling instructions..."
            rows={3}
          />
        </div>

        {/* Order Summary */}
        {orderData.items.length > 0 && (
          <Card>
            <CardContent className="p-4">
              <h3 className="font-semibold text-lg flex items-center gap-2 mb-3">
                <DollarSign className="w-4 h-4" />
                Order Summary
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Base delivery fee:</span>
                  <span>$150.00</span>
                </div>
                {orderData.priority !== 'standard' && (
                  <div className="flex justify-between">
                    <span>Priority surcharge ({orderData.priority}):</span>
                    <span>${orderData.priority === 'urgent' ? '150.00' : '75.00'}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Weight charges:</span>
                  <span>${(orderData.items.reduce((sum, item) => sum + (item.weight * 10), 0)).toFixed(2)}</span>
                </div>
                <div className="border-t border-border pt-2 flex justify-between font-medium">
                  <span>Total:</span>
                  <span>${calculateOrderValue().toFixed(2)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit}
            disabled={!orderData.customerName || !orderData.deliveryAddress || orderData.items.length === 0}
            className="gradient-primary"
          >
            <DollarSign className="w-4 h-4 mr-2" />
            Create Order & Pay
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}