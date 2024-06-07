"use client";

import * as React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import InputPassword from "@/components/InputPassword";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { useDispatch } from "react-redux";
import { updateUser } from "@/lib/features/authSlice";
import apis from "@/lib/apis";

const formSchema = z.object({
  email: z.string().email({
    message: "Invalid email!",
  }),
  password: z.string().min(6, {
    message: "Username must be at least 6 characters.",
  }),
});

const SignIn = () => {
  const router = useRouter();
  const { toast } = useToast();
  const dispatch = useDispatch();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const { email, password } = values;

    apis
      .login({ email, password })
      .then((res) => {
        toast({
          title: "Login",
          description: "Well done",
        });
        localStorage.setItem(
          "KDEV_USER",
          JSON.stringify({
            id: res.data.user.id,
            email: res.data.user.email,
            username: res.data.user.username,
            token: res.data.jwt,
          })
        );
        dispatch(
          updateUser([
            {
              fieldName: "id",
              value: res.data.user.id,
            },
            {
              fieldName: "username",
              value: res.data.user.username,
            },
            {
              fieldName: "email",
              value: res.data.user.email,
            },
            {
              fieldName: "token",
              value: res.data.jwt,
            },
            {
              fieldName: "role",
              value: res.data.user.user_role,
            },
          ])
        );
        router.push("/");
      })
      .catch((err) => {
        toast({
          title: "Login",
          description: "Something went wrong! " + err.message,
          variant: "destructive",
        });
      });
  };

  return (
    <section className="w-full h-[80vh] flex  ">
      <Card className="sm:w-[40vw] w-full mx-4 m-auto">
        <CardHeader>
          <CardTitle>Sign In</CardTitle>
          <CardDescription>Create a account</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Email<span className="text-red-500 ml-1">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        required
                        placeholder="example@gmail.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Password<span className="text-red-500 ml-1">*</span>
                    </FormLabel>
                    <FormControl>
                      <InputPassword required placeholder="******" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button className="mt-6 w-full" type="submit">
                Submit
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </section>
  );
};

export default SignIn;
