"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function FormAddPackage() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size={"sm"}>
          <Plus /> Tambah
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>Tambah Paket Soal</DialogTitle>
          <DialogDescription>Isi data lalu klik simpan.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Nama Paket</Label>
            <Input value="" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Deskripsi</Label>
            <Textarea rows={4} value="" className="col-span-3" />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Simpan</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
