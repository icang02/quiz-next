import { Button } from "@/components/ui/button";
import { Question } from "@/lib/types";
import {
  useCurrentQuestionStore,
  useNumberQuestionStore,
  UserAnswers,
  useSelectedAnswerIdStore,
  useUserAnswersStore,
} from "./Body";
import { useEffect } from "react";

export default function Navigation({
  attemptId,
  questions,
}: {
  attemptId: number;
  questions: Question[];
}) {
  const { numberQuestion, updateNumber } = useNumberQuestionStore();
  const { updateCurrentQuestion } = useCurrentQuestionStore();
  const { updateSelectedAnswerId } = useSelectedAnswerIdStore();
  const { userAnswers, updateUserAnswers } = useUserAnswersStore();

  const handleChangeQuestion = (index: number) => {
    updateCurrentQuestion(questions[index]);
    updateNumber(index + 1);

    // Find Index Current Question
    const indexQuestion = questions.findIndex(
      (q) => q.id == questions[index]?.id
    );
    // If Index Found and Question Length !== Number Question
    if (indexQuestion !== -1 && questions.length + 1 !== numberQuestion) {
      // Set Old Answer If Already
      let existingAnswers: UserAnswers[] = JSON.parse(
        localStorage.getItem("userAnswers") ?? "[]"
      );
      existingAnswers = existingAnswers.filter(
        (item) => item.attempt_id == attemptId
      );

      updateSelectedAnswerId(
        existingAnswers
          .find((item) => item.question_id == questions[index].id)
          ?.answer_id.toString() || ""
      );
    }
  };

  useEffect(() => {
    const storedData = localStorage.getItem("userAnswers");
    let data = storedData ? JSON.parse(storedData) : [];
    data = data.filter((item: UserAnswers) => item.attempt_id == attemptId);

    updateUserAnswers(data);
  }, []);

  return (
    <div className="w-fuil md:w-1/4 bg-gray-50 p-3 md:p-4 border-b md:border-r">
      <h2 className="text-lg font-bold mb-4">Navigasi Soal</h2>
      <div className="grid grid-cols-6 md:grid-cols-5 gap-1">
        {questions.map((q, index) => (
          <Button
            onClick={() => handleChangeQuestion(index)}
            key={q.id}
            size={"sm"}
            variant={
              userAnswers.map((q) => q.question_id).includes(q.id)
                ? "success"
                : "destructive"
            }
            className={`${
              index === numberQuestion - 1 &&
              (userAnswers.some((ans) => ans.question_id === q.id)
                ? "bg-green-600/90"
                : "bg-destructive/90")
            } text-[10px] md:text-xs font-semibold select-none`}
          >
            {index + 1}
          </Button>
        ))}
      </div>
    </div>
  );
}
