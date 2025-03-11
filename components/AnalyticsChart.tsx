"use client"

import { useState } from "react"
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts'
import { categories, salesHistory, initialProducts } from "@/lib/data"

type TimeRange = "all" | "year" | "quarter" | "month"
type CategoryData = {
  name: string;
  value: number;
}

export default function AnalyticsChart() {
  const [timeRange, setTimeRange] = useState<TimeRange>("all")
  
  // Calculate category distribution for the pie chart
  const categoryData: CategoryData[] = categories.map(category => {
    const count = initialProducts.filter(product => product.category === category).length
    return { name: category, value: count }
  }).filter(item => item.value > 0)
  
  // Define colors for the pie chart
  const COLORS: string[] = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82ca9d']
  
  return (
    <Tabs defaultValue="sales" className="w-full">
      <div className="flex justify-between items-center mb-4">
        <TabsList>
          <TabsTrigger value="sales" data-testid="sales-tab">Sales</TabsTrigger>
          <TabsTrigger value="inventory" data-testid="inventory-tab">Inventory</TabsTrigger>
          <TabsTrigger value="categories" data-testid="categories-tab">Categories</TabsTrigger>
        </TabsList>
        
        <Select value={timeRange} onValueChange={(value: TimeRange) => setTimeRange(value)}>
          <SelectTrigger className="w-[180px]" data-testid="time-range-select">
            <SelectValue placeholder="Select time range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Time</SelectItem>
            <SelectItem value="year">Last Year</SelectItem>
            <SelectItem value="quarter">Last Quarter</SelectItem>
            <SelectItem value="month">Last Month</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <TabsContent value="sales" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Sales Trend</CardTitle>
            <CardDescription>Monthly sales performance over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={salesHistory}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="sales" stroke="#8884d8" activeDot={{ r: 8 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
          <CardFooter className="text-sm text-muted-foreground">
            Sale figures updated as of March 2025.
          </CardFooter>
        </Card>
      </TabsContent>
      
      <TabsContent value="inventory" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Current Stock Levels</CardTitle>
            <CardDescription>Stock levels for each product</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={initialProducts}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" tick={{ fontSize: 10 }} angle={-45} textAnchor="end" height={80} />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="stock" fill="#82ca9d" name="Current Stock" />
                  <Bar dataKey="threshold" fill="#ffc658" name="Reorder Threshold" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
          <CardFooter className="text-sm text-muted-foreground">
            Stock levels updated in real-time.
          </CardFooter>
        </Card>
      </TabsContent>
      
      <TabsContent value="categories" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Product Categories</CardTitle>
            <CardDescription>Distribution of products by category</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={true}
                    label={({ name, percent }: { name: string; percent: number }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value} products`, 'Count']} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
          <CardFooter className="text-sm text-muted-foreground">
            Showing distribution of {initialProducts.length} products across {categoryData.length} categories.
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  )
}