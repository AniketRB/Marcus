import { createClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_SUPABASE_URL;
const key = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const configured = Boolean(url && key);
export const supabase = configured ? createClient(url, key) : null;

export type ReaderBook = {
  id: string;
  owner_id: string;
  title: string;
  author: string;
  translator: string | null;
  edition: string | null;
  status: "reading" | "finished";
  reading_position: string | null;
};

export async function loadBooks(): Promise<ReaderBook[]> {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from("books")
    .select(
      "id,owner_id,title,author,translator,edition,status,reading_position",
    )
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data ?? []) as ReaderBook[];
}

export async function addBook(
  ownerId: string,
  input: {
    title: string;
    author: string;
    translator?: string;
    edition?: string;
  },
): Promise<ReaderBook> {
  if (!supabase) throw new Error("Supabase is not configured");
  const { data, error } = await supabase
    .from("books")
    .insert({
      owner_id: ownerId,
      title: input.title.trim(),
      author: input.author.trim(),
      translator: input.translator?.trim() || null,
      edition: input.edition?.trim() || null,
    })
    .select(
      "id,owner_id,title,author,translator,edition,status,reading_position",
    )
    .single();
  if (error) throw error;
  return data as ReaderBook;
}
