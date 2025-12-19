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
import { Eye, EyeOff, LogIn } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import ButtonLoading from "@/components/custom/ButtonLoading";
import { F_SIGNUP } from "../../../../routes/appRoutes";

type Formdata = {
  email: string;
  password: string;
};

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Formdata>();

  const handleLogin = async (data: Formdata) => {
    // try {
    //   setLoading(true);
    //   const responseData = await axios.post(B_LOGIN, data, {
    //     withCredentials: true,
    //   });
    //   console.log("login res", responseData);
    //   if (
    //     responseData.data.status === UNPROCESSABLE_ENTITY ||
    //     responseData.data.status === INTERNAL_SERVER_ERROR ||
    //     responseData.data.status === BAD_REQUEST
    //   ) {
    //     showToast("error", responseData.data.message);
    //     setLoading(false);
    //     return;
    //   }
    //   reset();
    //   router.push("/user/products");
    //   showToast("success", responseData.data.message);
    // } catch (error) {
    //   console.log("LOGIN ERROR", error);
    //   showToast("error", "Something went wrong !");
    // } finally {
    //   setLoading(false);
    // }
  };

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>
          <div className="flex items-center justify-center gap-2">
            {/* <Image src={logo} width={20} height={10} alt="logo" /> */}
            Login
          </div>
        </CardTitle>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit(handleLogin)}>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                // {...register("email", validateEmail)}
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
                  // {...register("password", validatePassword)}
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

              <Link
                href="/auth/forgot-password"
                className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
              >
                Forgot password ?
              </Link>
            </div>

            <CardFooter className="flex-col gap-2">
              <ButtonLoading
                type="submit"
                loading={loading}
                text="Login"
                icon={<LogIn />}
                styles={`w-full ${
                  loading ? "cursor-crosshair" : "cursor-pointer"
                }`}
              />
              <CardDescription>
                Don't have an account ?
                <Link
                  href={F_SIGNUP}
                  className="ms-2 text-foreground font-semibold hover:underline hover:underline-offset-5"
                >
                  Create Account
                </Link>
              </CardDescription>
            </CardFooter>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default LoginPage;
