"use client";

import { Button } from "@/components/ui/button";
import axiosApi from "@/lib/axios";
import { useRouter } from "next/navigation";
import { useNumberQuestionStore, UserAnswers } from "../Exam/Body";

export default function ButtonRestart({ attemptId }: { attemptId: number }) {
  const router = useRouter();
  const { updateNumber } = useNumberQuestionStore();

  const restartExam = async () => {
    try {
      await axiosApi.post("/ujian/restart", { attemptId });
      updateNumber(1);

      let existingAnswers: UserAnswers[] = JSON.parse(
        localStorage.getItem("userAnswers") ?? "[]"
      );
      // Simpan kembali ke localStorage
      existingAnswers = existingAnswers.filter(
        (item) => item.attempt_id != attemptId
      );
      localStorage.setItem("userAnswers", JSON.stringify(existingAnswers));

      router.push(`/ujian/${attemptId}`);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Button onClick={restartExam} variant={"destructive"} className="w-fit">
      Ulangi Ujian
    </Button>
  );
}
