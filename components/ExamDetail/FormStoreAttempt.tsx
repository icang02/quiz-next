"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useNumberQuestionStore } from "../Exam/Body";
import { useState } from "react";
import axiosApi from "@/lib/axios";

const formSchema = z.object({
  user_name: z
    .string()
    .min(3, {
      message: "Masukkan minimal 3 karakter.",
    })
    .max(50, "Maksimal 50 karakter."),
  package_id: z.number(),
});

export default function FormStoreAttempt({ attemptId }: { attemptId: number }) {
  const router = useRouter();

  const { updateNumber } = useNumberQuestionStore();
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      user_name: "",
      package_id: attemptId,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setLoading(true);
      const response = await axiosApi.post("/attempt/store", values);
      updateNumber(1);
      router.replace(`/ujian/${response.data.data.id}`);
    } catch (error) {
      setLoading(false);
      console.log(error);
      throw new Error("Something went wrong broo!");
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="user_name"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="Nama lengkap"
                  {...field}
                  autoComplete="off"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-between">
          <Link href="/">
            <Button type="button">Kembali</Button>
          </Link>
          <Button disabled={loading} variant={"destructive"} type="submit">
            Mulai Ujian
          </Button>
        </div>
      </form>
    </Form>
  );
}
