import ProductTable from "@/components/ProductTable"

export default function ProductsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight" data-testid="products-page-title">Products</h1>
        <p className="text-muted-foreground">Manage your product catalog</p>
      </div>
      
      <ProductTable />
    </div>
  )
}