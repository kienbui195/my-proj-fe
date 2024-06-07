"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { boolean, z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

const formSchema = z.object({
  question: z.string().min(10, {
    message: "Username must be at least 10 characters.",
  }),
  pp: z.boolean().default(false),
});

export interface IDLAnswer {
  content: string;
  desc?: string;
  correct_answer: boolean;
}

const DrivingLesson = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      question: "",
      pp: false,
    },
  });
  const [answers, setAnswers] = React.useState<IDLAnswer[]>([
    {
      content: "",
      correct_answer: false,
      desc: "",
    },
  ]);

  const handleChangeAnswer = ({
    fieldName,
    value,
    idx,
  }: {
    fieldName: string;
    value: string | boolean;
    idx: number;
  }) => {
    let data = [...answers];
    data[idx] = {
      ...data[idx],
      [fieldName]: value,
    };
    setAnswers(data);
  };

  const onSubmit = (values: z.infer<typeof formSchema>) => {};

  return (
    <section>
      <Tabs className="w-full">
        <TabsList className="">
          <TabsTrigger value="add-question">Add Question</TabsTrigger>
          <TabsTrigger value="statistical">Statistical</TabsTrigger>
        </TabsList>
        <TabsContent value="add-question" className="py-4 px-2">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <Button className="bg-cyan-500 w-full" type="submit">
                Add
              </Button>
              <FormField
                control={form.control}
                name="question"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Question<span className="text-red-500 ml-1">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        required
                        placeholder="Type a question"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {answers.map((_i, idx) => {
                return (
                  <div key={idx}>
                    <div className="py-2">
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center justify-between">
                          <div className="font-semibold">
                            {idx + 1}. Answer:
                          </div>
                          <div className="flex items-center space-x-2">
                            <Switch
                              checked={_i.correct_answer}
                              onCheckedChange={(val) => {
                                let data = [...answers];
                                data.reduce(
                                  (acc: IDLAnswer[], item: IDLAnswer) => {
                                    if (item.correct_answer)
                                      item.correct_answer = false;
                                    return acc;
                                  },
                                  []
                                );
                                setAnswers(data);
                                handleChangeAnswer({
                                  fieldName: "correct_answer",
                                  value: val,
                                  idx,
                                });
                              }}
                              id={`${idx}_answers`}
                            />
                            <Label htmlFor={`${idx}_answers`}>
                              Correct Answer?
                            </Label>
                          </div>
                        </div>
                        <Input
                          value={_i.content}
                          onChange={(e) => {
                            handleChangeAnswer({
                              fieldName: "content",
                              value: e.target.value,
                              idx,
                            });
                          }}
                          placeholder="Type a answer"
                        />
                        <Input
                          value={_i.desc}
                          onChange={(e) =>
                            handleChangeAnswer({
                              fieldName: "desc",
                              value: e.target.value,
                              idx,
                            })
                          }
                          placeholder="Explain for this answer?"
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
              <Button
                type="button"
                variant={"outline"}
                className="w-full mt-2"
                onClick={() =>
                  setAnswers((prev) => [
                    ...prev,
                    {
                      content: "",
                      desc: "",
                      correct_answer: false,
                    },
                  ])
                }
              >
                +
              </Button>
            </form>
          </Form>
        </TabsContent>
      </Tabs>
    </section>
  );
};

export default DrivingLesson;
