"use client"

import { useState } from "react"
import InventoryForm from "@/components/InventoryForm"
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { initialProducts } from "@/lib/data"
import { Product } from "@/lib/types"

export default function InventoryPage() {
  const [products, setProducts] = useState<Product[]>(initialProducts)
  
  // Sort products by stock level (lowest first)
  const sortedProducts = [...products].sort((a, b) => a.stock - b.stock)
  
  const handleUpdateInventory = (productId: string, updateType: 'add' | 'remove', quantity: number) => {
    setProducts(currentProducts => 
      currentProducts.map(product => {
        if (product.id === productId) {
          const newStock = updateType === 'add' 
            ? product.stock + quantity 
            : Math.max(0, product.stock - quantity)
          
          return {
            ...product,
            stock: newStock,
            lastUpdated: new Date().toISOString().split('T')[0]
          }
        }
        return product
      })
    )
  }
    
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight" data-testid="inventory-page-title">
          Inventory Management
        </h1>
        <p className="text-muted-foreground">Update and track your inventory levels</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <div className="rounded-md border">
            <Table>
              <TableCaption>Products sorted by stock level (lowest first)</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead className="text-right">Stock</TableHead>
                  <TableHead className="text-right">Threshold</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedProducts.map((product) => {
                  const isLowStock = product.stock <= product.threshold
                  const isOutOfStock = product.stock <= 0
                  
                  const badgeVariant = isOutOfStock ? "destructive" : isLowStock ? "outline" : "secondary"
                  const badgeText = isOutOfStock ? "Out of Stock" : isLowStock ? "Low Stock" : "In Stock"
                  
                  return (
                    <TableRow key={product.id} data-testid={`inventory-row-${product.id}`}>
                      <TableCell className="font-medium">{product.name}</TableCell>
                      <TableCell className="text-right">{product.stock}</TableCell>
                      <TableCell className="text-right">{product.threshold}</TableCell>
                      <TableCell>
                        <Badge variant={badgeVariant}>{badgeText}</Badge>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </div>
        </div>
        
        <div>
          <InventoryForm onUpdateInventory={handleUpdateInventory} />
        </div>
      </div>
    </div>
  )
}