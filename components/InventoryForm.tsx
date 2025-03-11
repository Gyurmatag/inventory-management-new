"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card"
import { Loader2, PlusCircle, MinusCircle } from "lucide-react"
import { initialProducts } from "@/lib/data"

// Define the form schema type
type FormValues = z.infer<typeof formSchema>

// Form schema for validation
const formSchema = z.object({
  productId: z.string({
    required_error: "Please select a product.",
  }),
  updateType: z.enum(["add", "remove"], {
    required_error: "Please select an update type.",
  }),
  quantity: z.coerce
    .number({
      required_error: "Please enter a quantity.",
      invalid_type_error: "Quantity must be a number.",
    })
    .int()
    .positive("Quantity must be a positive number."),
  notes: z.string().optional(),
})

export default function InventoryForm() {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const [success, setSuccess] = useState<boolean>(false)
  
  // Form setup
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      productId: "",
      updateType: "add",
      quantity: 1,
      notes: "",
    },
  })
  
  // Handle form submission
  function onSubmit(values: FormValues): void {
    setIsSubmitting(true)
    
    // Simulate API call
    setTimeout(() => {
      console.log(values)
      setIsSubmitting(false)
      setSuccess(true)
      
      // Reset success message after 3 seconds
      setTimeout(() => setSuccess(false), 3000)
      
      // Reset form
      form.reset()
    }, 1500)
  }
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Update Inventory</CardTitle>
        <CardDescription>Add or remove stock for a product.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="productId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger data-testid="product-select">
                        <SelectValue placeholder="Select a product" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {initialProducts.map((product) => (
                        <SelectItem key={product.id} value={product.id}>{product.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Select the product you want to update.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="updateType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Update Type</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger data-testid="update-type-select">
                        <SelectValue placeholder="Select update type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="add">Add Stock</SelectItem>
                      <SelectItem value="remove">Remove Stock</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Are you adding or removing stock?
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quantity</FormLabel>
                  <FormControl>
                    <Input type="number" min="1" {...field} data-testid="quantity-input" />
                  </FormControl>
                  <FormDescription>
                    The number of units to add or remove.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Notes (Optional)</FormLabel>
                  <FormControl>
                    <Input {...field} data-testid="notes-input" />
                  </FormControl>
                  <FormDescription>
                    Add any additional notes about this update.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="flex justify-end">
              <Button type="submit" disabled={isSubmitting} data-testid="update-inventory-button">
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Updating...
                  </>
                ) : form.watch("updateType") === "add" ? (
                  <>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add Stock
                  </>
                ) : (
                  <>
                    <MinusCircle className="mr-2 h-4 w-4" />
                    Remove Stock
                  </>
                )}
              </Button>
            </div>
            
            {success && (
              <div className="bg-green-50 border border-green-200 rounded-md p-3 text-green-800 text-sm mt-4">
                Inventory updated successfully!
              </div>
            )}
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}