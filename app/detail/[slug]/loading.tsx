import Skeleton from "react-loading-skeleton";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function loading() {
  return (
    <div className="px-5 md:px-0 max-w-xl mt-10 md:mt-12 mx-auto grid grid-cols-1">
      <Card className="shadow">
        <CardHeader>
          <CardTitle>
            <Skeleton />
          </CardTitle>
          <CardDescription>
            <Skeleton width="40%" />
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Skeleton height={33} />
        </CardContent>
        <CardFooter className="flex justify-between">
          <Skeleton width="90px" height={32} />
          <Skeleton width="90px" height={32} />
        </CardFooter>
      </Card>
    </div>
  );
}
