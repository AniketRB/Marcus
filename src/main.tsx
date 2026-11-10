import React from "react";
import ReactDOM from "react-dom/client";
import {
  BrowserRouter,
  NavLink,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import {
  ArrowUpRight,
  ArrowRight,
  Plus,
  BookOpen,
  Library,
  Compass,
  Moon,
  Sun,
  X,
  Camera,
  Mic,
  Feather,
  Search,
  ChevronDown,
} from "lucide-react";
import "./style.css";

const books = [
  {
    title: "The Myth of Sisyphus",
    author: "Albert Camus",
    color: "rust",
    category: "ESSAYS · PHILOSOPHY",
    mark: "S",
    subtitle: "The question is how to live.",
    progress: "Chapter II",
    entries: 12,
  },
  {
    title: "A Room of One’s Own",
    author: "Virginia Woolf",
    color: "sage",
    category: "ESSAYS · LITERATURE",
    mark: "W",
    subtitle: "A space for a mind of one’s own.",
    progress: "Chapter III",
    entries: 8,
  },
  {
    title: "Letters to a Young Poet",
    author: "Rainer Maria Rilke",
    color: "blue",
    category: "LETTERS · POETRY",
    mark: "R",
    subtitle: "Live the questions now.",
    progress: "Letter IV",
    entries: 6,
  },
];
function Cover({
  book,
  small = false,
}: {
  book: (typeof books)[number];
  small?: boolean;
}) {
  return (
    <div className={`cover ${book.color} ${small ? "small" : ""}`}>
      <span className="cover-category">{book.category}</span>
      <span className="cover-title">{book.title}</span>
      <span className="cover-art" aria-hidden="true">
        {book.mark}
      </span>
      <span className="cover-author">{book.author}</span>
    </div>
  );
}
function App() {
  const [dark, setDark] = React.useState(false);
  const [sample, setSample] = React.useState(false);
  const [adding, setAdding] = React.useState(false);
  const [notice, setNotice] = React.useState("");
  const dialog = React.useRef<HTMLDialogElement>(null);
  React.useEffect(() => {
    document.documentElement.dataset.theme = dark ? "dark" : "light";
  }, [dark]);
  React.useEffect(() => {
    if (adding) dialog.current?.showModal();
    else dialog.current?.close();
  }, [adding]);
  return (
    <>
      <a className="skip" href="#main">
        Skip to content
      </a>
      <div className="preview">
        <span>DESIGN PREVIEW</span> A first look at your reading life. All
        displayed journals are illustrative.
      </div>
      <div className="shell">
        <aside>
          <a className="brand" href="/">
            m<span>arginalia</span>
            <i>✳</i>
          </a>
          <p className="brand-note">A life between the lines.</p>
          <nav aria-label="Main navigation">
            <NavLink to="/" end>
              <Library size={19} />
              My library
            </NavLink>
            <NavLink to="/journal">
              <BookOpen size={19} />
              My journal
            </NavLink>
            <NavLink to="/gallery">
              <Compass size={19} />
              Journal gallery
            </NavLink>
          </nav>
          <div className="sidebar-bottom">
            <p>
              “We read to know
              <br />
              we are not alone.”
            </p>
            <span>A PLACE FOR YOUR PERSPECTIVE</span>
            <button className="theme" onClick={() => setDark(!dark)}>
              {dark ? <Sun size={17} /> : <Moon size={17} />}{" "}
              {dark ? "Light appearance" : "Dark appearance"}
            </button>
          </div>
        </aside>
        <main id="main">
          <header className="topbar">
            <span>YOUR READING LIFE</span>
            <span className="private">
              Private by default <span className="avatar">Y</span>
            </span>
          </header>
          <Routes>
            <Route
              path="/"
              element={
                <LibraryPage
                  sample={sample}
                  setSample={setSample}
                  onAdd={() => setAdding(true)}
                />
              }
            />
            <Route path="/journal" element={<Journal />} />
            <Route path="/ask" element={<Ask onNotice={setNotice} />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route
              path="*"
              element={
                <div className="page">
                  <h1>This page slipped away.</h1>
                  <NavLink to="/">Return to your library</NavLink>
                </div>
              }
            />
          </Routes>
          <footer>
            Made for slow reading. And lasting thoughts.
            <span>MARGINALIA · A READING COMPANION</span>
          </footer>
        </main>
      </div>
      <dialog
        ref={dialog}
        onCancel={() => setAdding(false)}
        onClose={() => setAdding(false)}
      >
        <button
          className="close"
          aria-label="Close"
          onClick={() => setAdding(false)}
        >
          <X />
        </button>
        <span className="eyebrow">YOUR NEXT CHAPTER</span>
        <h2>Add a book</h2>
        <p>
          Book creation arrives with the private-library phase. For now, explore
          the sample reading experience.
        </p>
        <button
          className="primary"
          onClick={() => {
            setSample(true);
            setAdding(false);
          }}
        >
          Explore sample library <ArrowRight size={17} />
        </button>
      </dialog>
      {notice && (
        <div className="toast" role="status">
          {notice}
          <button
            aria-label="Dismiss notification"
            onClick={() => setNotice("")}
          >
            <X size={16} />
          </button>
        </div>
      )}
    </>
  );
}
function LibraryPage({
  sample,
  setSample,
  onAdd,
}: {
  sample: boolean;
  setSample: (v: boolean) => void;
  onAdd: () => void;
}) {
  const navigate = useNavigate();
  return (
    <div className="page">
      <div className="page-title">
        <div>
          <span className="eyebrow">THE PERSONAL COLLECTION</span>
          <h1>Your library.</h1>
          <p>
            Some books stay with you.
            <br className="mobile-break" /> Give your thoughts a place to stay,
            too.
          </p>
        </div>
        <button className="primary" onClick={onAdd}>
          <Plus size={18} />
          Add a book
        </button>
      </div>
      <div className="section-label">
        <span>{sample ? "ON YOUR NIGHTSTAND" : "A NEW BEGINNING"}</span>
        <button className="text-button" onClick={() => setSample(!sample)}>
          {sample ? "View empty library" : "Explore sample library"}{" "}
          <ArrowUpRight size={15} />
        </button>
      </div>
      {sample ? (
        <div className="books">
          {books.map((b) => (
            <button
              className="book-card"
              key={b.title}
              onClick={() => navigate("/journal")}
            >
              <Cover book={b} />
              <div className="book-meta">
                <span>{b.progress}</span>
                <span>{b.entries} notes</span>
              </div>
              <h3>{b.title}</h3>
              <p>{b.author}</p>
            </button>
          ))}
        </div>
      ) : (
        <div className="empty-library">
          <div className="empty-art" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
          <span className="eyebrow">EVERY READER STARTS SOMEWHERE</span>
          <h2>
            One book.
            <br />A world of thoughts.
          </h2>
          <p>
            Add what you’re reading. Collect the questions,
            <br />
            discoveries and little moments along the way.
          </p>
          <button className="primary" onClick={onAdd}>
            Begin your first journal <ArrowRight size={17} />
          </button>
        </div>
      )}
      <div className="discovery">
        <span className="discovery-star">✳</span>
        <div>
          <span className="eyebrow">SAME BOOK. ANOTHER WORLD.</span>
          <h2>See it through someone else’s eyes.</h2>
          <p>Discover the thoughts a familiar book left with another reader.</p>
        </div>
        <NavLink
          className="round-link"
          to="/gallery"
          aria-label="Explore journal gallery"
        >
          <ArrowUpRight />
        </NavLink>
      </div>
    </div>
  );
}
function Journal() {
  const [note, setNote] = React.useState("");
  const [saved, setSaved] = React.useState(false);
  return (
    <div className="page journal-page">
      <span className="eyebrow">SAMPLE JOURNAL · ALBERT CAMUS</span>
      <div className="page-title">
        <div>
          <h1>The Myth of Sisyphus</h1>
          <p>A conversation with a book. And with yourself.</p>
        </div>
        <NavLink className="primary" to="/ask">
          Ask a question <ArrowUpRight size={17} />
        </NavLink>
      </div>
      <div className="journal-toolbar">
        <span>Timeline</span>
        <span>12 sample entries · Chapter II</span>
      </div>
      <div className="journal-layout">
        <div>
          <article className="entry">
            <div className="entry-meta">
              01 <span>REFLECTION · CHAPTER II</span>
              <Feather size={17} />
            </div>
            <h2>Perhaps clarity is a kind of courage.</h2>
            <p>
              I came to this book expecting an answer. What stays with me
              instead is the invitation to look at the question without turning
              away.
            </p>
            <p>
              Can an ordinary day be enough, even when I cannot explain what it
              is all for?
            </p>
            <div className="tags">
              <span>meaning</span>
              <span>the everyday</span>
            </div>
            <details>
              <summary>
                Companion note <ChevronDown size={15} />
              </summary>
              <p>
                Illustrative explanation: one reading distinguishes accepting
                uncertainty from giving up. This sample is not a verified
                interpretation of a particular passage.
              </p>
            </details>
          </article>
          <article className="entry composer">
            <span className="eyebrow">IN YOUR OWN WORDS</span>
            <h2>What’s staying with you?</h2>
            <label className="sr-only" htmlFor="reflection">
              Your reflection
            </label>
            <textarea
              id="reflection"
              value={note}
              onChange={(e) => {
                setNote(e.target.value);
                setSaved(false);
              }}
              placeholder="A question, a connection, a feeling…"
            />
            <div>
              <small>Preview only · not stored after leaving</small>
              <button
                className="primary"
                disabled={!note.trim()}
                onClick={() => setSaved(true)}
              >
                {saved ? "Previewed ✓" : "Preview reflection"}
              </button>
            </div>
            {saved && <p role="status">Your reflection: {note}</p>}
          </article>
        </div>
        <div className="margin-note">
          <span className="eyebrow">BETWEEN THE LINES</span>
          <p>
            You don’t need a finished thought.
            <br />
            Just a place to begin.
          </p>
          <div className="fine-rule" />
          <span>YOUR VOICE COMES FIRST.</span>
          <p className="small-copy">
            Companion notes sit beside your reflections, giving you room to make
            up your own mind.
          </p>
        </div>
      </div>
    </div>
  );
}
function Ask({ onNotice }: { onNotice: (s: string) => void }) {
  const [text, setText] = React.useState("");
  const [answer, setAnswer] = React.useState(false);
  return (
    <div className="page ask-page">
      <NavLink className="back" to="/journal">
        ← Back to sample journal
      </NavLink>
      <span className="eyebrow">THE MYTH OF SISYPHUS · READING COMPANION</span>
      <h1>
        A little clarity.
        <br />
        Then, back to the book.
      </h1>
      <p>A word you don’t know. A line you can’t let go.</p>
      <div className="ask-box">
        <label htmlFor="question">What are you wondering about?</label>
        <textarea
          id="question"
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            setAnswer(false);
          }}
          placeholder="Type a word, a passage, or your question…"
        />
        <div className="ask-actions">
          <div>
            <button
              aria-label="Photograph a passage"
              onClick={() =>
                onNotice(
                  "Camera extraction will be connected in the assisted-reading phase.",
                )
              }
            >
              <Camera size={21} />
            </button>
            <button
              aria-label="Dictate a question"
              onClick={() =>
                onNotice(
                  "Voice transcription will be connected in the assisted-reading phase.",
                )
              }
            >
              <Mic size={21} />
            </button>
          </div>
          <button
            className="primary"
            disabled={!text.trim()}
            onClick={() => setAnswer(true)}
          >
            Preview answer layout <ArrowRight size={17} />
          </button>
        </div>
      </div>
      <label className="try-first">
        <input
          type="checkbox"
          onChange={(e) => {
            const field = document.getElementById("first");
            if (field) field.hidden = !e.target.checked;
          }}
        />
        I’d like to try my own interpretation first
      </label>
      <textarea
        id="first"
        aria-label="Your interpretation"
        hidden
        placeholder="I think this might mean…"
      />
      {answer && (
        <article className="entry answer">
          <span className="eyebrow">
            ILLUSTRATIVE LAYOUT · NO AI REQUEST WAS SENT
          </span>
          <h2>Plain meaning</h2>
          <p>
            Your explanation will appear here, grounded in the passage you
            choose. This preview does not generate an answer to your question.
          </p>
          {[
            "In the context of this book",
            "Other ways to read it",
            "A note on translation",
          ].map((t) => (
            <details key={t}>
              <summary>
                {t}
                <Plus size={16} />
              </summary>
              <p>
                This layer will distinguish supported evidence from
                interpretation and explain uncertainty where relevant.
              </p>
            </details>
          ))}
        </article>
      )}
      <p className="quiet">Your questions belong to your private journal.</p>
    </div>
  );
}
function Gallery() {
  const [query, setQuery] = React.useState("");
  const [selected, setSelected] = React.useState<string | null>(null);
  const items = books.filter((b) =>
    `${b.title} ${b.author}`.toLowerCase().includes(query.toLowerCase()),
  );
  return (
    <div className="page">
      <span className="eyebrow">THE SHARED COLLECTION</span>
      <div className="page-title">
        <div>
          <h1>
            One book.
            <br />
            Many ways of seeing.
          </h1>
          <p>
            A gallery of reading lives. Find a perspective that opens yours.
          </p>
        </div>
        <span className="gallery-seal" aria-hidden="true">
          READ
          <br />
          REFLECT
          <br />
          REPEAT ↗
        </span>
      </div>
      <div className="gallery-search">
        <Search size={18} />
        <input
          aria-label="Search sample journals by book or author"
          placeholder="Find a book or an author"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <span>SAMPLE COLLECTION</span>
      </div>
      <div className="gallery-grid">
        {items.map((b, i) => (
          <button
            className="gallery-card"
            key={b.title}
            onClick={() => setSelected(selected === b.title ? null : b.title)}
          >
            <div className={`gallery-image ${b.color}`}>
              <Cover book={b} small />
            </div>
            <div className="gallery-body">
              <span className="eyebrow">
                {i === 0
                  ? "ON FINDING MEANING"
                  : i === 1
                    ? "ON MAKING SPACE"
                    : "ON LIVING THE QUESTIONS"}
              </span>
              <h2>{b.title}</h2>
              <p>{b.subtitle}</p>
              <div className="gallery-byline">
                <span className="avatar">{["E", "J", "A"][i]}</span>
                <span>
                  Illustrative reader {i + 1}
                  <small>Sample journal · spoilers possible</small>
                </span>
                <ArrowUpRight size={19} />
              </div>
              {selected === b.title && (
                <p className="sample-excerpt">
                  Sample reflection: I am noticing how differently this book
                  reads when I slow down. Some questions deserve to stay open a
                  little longer.
                </p>
              )}
            </div>
          </button>
        ))}
      </div>
      {!items.length && (
        <div className="empty-search">
          <h2>No sample journals found.</h2>
          <p>Try a different book title or author.</p>
        </div>
      )}
      <p className="gallery-note">
        A journal appears here only when its reader chooses to share it.
      </p>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);
