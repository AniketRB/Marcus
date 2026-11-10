import React from "react";
import type { Session } from "@supabase/supabase-js";
import { addBook, loadBooks, supabase, type ReaderBook } from "./supabase";

export function PrivateApp() {
  const [session, setSession] = React.useState<Session | null>(null);
  const [ready, setReady] = React.useState(false);
  React.useEffect(() => {
    const client = supabase!;
    void client.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setReady(true);
    });
    const { data } = client.auth.onAuthStateChange((_event, next) =>
      setSession(next),
    );
    return () => data.subscription.unsubscribe();
  }, []);
  if (!ready)
    return (
      <main className="private-app" role="status">
        Opening your library…
      </main>
    );
  return session ? <Reader session={session} /> : <Auth />;
}

function Auth() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [message, setMessage] = React.useState("");
  async function submit(mode: "in" | "up") {
    const result =
      mode === "in"
        ? await supabase!.auth.signInWithPassword({ email, password })
        : await supabase!.auth.signUp({ email, password });
    setMessage(
      result.error?.message ??
        (mode === "up" ? "Check your email to confirm your account." : ""),
    );
  }
  async function google() {
    const { error } = await supabase!.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: window.location.origin },
    });
    if (error) setMessage(error.message);
  }
  return (
    <main className="private-app">
      <span className="eyebrow">MARGINALIA</span>
      <h1>Your reading life.</h1>
      <p>Sign in to keep your private journal.</p>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          void submit("in");
        }}
      >
        <label>
          Email
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label>
          Password
          <input
            type="password"
            required
            minLength={6}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button className="primary">Sign in</button>
        <button type="button" onClick={() => void submit("up")}>
          Create account
        </button>
      </form>
      <button onClick={() => void google()}>Continue with Google</button>
      {message && <p role="status">{message}</p>}
    </main>
  );
}

function Reader({ session }: { session: Session }) {
  const [books, setBooks] = React.useState<ReaderBook[]>([]);
  const [selected, setSelected] = React.useState<string | null>(null);
  const [entries, setEntries] = React.useState<
    { id: string; user_note: string; page_ref: string | null }[]
  >([]);
  const [title, setTitle] = React.useState("");
  const [author, setAuthor] = React.useState("");
  const [translator, setTranslator] = React.useState("");
  const [edition, setEdition] = React.useState("");
  const [note, setNote] = React.useState("");
  const [page, setPage] = React.useState("");
  const [error, setError] = React.useState("");
  const [busy, setBusy] = React.useState(false);
  React.useEffect(() => {
    let active = true;
    void loadBooks()
      .then((data) => {
        if (active) setBooks(data);
      })
      .catch((e) => {
        if (active) setError(String(e));
      });
    return () => {
      active = false;
    };
  }, [session.user.id]);
  React.useEffect(() => {
    if (!selected) return;
    let active = true;
    void supabase!
      .from("entries")
      .select("id,user_note,page_ref")
      .eq("book_id", selected)
      .order("created_at", { ascending: false })
      .then(({ data, error: queryError }) => {
        if (!active) return;
        if (queryError) setError(queryError.message);
        else setEntries(data ?? []);
      });
    return () => {
      active = false;
    };
  }, [selected]);
  async function createBook(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      const book = await addBook(session.user.id, {
        title,
        author,
        translator,
        edition,
      });
      setBooks((current) => [book, ...current]);
      setTitle("");
      setAuthor("");
      setTranslator("");
      setEdition("");
      setSelected(book.id);
    } catch (caught) {
      setError(String(caught));
    } finally {
      setBusy(false);
    }
  }
  async function createPost(e: React.FormEvent) {
    e.preventDefault();
    if (!selected || !note.trim()) return;
    setBusy(true);
    setError("");
    const { data, error: insertError } = await supabase!
      .from("entries")
      .insert({
        owner_id: session.user.id,
        book_id: selected,
        client_id: crypto.randomUUID(),
        type: "post",
        user_note: note.trim(),
        page_ref: page.trim() || null,
      })
      .select("id,user_note,page_ref")
      .single();
    if (insertError) setError(insertError.message);
    else {
      setEntries((current) => [data, ...current]);
      setNote("");
      setPage("");
    }
    setBusy(false);
  }
  return (
    <main className="private-app">
      <header>
        <a className="brand" href="/">
          m<span>arginalia</span>
        </a>
        <button onClick={() => void supabase!.auth.signOut()}>Sign out</button>
      </header>
      <span className="eyebrow">YOUR PRIVATE COLLECTION</span>
      <h1>
        {selected
          ? books.find((b) => b.id === selected)?.title
          : "Your library."}
      </h1>
      {error && <p role="alert">{error}</p>}
      {selected ? (
        <>
          <button onClick={() => setSelected(null)}>← All books</button>
          <form onSubmit={createPost}>
            <h2>New post</h2>
            <label>
              Your thought
              <textarea
                required
                value={note}
                onChange={(e) => setNote(e.target.value)}
              />
            </label>
            <label>
              Page or chapter
              <input value={page} onChange={(e) => setPage(e.target.value)} />
            </label>
            <button className="primary" disabled={busy}>
              Save to journal
            </button>
          </form>
          <section aria-label="Journal entries">
            {entries.map((entry) => (
              <article className="entry" key={entry.id}>
                <span className="eyebrow">{entry.page_ref || "UNPLACED"}</span>
                <p>{entry.user_note}</p>
              </article>
            ))}
          </section>
        </>
      ) : (
        <>
          <form onSubmit={createBook}>
            <h2>Add a book</h2>
            <label>
              Title
              <input
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </label>
            <label>
              Author
              <input
                required
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
              />
            </label>
            <label>
              Translator (optional)
              <input
                value={translator}
                onChange={(e) => setTranslator(e.target.value)}
              />
            </label>
            <label>
              Edition (optional)
              <input
                value={edition}
                onChange={(e) => setEdition(e.target.value)}
              />
            </label>
            <button className="primary" disabled={busy}>
              Add book
            </button>
          </form>
          <section className="reader-books">
            {books.map((book) => (
              <button key={book.id} onClick={() => setSelected(book.id)}>
                <h2>{book.title}</h2>
                <p>{book.author}</p>
              </button>
            ))}
          </section>
          {!books.length && (
            <p>Your library is empty. Add the book you’re reading to begin.</p>
          )}
        </>
      )}
    </main>
  );
}
