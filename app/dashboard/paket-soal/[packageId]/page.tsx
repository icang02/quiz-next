import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Package } from "@/lib/types";
import {
  ArrowDownUp,
  ArrowUpDown,
  EllipsisVertical,
  FilePenLine,
  Plus,
} from "lucide-react";
import Link from "next/link";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AnswerHide from "@/components/AnswerHide";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import ButtonDeletePackage from "@/components/ButtonDeletePackage";
import ButtonDeleteQuestion from "@/components/ButtonDeleteQuestion";
import FormEditPackage from "@/components/DashboardPaketSoal/FormEditPackage";
import { Separator } from "@/components/ui/separator";

type Params = Promise<{ packageId: string }>;

export default async function page({ params }: { params: Params }) {
  const { packageId } = await params;
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API}/admin/package/${packageId}`
  );
  const data = await response.json();
  const pkg: Package = data.data;

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
              <BreadcrumbPage>Data Paket</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="flex h-5 items-center space-x-4 text-sm">
          <Button size={"sm"}>
            <Plus /> Tambah Soal
          </Button>
          <Separator orientation="vertical" />
          <div className="flex space-x-1">
            <FormEditPackage
              id={pkg.id}
              name={pkg.name}
              description={pkg.description}
            />
            <ButtonDeletePackage packageId={pkg.id} />
          </div>
        </div>
      </div>

      <div className="mt-7">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              {pkg.name}

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <EllipsisVertical className="cursor-pointer" />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>Filter</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem>
                      <ArrowUpDown />
                      <span>Ascending</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <ArrowDownUp />
                      <span>Descending</span>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableCaption>List soal {pkg.name}</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">#</TableHead>
                  <TableHead>Soal</TableHead>
                  <TableHead>Jawaban</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pkg.questions.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{index + 1}</TableCell>
                    <TableCell>{item.question}</TableCell>
                    <TableCell>
                      <AnswerHide
                        index={index}
                        answer={
                          item.answers.find((a) => a.is_correct)?.answer || null
                        }
                      />
                    </TableCell>
                    <TableCell className="text-right text-nowrap">
                      <Button variant={"warning"} size={"sm"} className="me-1">
                        <FilePenLine />
                      </Button>
                      <ButtonDeleteQuestion packageId={item.id} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
