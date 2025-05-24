/* eslint-disable @typescript-eslint/no-explicit-any */
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "@/api/axios";
import toast from "react-hot-toast";
import useAuth from "@/hooks/useAuth";
import { Button, TextField, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router";
import { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import MailOutlineIcon from "@mui/icons-material/MailOutline";

const verifyEmailFormSchema = z.object({
  otp: z.string().length(6, { message: "OTP code must be 6 characters." }),
});

type verifyEmailFormSchemaType = z.infer<typeof verifyEmailFormSchema>;

const VerifyEmail = () => {
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const [timer, setTimer] = useState(0);
  const send = useRef(false);
  const [isResending, setIsResending] = useState(false);
  const {
    handleSubmit,
    formState: { isSubmitting, errors },
    control,
  } = useForm<verifyEmailFormSchemaType>({
    resolver: zodResolver(verifyEmailFormSchema),
    defaultValues: {
      otp: "",
    },
  });

  useEffect(() => {
    const sendOtp = async () => {
      try {
        const userId = localStorage.getItem("userId");
        const response = await axios.get(`/users/send-otp/${userId}`);
        if (response.status === 200) {
          toast.success("OTP sent! Check your email (including spam folder)");
          setTimer(30); // Start a 30s cooldown
        }
      } catch (err: any) {
        if (err.response?.status === 404) {
          toast.error(err.response?.data.message);
        }
        toast.error("Failed to send OTP. Please try again later.");
      }
    };
    if (!send.current) {
      sendOtp();
      send.current = true;
    }
  }, []);

  useEffect(() => {
    if (timer > 0) {
      const countdown = setInterval(() => setTimer((prev) => prev - 1), 1000);
      return () => clearInterval(countdown);
    }
  }, [timer]);

  const handleResendOTP = async () => {
    setIsResending(true);
    setIsResending(true);
    try {
      const userId = localStorage.getItem("userId");
      const response = await axios.get(`/users/send-otp/${userId}`);
      if (response.status === 200) {
        toast.success("OTP resend successfully!");
        setTimer(30); // Restart 30s cooldown
      }
    } catch (err: any) {
      if (err.response?.status === 404) {
        toast.error(err.response?.data.message);
      }
      toast.error("Failed to resend OTP. Please try again.");
    } finally {
      setIsResending(false);
    }
  };

  const onSubmit = async (data: verifyEmailFormSchemaType) => {
    try {
      console.log({ data });
      const userId = localStorage.getItem("userId");
      const response = await axios.post(`/users/verify-email`, {
        userId,
        otp: data.otp,
      });
      if (response.status === 200) {
        toast.success("Successfully verified email!");
        setAuth((prevAuth) => ({ ...prevAuth, emailVerified: true }));
        navigate("/dashboard");
      }
      console.log(response);
    } catch (err: any) {
      console.error(err);
      if (!err?.response) {
        toast.error("Server can not be reached, Please Try again later!");
      } else if (err.response?.status === 400) {
        toast.error("Missing OTP Code!");
      } else if (err.response?.status === 401) {
        toast.error(err.response?.data.message);
      } else if (err.response?.status === 404) {
        toast.error(err.response?.data.message);
      } else {
        toast.error("Verification Failed, Please Try again later!");
      }
    }
  };

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          backgroundColor: "background.paper",
          width: { xs: "90%", sm: "33%" },
          marginTop: { xs: 4, sm: 0 },
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          p: 2,
          py: 4,
          borderRadius: 2,
          boxShadow: 3,
          gap: 4,
        }}
      >
        <Typography
          variant="h4"
          fontWeight="bold"
          sx={{ letterSpacing: 1, mb: 2 }}
        >
          Verify Email
        </Typography>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: 4,
          }}
        >
          <Controller
            name="otp"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                disabled={isSubmitting}
                label={
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <MailOutlineIcon />
                    <span style={{ marginLeft: 8 }}>OTP</span>
                  </div>
                }
                error={!!errors.otp}
                helperText={errors.otp?.message}
                sx={{ width: { xs: "90%", sm: "75%" } }}
              />
            )}
          />
        </Box>
        <Button
          type="submit"
          disabled={isSubmitting}
          variant="contained"
          sx={{ mt: 2, width: { xs: "90%", sm: "75%" } }}
        >
          Verify
        </Button>
        <Typography textAlign="center" sx={{ mt: 2 }}>
          Have not recieved code?{" "}
          <Button
            variant="text"
            sx={{
              color: "primary.main",
              textDecoration: "underline",
              minWidth: 0,
              p: 0,
            }}
            onClick={handleResendOTP}
            disabled={isResending || timer > 0}
          >
            {timer > 0 ? `Resend in ${timer}s` : "Resend"}
          </Button>
        </Typography>
      </Box>
    </Box>
  );
};

export default VerifyEmail;
