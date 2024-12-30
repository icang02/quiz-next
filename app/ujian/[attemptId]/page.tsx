import Body from "@/components/Exam/Body";
import axiosApi from "@/lib/axios";
import { Attempt } from "@/lib/types";

type Params = Promise<{ attemptId: string }>;

export default async function page({ params }: { params: Params }) {
  const { attemptId } = await params;
  let attempt: Attempt | null = null;

  try {
    const response = await axiosApi.get(`/attempt/${attemptId}`);
    attempt = response.data.data;
  } catch (error) {
    console.log(error);
  }

  if (!attempt) {
    throw new Error("Attempt data tidak ditemukan.");
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <Body attempt={attempt} />
    </div>
  );
}
