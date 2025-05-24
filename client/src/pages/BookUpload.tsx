import toast from "react-hot-toast";
import {
  Box,
  Typography,
  Button,
  TextField,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import { useRef } from "react";

import { DRAWER_WIDTH } from "@/constants";
import { HEADING_HEIGHT } from "@/constants/index";
import { UseCreateBook } from "@/api/ticket/Queries";
import { bookSchema, type BookSchema } from "@/schema/bookSchema";

const BookUpload = () => {
  const titleInputRef = useRef<HTMLInputElement>(null);

  const { isSuccess, isError, mutate: createBook } = UseCreateBook();

  const {
    handleSubmit,
    formState: { isSubmitting, errors },
    control,
    reset,
  } = useForm<BookSchema>({
    resolver: zodResolver(bookSchema),
    defaultValues: {
      title: "",
      author: "",
      category: "",
    },
  });

  const onSubmit: SubmitHandler<BookSchema> = async (data) => {
    createBook(data);
    reset({ title: "", author: "", category: "" });
    setTimeout(() => {
      titleInputRef.current?.focus();
    }, 10);
    console.log({ isSuccess, isError });
  };

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 4,
        width: isMobile ? "100%" : `calc(100vw - ${DRAWER_WIDTH + 48}px)`,
        height: isMobile ? "auto" : `calc(100vh - ${HEADING_HEIGHT + 48}px)`,
        borderRadius: 1,
        bgcolor: "white",
        boxShadow: isMobile ? undefined : "0 8px 24px 0 rgba(69, 69, 80, 0.1)",
        p: isMobile ? 2 : 0,
        m: isMobile ? 0 : undefined,
      }}
    >
      <Typography
        mt={isMobile ? 2 : 4}
        gutterBottom
        fontSize={isMobile ? 20 : undefined}
      >
        Upload New Book
      </Typography>

      <Controller
        name="title"
        control={control}
        render={({ field }) => (
          <TextField
            inputRef={titleInputRef}
            autoFocus
            {...field}
            required
            margin="dense"
                sx={{ width: {xs: 5/6, sm: 3/4 }}}
            label="Book Name"
            variant="filled"
            disabled={isSubmitting}
            error={!!errors.title}
            helperText={errors.title?.message}
          />
        )}
      />

      <Controller
        name="author"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            required
            margin="dense"
                sx={{ width: {xs: 5/6, sm: 3/4 }}}
            label="Author Name"
            variant="filled"
            disabled={isSubmitting}
            error={!!errors.author}
            helperText={errors.author?.message}
          />
        )}
      />

      <Controller
        name="category"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            required
            margin="dense"
                sx={{ width: {xs: 5/6, sm: 3/4 }}}
            label="Category"
            variant="filled"
            disabled={isSubmitting}
            error={!!errors.category}
            helperText={errors.category?.message}
          />
        )}
      />

      <Button
        onClick={() => toast.error("Not implemented yet!")}
        startIcon={<FileUploadOutlinedIcon />}
        sx={{ textTransform: "none", color: "primary.light" }}
      >
        Upload Book Cover
      </Button>
      <Button
        variant="contained"
        type="submit"
        sx={{
          width: {xs: "200px", sm: "300px"},
          height: "60px",
          borderRadius: 6,
          textTransform: "none",
          bgcolor: "primary.light",
        }}
      >
        Submit
      </Button>
    </Box>
  );
};

export default BookUpload;
