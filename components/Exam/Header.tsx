import { Attempt } from "@/lib/types";
import { useNumberQuestionStore } from "./Body";
import Timer from "./Timer";

export default function Header({ attempt }: { attempt: Attempt }) {
  const { numberQuestion } = useNumberQuestionStore();

  console.log(attempt.start_time);
  console.log(attempt.end_time);
  return (
    <div className="flex justify-between mb-4">
      <h1 className="text-base md:text-xl font-bold">Soal {numberQuestion}</h1>
      <h1 className="font-medium hidden md:block">{attempt.package.name}</h1>
      <Timer
        attemptId={attempt.id}
        startTime={attempt.start_time}
        endTime={attempt.end_time}
      />
    </div>
  );
}
