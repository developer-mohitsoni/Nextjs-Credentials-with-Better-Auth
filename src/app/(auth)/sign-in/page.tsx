"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
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
import { signInFormSchema } from "@/lib/auth-schema";
import { authClient } from "@/lib/auth-client";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

const SignIn = () => {
  const router = useRouter(); // Initialize the router
  const form = useForm<z.infer<typeof signInFormSchema>>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof signInFormSchema>) {
    const { email, password } = values;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { data, error } = await authClient.signIn.email(
      {
        email,
        password,
        callbackURL: "/dashboard",
      },
      {
        onRequest: () => {
          toast({
            title: "Please wait...",
          });
        },
        onSuccess: () => {
          form.reset();
          router.push("/dashboard"); // Use router.push for navigation
        },
        onError: (ctx) => {
          alert(ctx.error.message);
        },
      }
    );
  }
  return (
    <>
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Sign In</CardTitle>
          <CardDescription>
            Welcome back! Please sign in to continue
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="john@email.com" {...field} />
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
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Enter your password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button className="w-full" type="submit">
                Submit
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex justify-center gap-1.5">
          <p className="text-sm text-muted-foreground">
            Don't have an account yet?
          </p>
          <Link href="/sign-up" className="text-primary hover:underline">
            Sign Up
          </Link>
        </CardFooter>
      </Card>
    </>
  );
};

export default SignIn;
