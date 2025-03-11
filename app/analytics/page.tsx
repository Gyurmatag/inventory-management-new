import AnalyticsChart from "@/components/AnalyticsChart"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { initialProducts } from "@/lib/data"

export default function AnalyticsPage() {
  // Calculate summary statistics
  const totalProducts: number = initialProducts.length
  const totalStock: number = initialProducts.reduce((sum, product) => sum + product.stock, 0)
  const lowStockCount: number = initialProducts.filter(product => product.stock <= product.threshold).length
  const totalValue: number = initialProducts.reduce((sum, product) => sum + (product.price * product.stock), 0)
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight" data-testid="analytics-page-title">Analytics</h1>
        <p className="text-muted-foreground">Track your inventory and sales performance</p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold" data-testid="total-products">{totalProducts}</div>
          </CardContent>
          <CardFooter className="text-xs text-muted-foreground">
            Across all categories
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Stock</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold" data-testid="total-stock">{totalStock}</div>
          </CardContent>
          <CardFooter className="text-xs text-muted-foreground">
            Units in inventory
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Low Stock Items</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold" data-testid="low-stock">{lowStockCount}</div>
          </CardContent>
          <CardFooter className="text-xs text-muted-foreground">
            Items below reorder threshold
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Inventory Value</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold" data-testid="inventory-value">${totalValue.toFixed(2)}</div>
          </CardContent>
          <CardFooter className="text-xs text-muted-foreground">
            Total value of current stock
          </CardFooter>
        </Card>
      </div>
      
      <AnalyticsChart />
    </div>
  )
}