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
import apis from "@/lib/apis";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { Trash2 } from "lucide-react";

const formSchema = z.object({
  question: z.string().min(10, {
    message: "Username must be at least 10 characters.",
  }),
  pp: z.boolean().default(false),
});

export interface IDLAnswer {
  content: string;
  desc?: string;
  is_correct: boolean;
}

interface ICateSate {
  id: number;
  attributes: {
    title: string;
    slug: string;
  };
}

interface ICate {
  list: ICateSate[];
  item?: ICateSate;
}

const DrivingLesson = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      question: "",
      pp: false,
    },
  });
  const initAnswer: IDLAnswer = {
    content: "",
    is_correct: false,
    desc: "",
  };
  const [answers, setAnswers] = React.useState<IDLAnswer[]>([initAnswer]);
  const [categories, setCategories] = React.useState<ICate>({
    list: [],
    item: undefined,
  });
  const imageRef = React.useRef<HTMLInputElement>(null);
  const { toast } = useToast();

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

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    let imageId = 0;

    if (imageRef.current) {
      const rawData = imageRef.current.files;

      if (rawData && rawData.length > 0) {
        const dataImage = await apis.upload(
          rawData[0],
          values.question.trim().slice(0, 100)
        );

        imageId = dataImage.data[0].id;
      }
    }

    apis
      .post(`dl-questions`, {
        data: {
          question: values.question,
          paralyzed_point: values.pp,
          ...(categories.item ? { category: categories.item.id } : {}),
          ...(imageId ? { images: imageId } : {}),
          answers,
        },
      })
      .then((res) => {
        toast({
          description: "create question successfully!",
        });
        setAnswers([initAnswer]);
        setCategories((prev) => ({
          ...prev,
          item: undefined,
        }));
        form.reset({
          pp: false,
          question: "",
        });
      })
      .catch((err) => {
        console.log("create-question", err.message);
        toast({
          description: "Oops, something went wrong!",
          variant: "destructive",
        });
      });
  };

  React.useEffect(() => {
    const handleGetCategories = () => {
      apis
        .get("dl-ques-categories")
        .then((res) => {
          setCategories((prev) => ({ ...prev, list: res.data.data }));
        })
        .catch((err) => console.log("get categories", err.message));
    };

    handleGetCategories();
  }, []);

  return (
    <section>
      <Tabs className="w-full" defaultValue="add-question">
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
              <FormField
                name="question"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Image</FormLabel>
                    <FormControl>
                      <Input
                        ref={imageRef}
                        type="file"
                        accept=".jpeg, .png"
                        placeholder="Accept JPEG, PNG"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="pp"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="flex items-center space-x-2">
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          id={`question`}
                        />
                        <Label htmlFor={`question`}>Paralyzed Point</Label>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Select
                onValueChange={(value) =>
                  setCategories((prev) => ({
                    ...prev,
                    item: categories.list.find((item) => item.id === +value),
                  }))
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a category for this question" />
                </SelectTrigger>
                <SelectContent>
                  {categories.list.map((_cate, idx) => {
                    return (
                      <SelectItem key={idx} value={`${_cate.id}`}>
                        {_cate?.attributes?.title}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
              {answers.map((_i, idx) => {
                return (
                  <div key={idx}>
                    <div className="py-2">
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center justify-between">
                          <div className="font-semibold">
                            {idx + 1}. Answer:
                          </div>
                          <div className="flex flex-row items-center gap-2">
                            <div className="flex items-center space-x-2">
                              <Switch
                                checked={_i.is_correct}
                                onCheckedChange={(val) => {
                                  let data = [...answers];
                                  data.reduce(
                                    (acc: IDLAnswer[], item: IDLAnswer) => {
                                      if (item.is_correct)
                                        item.is_correct = false;
                                      return acc;
                                    },
                                    []
                                  );
                                  setAnswers(data);
                                  handleChangeAnswer({
                                    fieldName: "is_correct",
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
                            {idx !== 0 && (
                              <Trash2
                                className="w-6 h-6 cursor-pointer"
                                onClick={() => {
                                  let updateData = [...answers];
                                  updateData.splice(idx, 1);
                                  setAnswers(updateData);
                                }}
                              />
                            )}
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
                onClick={() => setAnswers((prev) => [...prev, initAnswer])}
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
