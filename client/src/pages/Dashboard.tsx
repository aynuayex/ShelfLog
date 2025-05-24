import { useCallback, useMemo, useState } from "react";
import {
  MaterialReactTable,
  type MRT_ColumnDef,
  useMaterialReactTable,
} from "material-react-table";
import { format, parseISO } from "date-fns";
import type { Book } from "@/types";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  IconButton,
  MenuItem,
  Select,
  TextField,
  type SelectChangeEvent,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { bookSchema, type BookSchema } from "@/schema/bookSchema";
import {
  UseDeleteBook,
  UseUpdateBook,
  UseGetAllBooks,
} from "@/api/ticket/Queries";

const Dashboard = () => {
  const [bookId, setBookId] = useState("");
  const [openFormDialog, setOpenFormDialog] = useState(false);

  const { data: books = [], refetch, isLoading, isError } = UseGetAllBooks();
  const { mutate: deleteBook } = UseDeleteBook();
  const { mutate: updateBook } = UseUpdateBook();

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
      note: "",
    },
  });

  const handleBookStatusChange = useCallback(
    (event: SelectChangeEvent, id: string) => {
      updateBook(
        {
          bookId: id,
          payload: { status: event.target.value as Book["status"] },
        },
        {
          onSuccess: () => {
            refetch();
          },
        }
      );
    },
    [updateBook, refetch]
  );

  const readyForm = (id: string) => {
    setOpenFormDialog(true);
    const book = books.find((book) => book._id === id) as Book;
    setBookId(book._id);
    reset({
      title: book.title,
      author: book.author,
      category: book.category,
      note: book.note ?? "",
    });
  };

  const handleBookChange: SubmitHandler<BookSchema> = (data) => {
    updateBook(
      { bookId, payload: data },
      {
        onSuccess: () => {
          setOpenFormDialog(false);
          refetch();
        },
      }
    );
  };

  const handleDeleteBook = (id: string) => {
    deleteBook(id, { onSuccess: () => refetch() });
  };

  const columns = useMemo<MRT_ColumnDef<Book>[]>(
    () => [
      {
        accessorKey: "title",
        header: "Title",
        Cell: ({ row }) =>
          row.original.title
            .split(" ")
            .map((word: string) => {
              return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
            })
            .join(" "),
        size: 100,
      },
      {
        accessorKey: "author",
        header: "Author",
        Cell: ({ row }) =>
          row.original.author
            .split(" ")
            .map((word: string) => {
              return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
            })
            .join(" "),
        size: 100,
      },
      {
        accessorKey: "category",
        header: "category",
        Cell: ({ row }) =>
          row.original.category
            .split(" ")
            .map((word: string) => {
              return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
            })
            .join(" "),
        size: 100,
      },
      {
        accessorKey: "status",
        header: "Status",
        Cell: ({ row }) => (
          <Select
            value={row.original.status}
            onChange={(e) => handleBookStatusChange(e, row.original._id)}
          >
            <MenuItem value="Read">Read</MenuItem>
            <MenuItem value="Reading">Reading</MenuItem>
            <MenuItem value="Completed">Completed</MenuItem>
          </Select>
        ),
        size: 100,
      },
      {
        accessorKey: "createdAt",
        header: "Created at",
        Cell: ({ cell }) =>
          format(parseISO(cell.getValue<string>()), "h:mm a d/MM/yy"),
        size: 100,
      },
      {
        accessorKey: "updatedAt",
        header: "Updated at",
        Cell: ({ cell }) =>
          format(parseISO(cell.getValue<string>()), "h:mm a d/MM/yy"),
        size: 100,
      },
    ],
    [handleBookStatusChange]
  );

  const table = useMaterialReactTable({
    columns,
    data: books,
    enableColumnActions: false,
    enableGlobalFilter: true,
    enableToolbarInternalActions: true,
    positionActionsColumn: "last",
    enableRowActions: true,
    renderRowActions: ({ row }) => (
      <Box>
        <IconButton
          aria-label="Edit Book"
          onClick={() => readyForm(row.original._id)}
        >
          <EditIcon sx={{ color: "black" }} />
        </IconButton>
        <IconButton
          aria-label="Delete Owner"
          onClick={() => handleDeleteBook(row.original._id)}
        >
          <DeleteIcon sx={{ color: "red" }} />
        </IconButton>
      </Box>
    ),
    state: {
      isLoading,
    },
    muiToolbarAlertBannerProps: isError
      ? {
          color: "error",
          children: "Error loading data",
        }
      : undefined,
  });
  return (
    <>
      <Dialog
        component={"form"}
        onSubmit={handleSubmit(handleBookChange)}
        open={openFormDialog}
        onClose={() => setOpenFormDialog(false)}
        aria-labelledby="dialog-title"
      >
        <DialogContent
          sx={{
            width: { xs: "80vw", sm: "100vw" },
            maxWidth: 600,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: 3,
            p: { xs: 2, sm: 4 },
            boxSizing: "border-box",
          }}
        >
          <Controller
            name="title"
            control={control}
            render={({ field }) => (
              <TextField
                autoFocus
                {...field}
                required
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
                sx={{ width: {xs: 5/6, sm: 3/4 }}}
                label="Category"
                variant="filled"
                disabled={isSubmitting}
                error={!!errors.category}
                helperText={errors.category?.message}
              />
            )}
          />

          <Controller
            name="note"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                required
                multiline
                minRows={5}
                sx={{ width: {xs: 5/6, sm: 3/4 }}}
                label="Note"
                variant="filled"
                disabled={isSubmitting}
                error={!!errors.category}
                helperText={errors.category?.message}
              />
            )}
          />
        </DialogContent>
        <DialogActions
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button
            type="submit"
            variant="contained"
            fullWidth
            autoFocus
            sx={{
              width: 1 / 2,
              textTransform: "none",
              m: 2,
              bgcolor: "primary.light",
            }}
          >
            Update Book
          </Button>
        </DialogActions>
      </Dialog>
      <MaterialReactTable table={table} />
    </>
  );
};

export default Dashboard;
