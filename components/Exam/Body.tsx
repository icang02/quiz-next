"use client";
import React, { useEffect } from "react";
import Navigation from "./Navigation";
import Header from "./Header";
import Content from "./Content";
import { Attempt, Question } from "@/lib/types";
import { create } from "zustand";

// =====================================================================
type NumberQuestionStore = {
  numberQuestion: number;
  updateNumber: (numberQuestion: number) => void;
};

export const useNumberQuestionStore = create<NumberQuestionStore>((set) => ({
  numberQuestion: 1,
  updateNumber: (numberQuestion) => set(() => ({ numberQuestion })),
}));
// =====================================================================

type CurrentQuestionStore = {
  currentQuestion: Question;
  updateCurrentQuestion: (currentQuestion: Question) => void;
};

export const useCurrentQuestionStore = create<CurrentQuestionStore>((set) => ({
  currentQuestion: {
    id: 0,
    question: "Memuat soal...",
    answers: [],
  },
  updateCurrentQuestion: (currentQuestion) => set(() => ({ currentQuestion })),
}));
// =====================================================================

type SelectedAnswerIdStore = {
  selectedAnswerId: null | string;
  updateSelectedAnswerId: (selectedAnswerId: string) => void;
};

export const useSelectedAnswerIdStore = create<SelectedAnswerIdStore>(
  (set) => ({
    selectedAnswerId: null,
    updateSelectedAnswerId: (selectedAnswerId) =>
      set(() => ({ selectedAnswerId })),
  })
);
// =====================================================================

export type UserAnswers = {
  attempt_id: number;
  question_id: number;
  answer_id: number | string;
};

type UserAnswersStore = {
  userAnswers: UserAnswers[];
  updateUserAnswers: (userAnswers: UserAnswers[]) => void;
};

export const useUserAnswersStore = create<UserAnswersStore>((set) => ({
  userAnswers: [],
  updateUserAnswers: (userAnswers) => set(() => ({ userAnswers })),
}));
// =====================================================================

type IsSubmitStore = {
  isSubmit: boolean;
  updateIsSubmit: (isSubmit: boolean) => void;
};

export const useIsSubmitStore = create<IsSubmitStore>((set) => ({
  isSubmit: false,
  updateIsSubmit: (isSubmit) => set(() => ({ isSubmit })),
}));
// =====================================================================

export default function Body({ attempt }: { attempt: Attempt }) {
  const { numberQuestion } = useNumberQuestionStore();
  const { updateCurrentQuestion } = useCurrentQuestionStore();
  const { updateSelectedAnswerId } = useSelectedAnswerIdStore();

  const { isSubmit } = useIsSubmitStore();

  useEffect(() => {
    updateCurrentQuestion(attempt.package.questions[numberQuestion - 1]);

    let existingAnswers: UserAnswers[] = JSON.parse(
      localStorage.getItem("userAnswers") ?? "[]"
    );
    existingAnswers = existingAnswers.filter(
      (item) => item.attempt_id == attempt.id
    );

    const idQ = attempt.package.questions[numberQuestion - 1].id;
    const find = existingAnswers.find((item) => item.question_id == idQ);
    updateSelectedAnswerId(find?.answer_id.toString() ?? "");
  }, []);

  return (
    <>
      {isSubmit && (
        <div className="absolute z-50 pointer-events-none h-screen w-full bg-[rgba(0,0,0,0.7)] transition-all flex items-center justify-center">
          <span className="animate-pulse text-sm md:text-base text-white">
            Loading...
          </span>
        </div>
      )}
      <Navigation
        attemptId={attempt.id}
        questions={attempt.package.questions}
      />
      <div className="flex-1 p-3 md:p-6">
        <Header attempt={attempt} />
        <Content questions={attempt.package.questions} attemptId={attempt.id} />
      </div>
    </>
  );
}
