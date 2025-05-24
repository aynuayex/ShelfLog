import {
  Alert,
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  IconButton,
  InputAdornment,
  Link,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import Divider from "@mui/material/Divider";
import { useEffect, useState } from "react";

import book1 from "../assets/book1.png";
import book2 from "../assets/book2.png";
import { Link as RouterLink, useLocation, useNavigate } from "react-router";
import axios from "@/api/axios";
import useAuth from "@/hooks/useAuth";
import { LoadingButton } from "@mui/lab";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import { loginSchema, type LoginSchema } from "@/schema/loginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

function Login() {
  const [open, setOpen] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { setAuth, persist, setPersist } = useAuth();

  const message = location?.state?.message;

  useEffect(() => {
    if (message) setOpen(true);
  }, [message]);

  useEffect(() => {
    localStorage.setItem("persist", JSON.stringify(persist));
  }, [persist]);

  const {
    handleSubmit,
    formState: { isSubmitting, errors },
    control,
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      persist: JSON.parse(localStorage.getItem("persist") || "false"),
    },
  });

  const handleClose = (e?: React.SyntheticEvent | Event, reason?: string) => {
    console.log(e);
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const onSubmit: SubmitHandler<LoginSchema> = async (data) => {
    try {
      setPersist(data.persist);
      localStorage.setItem("persist", JSON.stringify(data.persist));
      console.log({ data });
      const response = await axios.post("users/login", data);
      if (response.status === 200) {
        const {
          id,
          email,
          fullName,
          accessToken,
          emailVerified,
        } = response.data;
        setAuth({ id, email, fullName, accessToken, emailVerified });
        console.log(response.data);

        navigate("/dashboard");
      }
      console.log(response);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error(err);
      if (!err?.response) {
        setErrMsg("Server can not be reached, Please Try again later!");
      } else if (err.response?.status === 400) {
        setErrMsg("Missing Email or Password!");
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized, Your Email and/or Password is not correct!");
      } else if (err.response?.status === 403) {
        const { id, email, fullName, role, accessToken, emailVerified } =
          err.response.data;
        console.log({ id, email, fullName, role, accessToken, emailVerified });
        setAuth({ id, email, fullName, accessToken, emailVerified });
        toast.error("Forbidden,You need to verify your email before you LogIn!");
        navigate("/verify-email");
      } else {
        setErrMsg("Login Failed, Please Try again later!");
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
          <Alert
            severity={errMsg ? "error" : "info"}
            variant="filled"
            onClose={handleClose}
          >
            {errMsg ? errMsg : message}
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
          <Typography variant="h5" sx={{ mb: -1, cursor: "default" }}>
            Login
          </Typography>

          <Divider sx={{ mb: 3 }} />

          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                type="email" // necessary since there is no default
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
            name="persist"
            control={control}
            render={({ field }) => (
              <FormControl error={!!errors.persist}>
                <FormControlLabel
                  label="Remember me"
                  control={<Checkbox {...field} disabled={isSubmitting} />}
                />
                {errors.persist && (
                  <FormHelperText>{errors.persist.message}</FormHelperText>
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
            Login
          </LoadingButton>
          <Typography variant="subtitle2" textAlign={"center"}>
            Have not an account?
            <Link component={RouterLink} to="/">
              Signup
            </Link>
          </Typography>
        </Box>
      </Stack>
    </Box>
  );
}

export default Login;
