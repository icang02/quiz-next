"use client";

import { Attempt, Question } from "@/lib/types";
import Content from "./Content";
import Header from "./Header";
import Navigation from "./Navigation";
import { useEffect, useState } from "react";

export default function Body({ attempt }: { attempt: Attempt }) {
  const [numberQuestion, setNumberQuestion] = useState<number>(1);
  const [currentQuestion, setCurrentQuestion] = useState<Question>(
    attempt.package.questions[numberQuestion - 1]
  );

  const [selectedAnswerId, setSelectedAnswerId] = useState<string>("");

  return (
    <>
      <Navigation
        questions={attempt.package.questions}
      />
      <div className="flex-1 p-3 md:p-6">
        <Header
          numberQuestion={numberQuestion}
          packageName={attempt.package.name}
        />
        <Content
          currentQuestion={currentQuestion}
          selectedAnswerId={selectedAnswerId.toString()}
          setSelectedAnswerId={setSelectedAnswerId}
        />
      </div>
    </>
  );
}
