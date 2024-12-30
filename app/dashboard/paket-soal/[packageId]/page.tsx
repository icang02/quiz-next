import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
// import { Card, CardHeader, CardTitle } from "@/components/ui/card";
// import { CircleHelp, Clock } from "lucide-react";
import Link from "next/link";

export default function page() {
  return (
    <>
      <div className="flex items-center justify-between">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild={true}>
                <Link href={"/dashboard"}>Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild={true}>
                <Link href={"/dashboard/paket-soal"}>Paket Soal</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>
                Pranata Komputer - Ahli Pertama (Part 1)
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <Button size={"sm"}>
          <Plus /> Tambah
        </Button>
      </div>

      <div className="mt-7">Hello World</div>
    </>
  );
}
