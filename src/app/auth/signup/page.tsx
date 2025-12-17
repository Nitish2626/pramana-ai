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
import axios from "axios";
import ButtonLoading from "@/components/custom/ButtonLoading";
import { F_LOGIN } from "../../../../routes/appRoutes";

type Formdata = {
  username: string;
  email: string;
  password: string;
};

const SignupPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showOtpDialog, setShowOtpDialog] = useState(false);
  const [signupData, setSignupData] = useState<Formdata>({
    username: "",
    email: "",
    password: "",
  });

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm<Formdata>();

  const handleSignup = async (data: Formdata) => {
    // try {
    //   setLoading(true);
    //   setSignupData({
    //     username: data.username,
    //     email: data.email,
    //     password: data.password,
    //   });
    //   const responseData = await axios.post(B_SIGNUP, data);
    //   console.log("signup res", responseData.data);
    //   if (responseData.data.status === BAD_REQUEST) {
    //     setError("username", {
    //       type: "server",
    //       message: responseData.data.message.username[0],
    //     });
    //     setError("email", {
    //       type: "server",
    //       message: responseData.data.message.email[0],
    //     });
    //     setError("password", {
    //       type: "server",
    //       message: responseData.data.message.password[0],
    //     });
    //     setLoading(false);
    //     return;
    //   }
    //   if (
    //     responseData.data.status === UNPROCESSABLE_ENTITY ||
    //     responseData.data.status === CONFLICT ||
    //     responseData.data.status === INTERNAL_SERVER_ERROR
    //   ) {
    //     showToast("error", responseData.data.message);
    //     setLoading(false);
    //     return;
    //   }
    //   console.log("Form Submitted", data);
    //   setShowOtpDialog(true);
    //   showToast("success", "OTP sent !");
    //   const otpdata = await axios.post(B_SEND_OTP, {
    //     email: data?.email,
    //     mailType: 0,
    //   });
    //   console.log("otpdata", otpdata);
    //   if (
    //     otpdata.data.status === BAD_REQUEST ||
    //     otpdata.data.status === UNPROCESSABLE_ENTITY ||
    //     otpdata.data.status === INTERNAL_SERVER_ERROR
    //   ) {
    //     showToast("error", responseData.data.message);
    //     return;
    //   }
    //   console.log("otp", otpdata);
    //   reset();
    //   showToast("success", otpdata.data.message);
    //   // return response(true, OK, otpdata.data.message);
    //   // return response(true, OK, "hii");
    // } catch (error) {
    //   console.log("SIGNUP ERROR", error);
    //   showToast("error", "Something went wrong !");
    // } finally {
    //   setLoading(false);
    // }
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
                  //   {...register("username", validateUsername)}
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
                  //   {...register("email", validateEmail)}
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
              </div>

              <CardFooter className="flex-col gap-2">
                <ButtonLoading
                  type="submit"
                  loading={loading}
                  text="Signup"
                  styles={`w-full ${loading ? "cursor-crosshair" : "cursor-pointer"}`}
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
