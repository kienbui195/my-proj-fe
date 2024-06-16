"use client";

import CountdownTimer from "@/components/CountdownTimer";
import CustomPagination from "@/components/CustomPagination";
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
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import apis from "@/lib/apis";
import {
  CheckCheck,
  CircleCheck,
  CircleX,
  Frown,
  Info,
  Lightbulb,
  Sigma,
} from "lucide-react";
import { usePathname, useSearchParams } from "next/navigation";
import * as React from "react";

interface IResponseReason {
  id: string;
  title: string;
  value: string;
}

const RESPONSE_REASON: IResponseReason[] = [
  {
    id: "r1",
    title: "Lỗi chính tả",
    value: "r1",
  },
  {
    id: "r2",
    title: "Sai hình ảnh",
    value: "r2",
  },
  {
    id: "r3",
    title: "Sai câu hỏi",
    value: "r3",
  },
  {
    id: "r4",
    title: "Sai đáp án",
    value: "r4",
  },
];

export interface IAnswer {
  id: number;
  content: string;
  desc: string;
  is_correct: boolean;
}

export interface IQuestion {
  id: number;
  attributes: {
    question: string;
    paralyzed_point: boolean;
    images: {
      data?: {
        id: number;
        attributes: {
          url: string;
        };
      };
    };
    answers: IAnswer[];
  };
}

export interface IMyAnswers {
  quesId: number;
  answerId: number;
}

