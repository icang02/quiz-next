"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function ButtonDeleteQuestion({
  packageId,
}: {
  packageId: number;
}) {
  const router = useRouter();

  const handleDelete = async (id: number) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API}/admin/question/${id}/destroy`,
      { method: "DELETE" }
    );
    const data = await response.json();

    toast(data.message, {
      description: Date(),
      action: {
        label: "Tutup",
        onClick: () => "",
      },
    });
    router.refresh();
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild={true}>
        <Button variant={"destructive"} size={"sm"}>
          <Trash />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Hapus data?</AlertDialogTitle>
          <AlertDialogDescription>
            <b>Perhatian!</b> Pernyataan ini akan dihapus. Klik tombol di bawah
            untuk melanjutkan.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction asChild={true}>
            <Button onClick={() => handleDelete(packageId)}>Hapus</Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
