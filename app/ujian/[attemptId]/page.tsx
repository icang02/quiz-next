import Body from "@/components/Exam/Body";
import { Attempt } from "@/lib/types";
import axios from "axios";

type Params = Promise<{ attemptId: string }>;

export default async function page({ params }: { params: Params }) {
  const { attemptId } = await params;
  let attempt: Attempt | null = null;

  try {
    const response = await axios.get(`${process.env.API}/attempt/${attemptId}`);
    attempt = response.data.data;
  } catch (error) {
    console.log(error);
  }
  
  if (!attempt) return <p>Error broww.....</p>;

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <Body attempt={attempt} />
    </div>
  );
}
