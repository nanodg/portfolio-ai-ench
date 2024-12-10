import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/Card"
import { Skeleton } from "@/components/ui/skeleton"

export const SkeletonCard = () => {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="h-8 w-3/4" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-20 w-full mb-4" />
        <div className="flex flex-wrap gap-2">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="h-6 w-20" />
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex justify-end gap-4 w-full">
          <Skeleton className="h-10 w-24" />
          <Skeleton className="h-10 w-24" />
        </div>
      </CardFooter>
    </Card>
  )
}
