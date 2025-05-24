import type { Book } from "@/types";
import { type AxiosInstance } from "axios";

// function to fetch all books
export const GetAllBooks = async (
  axiosPrivate: AxiosInstance
): Promise<Book[]> => {
  try {
    const response = await axiosPrivate.get<Book[]>(`/books`);
    console.log({ data: response.data });
    return response.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

// function to fetch a book
export const GetBook = async (
  bookId: string,
  axiosPrivate: AxiosInstance
): Promise<Book> => {
  try {
    const response = await axiosPrivate.get<Book>(`/books/${bookId}`);
    console.log({ data: response.data });
    return response.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

// function to update a book
export const CreateBook = async (
  formData: {
    title: string;
    author: string;
    category: string;
  },
  axiosPrivate: AxiosInstance
): Promise<Book> => {
  try {
    const response = await axiosPrivate.post<Book>(`/books`, { ...formData });
    console.log({ data: response.data });
    return response.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

// function to update a book
export const UpdateBook = async (
  bookId: string,
  payload: Partial<Book>,
  axiosPrivate: AxiosInstance,
): Promise<Book> => {
  try {
    const response = await axiosPrivate.put<Book>(`/books/${bookId}`, payload);
    console.log({ data: response.data });
    return response.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

// function to delete a book
export const DeleteBook = async (
  bookId: string,
  axiosPrivate: AxiosInstance
): Promise<Book> => {
  try {
    const response = await axiosPrivate.delete<Book>(`/books/${bookId}`);
    console.log({ data: response.data });
    return response.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