const RandomLesson = () => {
  const [pause, setPause] = React.useState<boolean>(true);
  const searchParams = useSearchParams();
  const page = searchParams.get("page") ?? 1;
  const pathname = usePathname();
  const [ques, setQues] = React.useState<IQuestion[]>([]);
  const [myAnswers, setMyAnswers] = React.useState<IMyAnswers[]>([]);
  const [statistical, setStatistical] = React.useState({
    correctAnswer: 0,
    wrongAnswer: 0,
    notAnswer: 0,
  });
  const [alertDialog, setAlertDialog] = React.useState({
    open: false,
    title: "",
    content: "",
    onNext: () => {},
  });
  const [showResult, setShowResult] = React.useState(false);

  const renderStatisticalItem = (icon?: React.ReactNode, total: number = 0) => {
    return (
      <div className="bg-white p-2 flex flex-row space-x-2 items-center">
        {icon}
        <div>{total}</div>
      </div>
    );
  };

  const handleSubmit = () => {
    setShowResult(true);
  };

  const handleFindIdOfCorrectAnswer = (quesIdx: number) => {
    const listAnswers = ques[quesIdx].attributes.answers;

    return listAnswers.find((item) => item.is_correct)?.id ?? 0;
  };

  const handleChangeValue = (value: string) => {
    let updateData = [...myAnswers];
    updateData[+page - 1].answerId = +value;
    setMyAnswers(updateData);
  };

  const checkPassPPQuestions = () => {
    const ppQ = ques.filter((item) => item.attributes.paralyzed_point === true);

    const ansPP = myAnswers.reduce((acc: IMyAnswers[], item: IMyAnswers) => {
      const quesIdx = ques.findIndex((_i) => item.quesId === _i.id);
      const correctAns = handleFindIdOfCorrectAnswer(quesIdx);
      if (item.answerId === correctAns) {
        acc.push(item);
      }

      return acc;
    }, []);

    return ppQ.length === ansPP.length;
  };

  React.useEffect(() => {
    setStatistical((prev) => {
      let notAnswer = myAnswers.filter((item) => item.answerId === 0).length;
      let correctAnswer = myAnswers.filter(
        (item, idx) =>
          item.answerId > 0 &&
          item.answerId === handleFindIdOfCorrectAnswer(idx)
      ).length;
      let wrongAnswer = myAnswers.filter(
        (item, idx) =>
          item.answerId > 0 &&
          item.answerId !== handleFindIdOfCorrectAnswer(idx)
      ).length;

      return {
        ...prev,
        notAnswer,
        correctAnswer,
        wrongAnswer,
      };
    });
  }, [myAnswers]);

  React.useEffect(() => {
    const handleGetQues = () => {
      apis
        .get("dl-questions", {
          populate: {
            images: {
              fields: ["url"],
            },
            answers: "*",
          },
        })
        .then((res) => {
          const { data } = res.data;
          setQues(data);
          setMyAnswers(() =>
            data.reduce((acc: IMyAnswers[], item: any) => {
              acc.push({
                quesId: item.id,
                answerId: 0,
              });
              return acc;
            }, [])
          );
        })
        .catch((err) => {
          console.log("get question", err);
        });
    };

    handleGetQues();
  }, []);

  return (
      <section className="w-full">
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Đề ngẫu nhiên</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-stretch space-y-2">
            <section className="bg-green-200 flex flex-col space-y-2 p-2">
              <div className="flex flex-row justify-between items-center space-x-2">
                <Button variant={"outline"} onClick={() => setPause(false)}>
                  Bắt đầu làm bài
                </Button>
                <CustomPagination totalPage={ques.length} />

                <div className="flex items-center space-x-2">
                  <CountdownTimer
                    duration={1320}
                    onComplete={() => {
                      setAlertDialog((prev) => ({
                        ...prev,
                        open: true,
                        title: "Đã hết giờ!",
                        content:
                          "Đã hết giờ làm bài, ấn tiếp tục để kiểm tra kết quả của bạn.",
                      }));

                      setPause(true);
                    }}
                    pause={pause}
                  />
                  <Popover>
                    <PopoverTrigger>
                      <Frown className="w-6 h-6 cursor-pointer" />
                    </PopoverTrigger>
                    <PopoverContent>
                      <RadioGroup defaultValue={RESPONSE_REASON[0].value}>
                        {RESPONSE_REASON.map((_i, idx) => {
                          const { id, title, value } = _i;

                          return (
                            <div
                              key={idx}
                              className="flex items-center space-x-2"
                            >
                              <RadioGroupItem id={id} value={value} />
                              <Label htmlFor={id}>{title}</Label>
                            </div>
                          );
                        })}
                      </RadioGroup>
                    </PopoverContent>
                  </Popover>
                  <CheckCheck
                    className="w-6 h-6 cursor-pointer"
                    onClick={() =>
                      setAlertDialog((prev) => ({
                        ...prev,
                        open: true,
                        title: "Bạn muốn nộp bài?",
                        content:
                          " Hãy kiểm tra lại và chắc chắn đã tích toàn bộ các câu trả lời để có thể đạt được điểm tối đa.",
                      }))
                    }
                  />
                </div>
              </div>
              <div className="p-2 flex flex-row items-center justify-between">
                {renderStatisticalItem(
                  <Sigma className="w-4 h-4" />,
                  ques.length
                )}{" "}
                {renderStatisticalItem(
                  <CircleCheck className="w-4 h-4" />,
                  statistical.correctAnswer
                )}{" "}
                {renderStatisticalItem(
                  <CircleX className="w-4 h-4" />,
                  statistical.wrongAnswer
                )}{" "}
                {renderStatisticalItem(
                  <Info className="w-4 h-4" />,
                  statistical.notAnswer
                )}
              </div>
            </section>
            {!pause && (
              <section className="bg-green-200 p-4 flex flex-col space-y-4">
                <div
                  className={`font-bold ${
                    ques[+page - 1].attributes.paralyzed_point
                      ? "text-red-500"
                      : "text-black"
                  }`}
                >
                  {`Q: ${ques[+page - 1].attributes.question}`}
                </div>
                <div>
                  <RadioGroup
                    onValueChange={(val) => handleChangeValue(val)}
                    value={`${myAnswers[+page - 1].answerId}`}
                  >
                    {ques[+page - 1].attributes.answers.length > 0 &&
                      ques[+page - 1].attributes.answers.map((_answer, idx) => (
                        <div
                          className={`flex flex-row items-center space-x-2 ${
                            myAnswers[+page - 1].answerId !== 0
                              ? myAnswers[+page - 1].answerId === _answer.id
                                ? _answer.is_correct
                                  ? "text-green-500 font-semibold"
                                  : "text-red-500 font-semibold"
                                : "text-black"
                              : "text-black"
                          }`}
                          key={idx}
                        >
                          <RadioGroupItem
                            value={`${_answer.id}`}
                            id={`_answer_${_answer.id}`}
                          />
                          <Label htmlFor={`_answer_${_answer.id}`}>
                            {_answer.content}
                          </Label>
                        </div>
                      ))}
                  </RadioGroup>
                  {myAnswers[+page - 1].answerId !== 0 && (
                    <div
                      className={`${
                        ques[+page - 1].attributes.answers.find(
                          (item) => item.id === myAnswers[+page - 1].answerId
                        )?.desc
                          ? "flex"
                          : "hidden"
                      } flex-col space-y-1 mt-2 bg-yellow-100 p-2`}
                    >
                      <div className="flex flex-row items-center space-x-2">
                        <Lightbulb className="w-4 h-4" />
                        <span>Hint</span>
                      </div>
                      <div className="">
                        {" "}
                        {
                          ques[+page - 1].attributes.answers.find(
                            (item) => item.id === myAnswers[+page - 1].answerId
                          )?.desc
                        }
                      </div>
                    </div>
                  )}
                </div>
              </section>
            )}
          </CardContent>
        </Card>

        {showResult && (
          <Card className="w-full">
            <CardHeader>Kết quả</CardHeader>
            <CardContent className="p-2">
              <div>{`Trả lời đúng: ${statistical.correctAnswer}/${ques.length}`}</div>
              <div className="text-2xl font-bold">
                <>
                  {" "}
                  {checkPassPPQuestions()
                    ? "Bạn đã trượt vì không trả lời đúng hết tất cả các câu điểm liệt"
                    : statistical.correctAnswer > 31
                    ? "Bạn đã đạt"
                    : "Bạn đã trượt"}
                </>
              </div>
            </CardContent>
          </Card>
        )}
        <AlertDialog
          open={alertDialog.open}
          onOpenChange={(open) => setAlertDialog((prev) => ({ ...prev, open }))}
        >
          <AlertDialogTrigger></AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>{alertDialog.title}</AlertDialogTitle>
              <AlertDialogDescription>
                {alertDialog.content}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleSubmit}>
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </section>
  );
};

export default RandomLesson;
