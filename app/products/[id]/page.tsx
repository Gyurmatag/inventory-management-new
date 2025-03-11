"use client"

import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { initialProducts } from "@/lib/data"
import Link from "next/link"
import { ArrowLeft, Edit, AlertTriangle } from "lucide-react"

export default function ProductDetailPage() {
  const { id } = useParams() as { id: string }
  
  // Find the product by ID
  const product = initialProducts.find(p => p.id === id)
  
  // Handle product not found
  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <h1 className="text-3xl font-bold mb-4">Product Not Found</h1>
        <p className="mb-8">The product with ID {id} could not be found.</p>
        <Link href="/products">
          <Button>
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Products
          </Button>
        </Link>
      </div>
    )
  }
  
  // Determine stock status
  const isLowStock = product.stock <= product.threshold
  const isOutOfStock = product.stock <= 0
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <Link href="/products">
          <Button variant="outline" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Products
          </Button>
        </Link>
        <Button size="sm" data-testid="edit-product-button">
          <Edit className="mr-2 h-4 w-4" /> Edit Product
        </Button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex justify-between">
              <div>
                <CardTitle data-testid="product-name">{product.name}</CardTitle>
                <CardDescription>Product ID: {product.id}</CardDescription>
              </div>
              <Badge variant={isOutOfStock ? "destructive" : isLowStock ? "outline" : "default"}>
                {isOutOfStock ? "Out of Stock" : isLowStock ? "Low Stock" : "In Stock"}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="font-medium mb-2">Description</h3>
              <p className="text-muted-foreground">
                This is a detailed description of the {product.name}. Product descriptions help customers 
                understand the features and benefits of the product.
              </p>
            </div>
            
            <div>
              <h3 className="font-medium mb-2">Details</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium">Category</p>
                  <p className="text-sm text-muted-foreground">{product.category}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Price</p>
                  <p className="text-sm text-muted-foreground">${product.price.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Current Stock</p>
                  <p className="text-sm text-muted-foreground">{product.stock} units</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Last Updated</p>
                  <p className="text-sm text-muted-foreground">{product.lastUpdated}</p>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" data-testid="update-stock-button">Update Stock</Button>
            <Button variant="destructive" data-testid="delete-product-button">Delete Product</Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Stock Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm">Current Stock</span>
                <span className="font-medium">{product.stock} units</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Reorder Threshold</span>
                <span className="font-medium">{product.threshold} units</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Last Updated</span>
                <span className="font-medium">{product.lastUpdated}</span>
              </div>
            </div>
            
            {isLowStock && (
              <div className="bg-amber-50 border border-amber-200 rounded-md p-3 flex items-start">
                <AlertTriangle className="h-5 w-5 text-amber-500 mr-2 flex-shrink-0" />
                <div>
                  <h4 className="text-sm font-medium text-amber-800">Low Stock Alert</h4>
                  <p className="text-xs text-amber-700">
                    This product is below the reorder threshold. Consider restocking soon.
                  </p>
                </div>
              </div>
            )}
          </CardContent>
          <CardFooter>
            <Button className="w-full" data-testid="restock-button">Restock Product</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}