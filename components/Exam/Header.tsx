import { useNumberQuestionStore } from "./Body";

export default function Header({ packageName }: { packageName: string }) {
  const { numberQuestion } = useNumberQuestionStore();

  return (
    <div className="flex justify-between mb-4">
      <h1 className="text-base md:text-xl font-bold">Soal {numberQuestion}</h1>
      <h1 className="font-medium hidden md:block">{packageName}</h1>
      {/* <!-- <x-timer :startTime="$attempt->start_time" :endTime="$attempt->end_time"></x-timer> --> */}
    </div>
  );
}
