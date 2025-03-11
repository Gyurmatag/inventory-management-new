import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { initialProducts } from "@/lib/data";

export default function Home() {
  // Count products with low stock (below threshold)
  const lowStockCount = initialProducts.filter(product => product.stock <= product.threshold).length;
  
  return (
    <>
      <div className="flex min-h-[80vh] flex-col items-center justify-center">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold tracking-tight mb-2" data-testid="main-heading">Inventory Management System</h1>
          <p className="text-lg text-muted-foreground" data-testid="main-description">
            Track and manage your product inventory efficiently
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl">
          <Card>
            <CardHeader>
              <CardTitle>View Products</CardTitle>
              <CardDescription>Browse your product catalog</CardDescription>
            </CardHeader>
            <CardContent>
              <p>You have <strong>{initialProducts.length}</strong> products in your inventory.</p>
            </CardContent>
            <CardFooter>
              <Link href="/products" data-testid="products-link">
                <Button>View Products</Button>
              </Link>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Manage Inventory</CardTitle>
              <CardDescription>Update stock levels</CardDescription>
            </CardHeader>
            <CardContent>
              <p><strong className="text-amber-600">{lowStockCount}</strong> products are running low on stock currently.</p>
            </CardContent>
            <CardFooter>
              <Link href="/inventory" data-testid="inventory-link">
                <Button variant="outline">Manage Inventory</Button>
              </Link>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>View Analytics</CardTitle>
              <CardDescription>Sales and inventory statistics</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Check sales trends and inventory performance metrics.</p>
            </CardContent>
            <CardFooter>
              <Link href="/analytics" data-testid="analytics-link">
                <Button variant="secondary">View Analytics</Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
      </div>
    </>
  );
}
