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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import InputPassword from "@/components/InputPassword";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import apis from "@/lib/apis";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Invalid email!",
  }),
  password: z.string().min(6, {
    message: "Username must be at least 6 characters.",
  }),
  user_role: z.enum(["admin", "user"]).default("user"),
});

const SignUp = () => {
  const [repass, setRepass] = React.useState("");
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      user_role: "user",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const { username, email, password, user_role } = values;
    if (password !== repass) return;

    apis
      .register({
        username,
        password,
        email,
        role: user_role,
      })
      .then((res) => {
        toast({
          title: "Register",
          description: "Well done",
        });
        router.push("/sign-in");
      })
      .catch((err) => {
        toast({
          title: "Register",
          description: "Something went wrong! " + err.message,
          variant: "destructive",
        });
      });
  };

  return (
    <section className="w-full h-[80vh] flex  ">
      <Card className="sm:w-[40vw] w-full mx-4 m-auto">
        <CardHeader>
          <CardTitle>Sign Up</CardTitle>
          <CardDescription>Create a account</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Username<span className="text-red-500 ml-1">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input required placeholder="@username" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
                name="user_role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Your Role<span className="text-red-500 ml-1">*</span>
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a role" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="admin">Admin</SelectItem>
                        <SelectItem value="user">User</SelectItem>
                      </SelectContent>
                    </Select>
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
              <FormField
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Re Password</FormLabel>
                    <FormControl>
                      <InputPassword
                        required
                        placeholder="******"
                        value={repass}
                        onChange={(e: any) => setRepass(e.target.value)}
                      />
                    </FormControl>
                    {repass !== field.value && (
                      <FormMessage>Not match</FormMessage>
                    )}
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

export default SignUp;
