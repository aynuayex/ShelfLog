import { AxiosError } from "axios";
import toast from "react-hot-toast";
import type { Book } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  DeleteBook,
  GetAllBooks,
  GetBook,
  UpdateBook,
  CreateBook,
} from "./ApiFunctions";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";

// Hook to get all Books
export const UseGetAllBooks = () => {
  const axiosPrivate = useAxiosPrivate();
  return useQuery({
    queryKey: ["UseGetAllBooks"],
    queryFn: () => GetAllBooks(axiosPrivate),
  });
};

// Hook to get a Book
export const UseGetBook = (
  bookId: string
) => {
  const axiosPrivate = useAxiosPrivate();
  return useQuery({
    queryKey: ["UseGetBook", bookId],
    queryFn: () => GetBook(bookId, axiosPrivate),
    enabled: Boolean(bookId),
  });
};

// Hook to create a Book
export const UseCreateBook = () => {
  const axiosPrivate = useAxiosPrivate();
  return useMutation({
    mutationFn: ({
      title,
      author,
      category,
    }: {
      title: string;
      author: string;
      category: string;
    }) => CreateBook({ title, author, category }, axiosPrivate),
    onSuccess: (data) => {
      console.log("onSuccess data:", data);
      toast.success(`New Book with title ${data.title} created!`);
    },
    onError: (error) => {
      console.error("onError error:", error);
      let message = "Book creation failed";
      if (
        error &&
        (error as AxiosError).isAxiosError &&
        (error as AxiosError).response
      ) {
        const axiosError = error as AxiosError<unknown>;
        message =
          (axiosError.response?.data as { message?: string })?.message ||
          axiosError.message ||
          message;
      } else if (error && typeof error === "object" && "message" in error) {
        message = (error as { message?: string }).message || message;
      }
      toast.error(message);
    },
  });
};

// Hook to update a Book
export const UseUpdateBook = () => {
  const axiosPrivate = useAxiosPrivate();
  return useMutation({
    mutationFn: async ({
      bookId,
      payload,
    }: {
      bookId: string;
      payload: Partial<Book>;
    }) => {
      return await UpdateBook(bookId, payload, axiosPrivate);
    },
    onSuccess: () => {
      toast.success("Book updated successfully!");
    },
    onError: (error) => {
      toast.error(error.message || "Book update failed");
    },
  });
};

// Hook to delete a Book
export const UseDeleteBook = () => {
  const axiosPrivate = useAxiosPrivate();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (bookId: string) => DeleteBook(bookId, axiosPrivate),
    onSuccess: () => {
      toast.success("Book deleted successfully!");
      queryClient.invalidateQueries({ queryKey: ["UseGetAllBooks"] });
    },
    onError: (error) => {
      let message = "Book deletion failed";
      if (
        error &&
        (error as AxiosError).isAxiosError &&
        (error as AxiosError).response
      ) {
        const axiosError = error as AxiosError<unknown>;
        message =
          (axiosError.response?.data as { message?: string })?.message ||
          axiosError.message ||
          message;
      } else if (error && typeof error === "object" && "message" in error) {
        message = (error as { message?: string }).message || message;
      }
      toast.error(message);
    },
  });
};
