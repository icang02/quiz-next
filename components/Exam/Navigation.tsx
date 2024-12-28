"use client";

import { Button } from "@/components/ui/button";
import { Question } from "@/lib/types";

export default function Navigation({ questions }: { questions: Question[] }) {
  const handleChangeQuestion = (index: number) => {
    alert(index + 1);
  };

  return (
    <div className="w-fuil md:w-1/4 bg-gray-50 p-3 md:p-4 border-b md:border-r">
      <h2 className="text-lg font-bold mb-4">Navigasi Soal</h2>
      <div className="grid grid-cols-6 md:grid-cols-5 gap-1">
        {questions.map((item, index) => (
          <Button
            onClick={() => handleChangeQuestion(index)}
            key={item.id}
            size={"sm"}
            variant={"destructive"}
            className="text-[10px] md:text-xs font-semibold select-none"
          >
            {index + 1}
          </Button>
        ))}
      </div>
    </div>
  );
}
