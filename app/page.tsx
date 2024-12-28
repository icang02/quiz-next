import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import axios from "axios";
import ErrorPage from "@/components/custom/ErrorPage";

type Package = {
  id: number;
  name: string;
  slug: string;
  description: string;
  questions: {
    id: number;
  }[];
};

export default async function Home() {
  let packages: Package[] = [];
  let errorMessage: string = "";

  try {
    const response = await axios.get(process.env.API + "/packages");
    packages = response.data.data;
  } catch (error) {
    console.error("Error fetching packages:", error);
    errorMessage = "Gagal memuat data paket. Silakan coba lagi nanti.";
  }

  if (errorMessage) {
    return <ErrorPage message={errorMessage} />;
  }

  return (
    <div className="px-5 md:px-0 grid grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto mt-10 md:mt-12 gap-8">
      {packages.map((pkg: Package, index: number) => (
        <Card key={index}>
          <CardHeader>
            <CardTitle> {pkg.name} </CardTitle>
            <CardDescription>
              {pkg.questions.length === 0 ? (
                <span>Belum ada soal.</span>
              ) : (
                <span>
                  Terdiri dari {pkg.questions.length} nomor soal latihan.
                </span>
              )}
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="rounded-md border p-4">
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium leading-none">Try Out</p>
                <p className="text-sm text-muted-foreground">
                  {pkg.description}
                </p>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            {pkg.questions.length === 0 ? (
              <Button disabled className="w-fit">
                Kerjakan
              </Button>
            ) : (
              <Link href={`/detail/${pkg.slug}`}>
                <Button className="w-fit">Kerjakan</Button>
              </Link>
            )}
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
