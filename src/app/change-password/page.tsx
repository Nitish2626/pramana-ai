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
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { F_LOGIN } from "../../../routes/appRoutes";
import { showToast } from "@/lib/toast";

type ChangePasswordData = {
  oldPassword: string;
  newPassword: string;
};

const ChangePasswordPage = () => {
  const router = useRouter();

  const session = authClient.useSession();
  console.log("session", session.data);

  useEffect(() => {
    if (!session.data) {
      router.push(F_LOGIN);
    }
  }, [session.data]);

  const changePasswordSchema = zodSchema
    .pick({
      password: true,
    })
    .extend({
      oldPassword: zodSchema.shape.password,
    })
    .omit({
      password: true,
    })
    .extend({
      newPassword: zodSchema.shape.password,
    });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ChangePasswordData>({
    resolver: zodResolver(changePasswordSchema),
  });
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChangePassword = async (data: ChangePasswordData) => {
    setLoading(true);

    await authClient.changePassword(
      {
        newPassword: data.newPassword,
        currentPassword: data.oldPassword,
        revokeOtherSessions: true,
      },
      {
        onSuccess(context) {
          // console.log("data", context.data);
          reset();
          showToast("success", "Password changed successfully!");
          router.push(F_LOGIN);
        },
        onError(context) {
          // console.log("error", context.error);
          showToast("error", context.error.message as string);
        },
      }
    );
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>
            <div className="flex items-center justify-center gap-2">
              {/* <Image src={logo} width={20} height={10} alt="logo" /> */}
              Change Password
            </div>
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(handleChangePassword)}>
            <div className="flex flex-col gap-6">
              {/* Old Password */}
              <div className="grid gap-2">
                <Label htmlFor="oldPassword">Old Password</Label>
                <div className="flex w-full max-w-sm items-center">
                  <Input
                    id="oldPassword"
                    type={showOldPassword ? "text" : "password"}
                    placeholder="*******************"
                    {...register("oldPassword")}
                    className="border-r-0 rounded-tr-none rounded-br-none"
                  />
                  <Button
                    type="button"
                    variant="password"
                    className="cursor-pointer"
                    onClick={() => setShowOldPassword((prev) => !prev)}
                  >
                    {showOldPassword ? <EyeOff /> : <Eye />}
                  </Button>
                </div>
                {errors.oldPassword && (
                  <p className="text-red-500 text-sm">
                    {errors.oldPassword.message as string}
                  </p>
                )}
              </div>

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
                  text="Change Password"
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

export default ChangePasswordPage;
