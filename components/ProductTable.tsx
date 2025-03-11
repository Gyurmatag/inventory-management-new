"use client"

import { useState } from "react"
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table"
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { initialProducts, categories } from "@/lib/data"
import { Product, StockStatus } from "@/lib/types"
import Link from "next/link"
import { MoreVertical, Plus } from "lucide-react"
import { ChangeEvent } from "react"

export default function ProductTable() {
  const [products] = useState<Product[]>(initialProducts)
  const [searchTerm, setSearchTerm] = useState<string>("")
  const [filterCategory, setFilterCategory] = useState<string>("")

  // Filter products based on search term and category
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      product.id.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesCategory = filterCategory === "" || product.category === filterCategory
    
    return matchesSearch && matchesCategory
  })

  // Helper function to determine stock status
  const getStockStatus = (product: Product): StockStatus => {
    if (product.stock <= 0) return { label: "Out of Stock", color: "destructive" }
    if (product.stock <= product.threshold) return { label: "Low Stock", color: "warning" }
    return { label: "In Stock", color: "success" }
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between gap-3">
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-2/3">
          <Input
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
            className="w-full"
            data-testid="product-search"
          />
          <Select value={filterCategory} onValueChange={setFilterCategory}>
            <SelectTrigger className="w-full sm:w-[180px]" data-testid="category-filter">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map(category => (
                <SelectItem key={category} value={category}>{category}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Button data-testid="add-product-button">
          <Plus className="mr-2 h-4 w-4" /> Add Product
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead className="text-right">Price</TableHead>
              <TableHead className="text-right">Stock</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => {
                const status = getStockStatus(product)
                const badgeColor = status.color === "destructive" ? "bg-red-100 text-red-800" : 
                                  status.color === "warning" ? "bg-amber-100 text-amber-800" : 
                                  "bg-green-100 text-green-800"
                
                return (
                  <TableRow key={product.id} data-testid={`product-row-${product.id}`}>
                    <TableCell className="font-medium">{product.id}</TableCell>
                    <TableCell>
                      <Link href={`/products/${product.id}`} className="text-blue-600 hover:underline">
                        {product.name}
                      </Link>
                    </TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell className="text-right">${product.price.toFixed(2)}</TableCell>
                    <TableCell className="text-right">{product.stock}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs ${badgeColor}`}>
                        {status.label}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="h-4 w-4" />
                            <span className="sr-only">Open menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem>Edit Product</DropdownMenuItem>
                          <DropdownMenuItem>Update Stock</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600">Delete Product</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                )
              })
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-6">
                  No products found. Try adjusting your search or filters.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}