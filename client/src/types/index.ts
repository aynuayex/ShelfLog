export interface Book {
  _id: string;
  userId: string;
  title: string;
  author: string;
  category: string;
  note?: string;
  status: "Read" | "Reading" | "Completed";
  createdAt: string;
  updatedAt: string;
}
