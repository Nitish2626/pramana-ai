"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import logo from "@/../public/logo.svg";
import Image from "next/image";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import ButtonLoading from "@/components/custom/ButtonLoading";
import { F_LOGIN } from "../../../../routes/appRoutes";
import { zodResolver } from "@hookform/resolvers/zod";
import { showToast } from "@/lib/toast";
import { LoginFormData } from "../login/page";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { zodSchema } from "@/types/zodSchema";

interface SignupFormdata extends LoginFormData {
  username: string;
}

const SignupPage = () => {
  const router = useRouter();

  const signupSchema = zodSchema.pick({
    username: true,
    email: true,
    password: true,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  // const [showOtpDialog, setShowOtpDialog] = useState(false);
  // const [signupData, setSignupData] = useState<SignupFormdata>({
  //   username: "",
  //   email: "",
  //   password: "",
  // });

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm<SignupFormdata>({
    resolver: zodResolver(signupSchema),
  });

  const handleSignup = async (signupData: SignupFormdata) => {
    try {
      setLoading(true);
      await authClient.signUp.email(
        {
          name: signupData.username, // required
          email: signupData.email, // required
          password: signupData.password, // required
        },
        {
          onSuccess(context) {
            // console.log("data", context.data);
            reset();
            showToast("success", "User created successfully!");
            router.push("/");
          },
          onError(context) {
            // console.log("error", context.error);
            showToast("error", context.error.message as string);
          },
        }
      );
    } catch (error) {
      console.log("SIGNUP ERROR", error);
      showToast("error", "Something went wrong !");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>
            <div className="flex items-center justify-center gap-2">
              {/* <Image src={logo} width={20} height={10} alt="logo" /> */}
              Signup
            </div>
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(handleSignup)}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="abc"
                  {...register("username")}
                />
                {errors.username && (
                  <p className="text-red-500 text-sm">
                    {errors.username.message as string}
                  </p>
                )}
              </div>

              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  {...register("email")}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">
                    {errors.email.message as string}
                  </p>
                )}
              </div>

              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <div className="flex w-full max-w-sm items-center">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="*******************"
                    {...register("password")}
                    className="border-r-0 rounded-tr-none rounded-br-none"
                  />
                  <Button
                    type="button"
                    variant="password"
                    className="cursor-pointer"
                    onClick={() => setShowPassword((prev) => !prev)}
                  >
                    {showPassword ? <EyeOff /> : <Eye />}
                  </Button>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-sm">
                    {errors.password.message as string}
                  </p>
                )}
              </div>

              <CardFooter className="flex-col gap-2">
                <ButtonLoading
                  type="submit"
                  loading={loading}
                  text="Signup"
                  styles={`w-full ${
                    loading ? "cursor-crosshair" : "cursor-pointer"
                  }`}
                />
                <CardDescription>
                  Already have an account ?
                  <Link
                    href={F_LOGIN}
                    className="ms-2 text-foreground font-semibold hover:underline hover:underline-offset-5"
                  >
                    Login
                  </Link>
                </CardDescription>
              </CardFooter>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* <OtpDialog
        open={showOtpDialog}
        setOpen={setShowOtpDialog}
        data={signupData}
        navigateTo="/auth/login"
        type={0}
      /> */}
    </>
  );
};

export default SignupPage;
