"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ApiResponse } from "@/types/ApiResponse";
import { useForm } from "react-hook-form";
import * as z from "zod";
import axios from "axios";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { signInSchema } from "@/schemas/signInSchema";

export default function SignInForm() {
  const router = useRouter();

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { toast } = useToast();

  const onSubmit = async (data: z.infer<typeof signInSchema>) => {
    try {
      const response = await axios.post<ApiResponse>("/api/sign-in", data);
      router.push("/dashboard");
    } catch (error: any) {
      console.error("Error:", error);
      toast({
        title: "Login Failed",
        description: error.response?.data?.message || error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-black">
      <div className="w-full max-w-md p-8 space-y-8 bg-teal-900 rounded-lg shadow-lg">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-teal-500 lg:text-5xl mb-6">
            Welcome Back to True Feedback
          </h1>
          <p className="mb-4 text-teal-300">
            Sign in to continue your secret conversations
          </p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-teal-300">Email</FormLabel>
                  <Input
                    {...field}
                    className="bg-teal-800 border-teal-600 text-teal-300"
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-teal-300">Password</FormLabel>
                  <Input
                    type="password"
                    {...field}
                    className="bg-teal-800 border-teal-600 text-teal-300"
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="w-full bg-teal-600 hover:bg-teal-500 text-black font-bold py-2 px-4 rounded">
              Sign In
            </Button>
          </form>
        </Form>
        <div className="text-center mt-8">
          <p className="text-lg text-black bg-teal-300 p-4 rounded-md">
            Not a member yet?{" "}
            <Link
              href="/sign-up"
              className="text-black font-bold underline hover:text-teal-700"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
