"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useIsSubmitStore, UserAnswers } from "./Body";
import axiosApi from "@/lib/axios";

interface TimerProps {
  startTime: string;
  endTime: string;
  attemptId: number;
}

export default function Timer({ startTime, endTime, attemptId }: TimerProps) {
  const [timeLeft, setTimeLeft] = useState<string>("00:00:00");
  const [totalDuration, setTotalDuration] = useState<string>("00:00:00");
  const [isCritical, setIsCritical] = useState<boolean>(false);
  const router = useRouter();

  const { isSubmit, updateIsSubmit } = useIsSubmitStore();

  const endExam = async () => {
    let localAllUserAnswers: UserAnswers[] = JSON.parse(
      localStorage.getItem("userAnswers") ?? "[]"
    );
    const localUserAnswers = localAllUserAnswers.filter(
      (item) => item.attempt_id === attemptId
    );

    const data = {
      userAnswers: localUserAnswers,
      attemptId: attemptId,
    };

    try {
      await axiosApi.post("/ujian/store", data);

      localAllUserAnswers = localAllUserAnswers.filter(
        (item) => item.attempt_id !== attemptId
      );
      localStorage.setItem("userAnswers", JSON.stringify(localAllUserAnswers));

      router.replace(`/ujian/${attemptId}/skor`);
    } catch (error) {
      console.log(error);
      throw new Error("Something went wrong broo!");
    } finally {
      setTimeout(() => {
        updateIsSubmit(false);
      }, 1000);
    }
  };

  useEffect(() => {
    const calculateTime = () => {
      const now = new Date().getTime();
      const start = new Date(startTime).getTime();
      const end = new Date(endTime).getTime();

      const difference = end - now;
      const totalDifference = end - start;

      // Hitung durasi total
      if (totalDifference > 0) {
        const totalHours = Math.floor(
          (totalDifference / (1000 * 60 * 60)) % 24
        );
        const totalMinutes = Math.floor((totalDifference / (1000 * 60)) % 60);
        const totalSeconds = Math.floor((totalDifference / 1000) % 60);

        setTotalDuration(
          `${String(totalHours).padStart(2, "0")}:${String(
            totalMinutes
          ).padStart(2, "0")}:${String(totalSeconds).padStart(2, "0")}`
        );
      } else {
        setTotalDuration("00:00:00");
      }

      // Hitung waktu tersisa
      if (difference < 0) {
        setTimeLeft("00:00:00");
        setIsCritical(true);
        updateIsSubmit(true);
        return;
      }

      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / (1000 * 60)) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      setTimeLeft(
        `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
          2,
          "0"
        )}:${String(seconds).padStart(2, "0")}`
      );

      // Periksa apakah waktu tinggal 5 menit atau kurang
      setIsCritical(difference <= 5 * 60 * 1000);
    };

    calculateTime();
    const timerInterval = setInterval(calculateTime, 1000);

    return () => clearInterval(timerInterval);
  }, [startTime, endTime, router]);

  useEffect(() => {
    if (isSubmit) {
      endExam();
    }
  }, [isSubmit]);

  return (
    <div
      className={`relative group flex items-center justify-center gap-4 px-3 py-1.5 rounded border 
        ${
          isCritical
            ? "bg-red-50 border-red-200"
            : "bg-green-50 border-green-200"
        }`}
    >
      {/* Waktu tersisa */}
      <span
        className={`font-mono text-lg ${
          isCritical
            ? "text-red-600 animate-pulse duration-1000"
            : "text-green-600"
        }`}
      >
        {timeLeft}
      </span>

      {/* Durasi total (hidden by default, shown on hover) */}
      <span
        className="bg-white px-3 py-2 border absolute opacity-0 group-hover:opacity-100 group-hover:scale-100 scale-90 transition-all duration-200 font-mono text-sm text-gray-600"
        style={{ top: "100%", marginTop: "4px" }}
      >
        <span className="text-[11px]">Durasi:</span> <br />
        <span className="text-green-600">{totalDuration}</span>
      </span>
    </div>
  );
}
