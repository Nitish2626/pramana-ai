"use client";

import ButtonLoading from "@/components/custom/ButtonLoading";
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
import { showToast } from "@/lib/toast";
import { zodSchema } from "@/types/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { ExternalLink } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { F_LOGIN, F_RESET_PASSWORD } from "../../../routes/appRoutes";

type EmailVerificationData = {
  email: string;
};

const EmailVerificationPage = () => {
  const router = useRouter();

  const session = authClient.useSession();
  console.log("session", session.data);

  useEffect(() => {
    if (!session.data) {
      router.push(F_LOGIN);
    }
  }, [session.data]);

  const emailSchema = zodSchema.pick({
    email: true,
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EmailVerificationData>({
    resolver: zodResolver(emailSchema),
  });
  const [loading, setLoading] = useState(false);

  const handleEmailVerification = async (data: EmailVerificationData) => {
    try {
      setLoading(true);

      await authClient.requestPasswordReset(
        {
          email: data.email,
        },
        {
          onSuccess(context) {
            console.log("data", context.data);
            reset();
            showToast("success", "Email sent successfully!");
            router.push(F_RESET_PASSWORD);
          },
          onError(context) {
            console.log("error", context.error);
            showToast("error", context.error.message as string);
          },
        }
      );
    } catch (error) {
      console.log("F_EMAIL_VERIFICATION ERROR", error);
      showToast("error", "Something went wrong!");
    }
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>
            <div className="flex items-center justify-center gap-2">
              {/* <Image src={logo} width={20} height={10} alt="logo" /> */}
              Email Verification
            </div>
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(handleEmailVerification)}>
            <div className="flex flex-col gap-6">
              {/* Email */}
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

              <CardFooter className="flex-col gap-2">
                <ButtonLoading
                  type="submit"
                  loading={loading}
                  text="Send Verification Link"
                  icon={<ExternalLink />}
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

export default EmailVerificationPage;
