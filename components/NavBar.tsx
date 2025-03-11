import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NavBar() {
  return (
    <header className="border-b">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-6">
          <Link href="/" className="text-xl font-bold" data-testid="nav-logo">
            InventoryManager
          </Link>
          <nav className="hidden md:flex gap-6">
            <Link href="/" className="text-sm font-medium transition-colors hover:text-primary" data-testid="nav-home">
              Home
            </Link>
            <Link href="/products" className="text-sm font-medium transition-colors hover:text-primary" data-testid="nav-products">
              Products
            </Link>
            <Link href="/inventory" className="text-sm font-medium transition-colors hover:text-primary" data-testid="nav-inventory">
              Inventory
            </Link>
            <Link href="/analytics" className="text-sm font-medium transition-colors hover:text-primary" data-testid="nav-analytics">
              Analytics
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <Button data-testid="user-profile">Profile</Button>
        </div>
      </div>
    </header>
  )
}