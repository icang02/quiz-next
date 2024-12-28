import Skeleton from "react-loading-skeleton";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function loading() {
  return (
    <div className="px-5 md:px-0 grid grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto mt-10 md:mt-12 gap-8">
      <Card className="shadow">
        <CardHeader>
          <CardTitle className="text-base">
            <Skeleton />
          </CardTitle>
          <CardDescription>
            <Skeleton width="65%" />
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4 rounded-md border p-4">
            <div className="flex-1 space-y-1">
              <p className="text-sm font-medium leading-none">
                <Skeleton width="20%" />
              </p>
              <p className="text-sm text-muted-foreground">
                <Skeleton width="100%" count={2} />
                <Skeleton width="65%" />
              </p>
            </div>
          </div>
          <Skeleton width="100px" className="h-8 mt-7" />
        </CardContent>
      </Card>
      <Card className="shadow">
        <CardHeader>
          <CardTitle className="text-base">
            <Skeleton />
          </CardTitle>
          <CardDescription>
            <Skeleton width="65%" />
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4 rounded-md border p-4">
            <div className="flex-1 space-y-1">
              <p className="text-sm font-medium leading-none">
                <Skeleton width="20%" />
              </p>
              <p className="text-sm text-muted-foreground">
                <Skeleton width="100%" count={2} />
                <Skeleton width="65%" />
              </p>
            </div>
          </div>
          <Skeleton width="100px" className="h-8 mt-7" />
        </CardContent>
      </Card>
    </div>
  );
}
