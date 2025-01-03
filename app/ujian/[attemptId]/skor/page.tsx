import ButtonRestart from "@/components/EaxmScore/ButtonRestart";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import axiosApi from "@/lib/axios";
import { Attempt } from "@/lib/types";
import Link from "next/link";

type Params = Promise<{ attemptId: string }>;

export default async function page({ params }: { params: Params }) {
  const { attemptId } = await params;
  let attempt: Attempt;

  try {
    const response = await axiosApi("/ujian/" + attemptId + "/skor");
    attempt = response.data.data;
  } catch (error) {
    console.log(error);
    throw new Error("Something went wrong broo!");
  }

  return (
    <div className="px-5 md:px-0 max-w-lg mx-auto mt-10 md:mt-12 gap-8">
      <Card>
        <CardHeader>
          <CardTitle> {attempt.package.name} </CardTitle>
          <CardDescription>
            <p>Ujian Selesai</p>
            <p>
              Nama : <b>{attempt.user_name}</b>
            </p>
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 text-center">
          <div className="rounded-md border p-4">
            <div className="flex-1 space-y-1">
              <p className="text-sm font-medium leading-none">Skor</p>
              <p className="text-sm text-muted-foreground">
                <span className="text-4xl font-medium"> {attempt.score} </span>
              </p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex items-center justify-between">
          <ButtonRestart attemptId={parseInt(attemptId)} />
          <Link href={`/`}>
            <Button className="w-fit">Selesai</Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
