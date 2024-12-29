import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ErrorPage from "@/components/custom/ErrorPage";
import FormStoreAttempt from "@/components/ExamDetail/FormStoreAttempt";
import axiosApi from "@/lib/axios";

type Package = {
  id: number;
  name: string;
  slug: string;
  description: string;
};

type Params = Promise<{ slug: string }>;

export default async function Page({ params }: { params: Params }) {
  const { slug } = await params;

  let pkg: Package | null = null;
  let errorMessage: string = "";

  try {
    const response = await axiosApi.get(`/package/${slug}`);
    pkg = response.data.data;
  } catch (error) {
    console.error("Error fetching packages:", error);
    errorMessage = "Gagal memuat data paket. Silakan coba lagi nanti.";
  }

  if (errorMessage) return <ErrorPage message={errorMessage} />;
  if (!pkg) return <ErrorPage message="Data paket tidak ditemukan." />;

  return (
    <div className="px-5 md:px-0 max-w-xl mt-10 md:mt-12 mx-auto grid grid-cols-1">
      <Card>
        <CardHeader>
          <CardTitle>{pkg.name}</CardTitle>
          <CardDescription>Silahkan isi form berikut.</CardDescription>
        </CardHeader>
        <CardContent>
          <FormStoreAttempt attemptId={pkg.id} />
        </CardContent>
      </Card>
    </div>
  );
}
