import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Question } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { ChangeEventHandler } from "react";

export default function Content({
  currentQuestion,
  selectedAnswerId,
  setSelectedAnswerId,
}: {
  currentQuestion: Question;
  selectedAnswerId: string;
  setSelectedAnswerId: (value: string) => void;
}) {
  const handleChangeOption: ChangeEventHandler<HTMLInputElement> = (e) => {
    setSelectedAnswerId(e.target.value);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-normal text-sm md:text-base select-none">
          {currentQuestion.question}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form className="-mt-1.5">
          <RadioGroup onChange={handleChangeOption} className="w-fit">
            {currentQuestion.answers.map((item, index) => (
              <div className="flex items-center space-x-2" key={index}>
                <RadioGroupItem
                  id={item.id.toString()}
                  value={item.id.toString()}
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

          <div className="mt-6 flex flex-col md:flex-row justify-between select-none">
            <div>
              <Button
                disabled={selectedAnswerId.length === 0}
                type="submit"
                size={"sm"}
                className="bg-blue-600 hover:bg-blue-600/90 text-white text-[10px] md:text-xs uppercase tracking-wider"
              >
                Simpan dan Lanjutkan
              </Button>
              <Button
                type="button"
                size={"sm"}
                className="ms-1.5 bg-yellow-600 hover:bg-yellow-600/90 text-white text-[10px] md:text-xs uppercase tracking-wider"
              >
                Lewatkan
              </Button>
            </div>

            {/* <div>
              <Button
                type="button"
                size={"sm"}
                variant="destructive"
                className="mt-1.5 md:mt-0 text-[10px] md:text-xs uppercase tracking-wider"
              >
                Akhiri Ujian
              </Button>
            </div> */}
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
