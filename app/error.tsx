"use client"; // Error boundaries must be Client Components

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { redirect } from "next/navigation";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="h-screen flex justify-center items-center p-3">
      <Card className="w-full md:max-w-lg">
        <CardHeader>
          <CardTitle>{error.message}</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <span className="text-5xl md:text-6xl">😜</span>
        </CardContent>
        <CardFooter className="flex justify-between items-center">
          <Button onClick={() => redirect("/")}>Back to home</Button>
          <Button variant={"destructive"} onClick={() => reset()}>
            Try again
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
