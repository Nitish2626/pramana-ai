"use client";

import ButtonLoading from "@/components/custom/ButtonLoading";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth-client";
import { zodSchema } from "@/types/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { BookKey, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { F_LOGIN } from "../../../routes/appRoutes";
import { showToast } from "@/lib/toast";

type ResetPasswordData = {
  newPassword: string;
};

const ResetPasswordPage = () => {
  const router = useRouter();

  const session = authClient.useSession();
  console.log("session", session.data);

  useEffect(() => {
    if (!session.data) {
      router.push(F_LOGIN);
    }
  }, [session.data]);

  const token = useSearchParams().get("token");
  if (!token) {
    router.push(F_LOGIN);
  }

  const resetPasswordSchema = zodSchema
    .pick({
      password: true,
    })
    .extend({
      newPassword: zodSchema.shape.password,
    })
    .omit({
      password: true,
    });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ResetPasswordData>({
    resolver: zodResolver(resetPasswordSchema),
  });
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleResetPassword = async (data: ResetPasswordData) => {
    try {
      setLoading(true);

      await authClient.resetPassword(
        {
          newPassword: data.newPassword,
        },
        {
          onSuccess(context) {
            // console.log("data", context.data);
            reset();
            showToast("success", "Password Reset successfully!");
            router.push(F_LOGIN);
          },
          onError(context) {
            // console.log("error", context.error);
            showToast("error", context.error.message as string);
          },
        }
      );
    } catch (error) {
      console.log("F_RESET_PASSWORD ERROR", error);
      showToast("error", "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>
            <div className="flex items-center justify-center gap-2">
              {/* <Image src={logo} width={20} height={10} alt="logo" /> */}
              Reset Password
            </div>
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(handleResetPassword)}>
            <div className="flex flex-col gap-6">
              {/* New Password */}
              <div className="grid gap-2">
                <Label htmlFor="newPassword">New Password</Label>
                <div className="flex w-full max-w-sm items-center">
                  <Input
                    id="newPassword"
                    type={showNewPassword ? "text" : "password"}
                    placeholder="*******************"
                    {...register("newPassword")}
                    className="border-r-0 rounded-tr-none rounded-br-none"
                  />
                  <Button
                    type="button"
                    variant="password"
                    className="cursor-pointer"
                    onClick={() => setShowNewPassword((prev) => !prev)}
                  >
                    {showNewPassword ? <EyeOff /> : <Eye />}
                  </Button>
                </div>
                {errors.newPassword && (
                  <p className="text-red-500 text-sm">
                    {errors.newPassword.message as string}
                  </p>
                )}
              </div>

              <CardFooter className="flex-col gap-2">
                <ButtonLoading
                  type="submit"
                  loading={loading}
                  text="Reset Password"
                  icon={<BookKey />}
                  styles={`w-full ${
                    loading ? "cursor-crosshair" : "cursor-pointer"
                  }`}
                />
              </CardFooter>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResetPasswordPage;
