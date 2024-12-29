import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import {
  useCurrentQuestionStore,
  useNumberQuestionStore,
  UserAnswers,
  useSelectedAnswerIdStore,
  useUserAnswersStore,
} from "./Body";
import { Question } from "@/lib/types";
import { useRouter } from "next/navigation";
import { useState } from "react";
import axiosApi from "@/lib/axios";

export default function Content({
  attemptId,
  questions,
}: {
  attemptId: number;
  questions: Question[];
}) {
  const router = useRouter();

  const { currentQuestion, updateCurrentQuestion } = useCurrentQuestionStore();
  const { selectedAnswerId, updateSelectedAnswerId } =
    useSelectedAnswerIdStore();
  const { updateUserAnswers } = useUserAnswersStore();
  const { numberQuestion, updateNumber } = useNumberQuestionStore();
  const { userAnswers } = useUserAnswersStore();

  const [loading, setLoading] = useState(false);

  const submitAnswer = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newAnswer: {
      attempt_id: number;
      question_id: number;
      answer_id: string;
    } = {
      attempt_id: attemptId,
      question_id: currentQuestion.id,
      answer_id: selectedAnswerId ?? "",
    };

    // Ambil data lama dari localStorage
    const existingAnswers: UserAnswers[] = JSON.parse(
      localStorage.getItem("userAnswers") ?? "[]"
    );

    // Cari indeks dari question_id yang sama
    const existingIndex = existingAnswers.findIndex(
      (answer) =>
        answer.attempt_id === attemptId &&
        answer.question_id === newAnswer.question_id
    );

    if (existingIndex !== -1) {
      existingAnswers[existingIndex] = newAnswer;
    } else {
      existingAnswers.push(newAnswer);
    }

    // Simpan kembali ke localStorage
    localStorage.setItem("userAnswers", JSON.stringify(existingAnswers));

    updateUserAnswers(
      existingAnswers.filter((item) => item.attempt_id == attemptId)
    );
    nextQuestion();
  };

  const nextQuestion = () => {
    // Find Index Current Question
    const indexQuestion = questions.findIndex(
      (q) => q.id == currentQuestion.id
    );
    // If Index Found and Question Length !== Number Question
    if (indexQuestion !== -1 && questions.length !== numberQuestion) {
      // Set Old Answer If Already
      let existingAnswers: UserAnswers[] = JSON.parse(
        localStorage.getItem("userAnswers") ?? "[]"
      );
      existingAnswers = existingAnswers.filter(
        (item) => item.attempt_id == attemptId
      );

      updateSelectedAnswerId(
        existingAnswers
          .find((item) => item.question_id == questions[numberQuestion].id)
          ?.answer_id.toString() || ""
      );

      updateCurrentQuestion(questions[indexQuestion + 1]);
      updateNumber(indexQuestion + 2);
    }
  };

  const endExam = async () => {
    let localAllUserAnswers: UserAnswers[] = JSON.parse(
      localStorage.getItem("userAnswers") ?? "[]"
    );
    const localUserAnswers = localAllUserAnswers.filter(
      (item) => item.attempt_id === attemptId
    );

    try {
      setLoading(true);
      await axiosApi.post("/ujian/store", {
        userAnswers: localUserAnswers,
      });

      localAllUserAnswers = localAllUserAnswers.filter(
        (item) => item.attempt_id !== attemptId
      );
      localStorage.setItem("userAnswers", JSON.stringify(localAllUserAnswers));

      router.replace(`/ujian/${attemptId}/skor`);
    } catch (error) {
      setLoading(false);
      console.log(error);
      throw new Error("Something went wrong broo!");
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-normal text-sm md:text-base select-none">
          {currentQuestion.question}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={submitAnswer} className="-mt-1.5">
          <RadioGroup className="w-fit">
            {currentQuestion.answers.map((item, index) => (
              <div className="flex items-center space-x-2" key={index}>
                <RadioGroupItem
                  onClick={() => updateSelectedAnswerId(item.id.toString())}
                  id={item.id.toString()}
                  value={item.id.toString()}
                  checked={item.id.toString() == selectedAnswerId}
                />
                <Label
                  htmlFor={item.id.toString()}
                  className="py-0.5 text-[13px] md:text-sm"
                >
                  <span className="leading-relaxed select-none">
                    {item.answer}
                  </span>
                </Label>
              </div>
            ))}
          </RadioGroup>

          <div className="mt-6 flex flex-col md:flex-row items-center justify-between select-none">
            <div>
              <Button
                disabled={!selectedAnswerId}
                type="submit"
                size={"sm"}
                className="bg-blue-600 hover:bg-blue-600/90 text-white text-[10px] md:text-xs uppercase tracking-wider"
              >
                Simpan dan Lanjutkan
              </Button>
              <Button
                disabled={questions.length === numberQuestion}
                onClick={nextQuestion}
                type="button"
                size={"sm"}
                className="ms-1.5 bg-yellow-600 hover:bg-yellow-600/90 text-white text-[10px] md:text-xs uppercase tracking-wider"
              >
                Lewatkan
              </Button>
            </div>

            {userAnswers.length === questions.length && (
              <div>
                <Button
                  disabled={loading}
                  onClick={endExam}
                  type="button"
                  size={"sm"}
                  variant="destructive"
                  className="mt-1.5 md:mt-0 text-[10px] md:text-xs uppercase tracking-wider"
                >
                  Akhiri Ujian
                </Button>
              </div>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
