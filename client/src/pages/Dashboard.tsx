import { useCallback, useEffect, useMemo, useState } from "react";
import {
  MaterialReactTable,
  type MRT_ColumnDef,
  useMaterialReactTable,
} from "material-react-table";
import { format, parseISO } from "date-fns";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
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
import Toast from "@/components/Toast";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const initialFormData = {
    id: "",
  title: "",
  author: "",
  category: "",
  note: "",
};

const Dashboard = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [formData, setFormdata] = useState(initialFormData);
  const [openFormDialog, setOpenFormDialog] = useState(false);
  //   const [openSuccessDialog, setOpenSuccessDialog] = useState(false);

  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getBooks = async () => {
      try {
        const response = await axiosPrivate.get("/books", {
          signal: controller.signal,
        });
        console.log(response.data);
        if (isMounted) {
          setBooks(response.data);
        }
      } catch (err) {
        console.error(err);
      }
    };
    getBooks();
    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [axiosPrivate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormdata((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleBookStatusChange = useCallback(
    async (event: SelectChangeEvent, id: string) => {
      try {
        const response = await axiosPrivate.put(`books/${id}`, {
          status: event.target.value,
        });
        console.log({ response });
        if (response.status === 200) {
          // not working check it?
          // <Toast
          //   message={`book status changed successfully to ${event.target.value}`}
          //   severity="success"
          // />;
          // refetch();
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        <Toast
          message={`operation error ${err.response.data}`}
          severity="error"
        />;
      }
      // setStatus(event.target.value as string);
    },
    [axiosPrivate]
  );

  const readyForm = (id: string) => {
    setOpenFormDialog(true);
    const book = books.find((book) => book._id === id) as Book;
    setFormdata({ id: book._id, title: book.title, author: book.author, category: book.category, note: book.note ?? "" });
  };

  const handleBookChange = async () => {
    try {
      const response = await axiosPrivate.put(`books/${formData.id}`, {
        ...formData
      });
      if(response.status == 200 ) {
        setOpenFormDialog(false);
        // refetch the new Data
      }
      console.log(response);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteBook = async (id: string) => {
    try {
      const response = await axiosPrivate.delete(`books/${id}`);
      console.log(response.data);
      // refetch here to get updated data
      // refetch()
      // setBooks(response.data.allOwners);
    } catch (err) {
      console.error(err);
    }
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
      <Box
      >
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
      //   isLoading,
    },
    // muiToolbarAlertBannerProps: isError
    //   ? {
    //       color: 'error',
    //       children: 'Error loading data',
    //     }
    //   : undefined,
    // ...props,
  });
  return (
    <>
      <Dialog
        open={openFormDialog}
        onClose={() => setOpenFormDialog(false)}
        aria-labelledby="dialog-title"
      >
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            label="Book Name"
            fullWidth
            variant="filled"
          />
          <TextField
            required
            margin="dense"
            name="author"
            value={formData.author}
            onChange={handleInputChange}
            label="Author Name"
            fullWidth
            variant="filled"
          />
          <TextField
            required
            margin="dense"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            label="category"
            fullWidth
            variant="filled"
          />
          <TextField
            margin="dense"
            name="note"
            value={formData.note}
            onChange={handleInputChange}
            label="Note"
            fullWidth
            variant="filled"
            multiline
            minRows={3}
          />
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            fullWidth
            autoFocus
            sx={{ textTransform: "none", m: 2, bgcolor: "primary.light" }}
            onClick={handleBookChange}
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
