import {
  Alert,
  Box,
  Link,
  Checkbox,
  FormControl,
  FormHelperText,
  FormControlLabel,
  InputAdornment,
  IconButton,
  Snackbar,
  Stack,
  TextField,
  Typography,
  type AlertColor,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import Divider from "@mui/material/Divider";
import { useState } from "react";
import { Controller, type SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import book1 from "../assets/book1.png";
import book2 from "../assets/book2.png";
import axios from "@/api/axios";
import { Link as RouterLink, useNavigate } from "react-router";
import useAuth from "@/hooks/useAuth";
import { LoadingButton } from "@mui/lab";
import { signUpSchema, type SignUpSchema } from "@/schema/signUpSchema";

function Signup() {
  const [open, setOpen] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [severity, setSeverity] = useState<AlertColor | undefined>();
  const [showPassword, setShowPassword] = useState(false);
  const { setAuth } = useAuth();
  const navigate = useNavigate();

  const {
    handleSubmit,
    formState: { isSubmitting, errors },
    control,
  } = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
      termsAndConditions: false,
    },
  });

  const handleClose = (e?: React.SyntheticEvent | Event, reason?: string) => {
    console.log(e);
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const onSubmit: SubmitHandler<SignUpSchema> = async (data) => {
    try {
      console.log({ data });
      const response = await axios.post("users/register", data);
      if (response.status === 201) {
        const { id, email, fullName, accessToken, emailVerified } = response.data;
        setAuth({ id, email, fullName, accessToken, emailVerified });
        
        localStorage.setItem("userId", id); // Save userId
        navigate("/verify-email");
      }
      console.log(response);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error(err);
      setSeverity("error");
      if (!err?.response) {
        setErrMsg("Server can not be reached, Please Try again later!");
      } else if (err.response?.status === 400) {
        setErrMsg(err.response?.data.message);
      } else if (err.response?.status === 409) {
        setErrMsg(err.response?.data.message);
      } else {
        setErrMsg("Registration Failed, Please Try again later!");
      }
      setOpen(true);
    }
  };

  return (
    <Box>
      <Stack
        direction="row"
        sx={{
          width: "100vw",
          height: "100vh",
        }}
      >
        <Snackbar
          autoHideDuration={8000}
          open={open}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
        >
          <Alert severity={severity} variant="filled" onClose={handleClose}>
            {errMsg}
          </Alert>
        </Snackbar>

        <Box
          sx={{
            width: "50%",
            display: { xs: "none", md: "flex" },
            justifyContent: "center",
            alignItems: "center",
            bgcolor: "#171B36",
          }}
        >
          <img src={book1} alt="opened book image" width={150} height={150} />
        </Box>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          sx={{
            width: { xs: "100%", md: "50%" },
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: 2,
            bgcolor: "white",
            px: {xs: 3, md: 8},
            pb: {xs: 3, md: 8},
            pt: {xs: 0, md: 8}
          }}
        >
          <Stack direction={"row"} spacing={2}>
            <img src={book2} alt="opened book image" width={50} height={50} />
            <Typography variant="h4">ShelfLog</Typography>
          </Stack>

          <Divider sx={{ mb: 3 }} />

          <Controller
            name="fullName"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label={
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <AccountCircleOutlinedIcon />
                    <span style={{ marginLeft: 8 }}>Full Name</span>
                  </div>
                }
                type="text"
                disabled={isSubmitting}
                error={!!errors.fullName}
                helperText={errors.fullName?.message}
              />
            )}
          />

          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                type="email"
                disabled={isSubmitting}
                label={
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <MailOutlineIcon />
                    <span style={{ marginLeft: 8 }}>Email address</span>
                  </div>
                }
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            )}
          />

          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                error={!!errors.password}
                helperText={errors.password?.message}
                label={
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <LockOutlinedIcon />
                    <span style={{ marginLeft: 8 }}>Password</span>
                  </div>
                }
                disabled={isSubmitting}
                type={showPassword ? "text" : "password"}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <VisibilityOffIcon />
                        ) : (
                          <VisibilityIcon />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            )}
          />

          <Controller
            name="confirmPassword"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword?.message}
                label={
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <LockOutlinedIcon />
                    <span style={{ marginLeft: 8 }}>Confirm Password</span>
                  </div>
                }
                disabled={isSubmitting}
                type={showPassword ? "text" : "password"}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <VisibilityOffIcon />
                        ) : (
                          <VisibilityIcon />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            )}
          />

          <Controller
            name="termsAndConditions"
            control={control}
            render={({ field }) => (
              <FormControl error={!!errors.termsAndConditions}>
                <FormControlLabel
                  label="I accept the Terms and Conditions"
                  control={<Checkbox {...field} disabled={isSubmitting} />}
                />
                {errors.termsAndConditions && (
                  <FormHelperText>
                    {errors.termsAndConditions.message}
                  </FormHelperText>
                )}
              </FormControl>
            )}
          />

          <LoadingButton
            type="submit"
            variant="contained"
            color="primary"
            size="small"
            loading={isSubmitting}
          >
            Sign up
          </LoadingButton>
          <Typography variant="subtitle2" textAlign={"center"}>
            Already have an account?
            <Link component={RouterLink} to="/sign-in" replace={true}>
              Login
            </Link>
          </Typography>
        </Box>
      </Stack>
    </Box>
  );
}

export default Signup;
