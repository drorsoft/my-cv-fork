import { AppRouter } from "./router/AppRouter";
import { BrowserRouter } from "react-router";

export function App() {
  return (
    <div
      style={{
        backgroundImage: `url(${import.meta.env.BASE_URL}background.avif)`,
      }}
      className={
        "  bg-cover bg-center bg-no-repeat transition-all duration-300  h-screen w-screen  overflow-hidden print:bg-none print:h-auto print:overflow-visible"
      }
    >
      <button
        onClick={() => window.print()}
        title="Print"
        className="fixed top-4 right-4 z-50 bg-white/90 hover:bg-white text-slate-700 rounded-full p-2.5 shadow-lg transition-colors print:hidden"
        aria-label="Print"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="6 9 6 2 18 2 18 9" />
          <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
          <rect x="6" y="14" width="12" height="8" />
        </svg>
      </button>
      <div className="h-screen overflow-y-scroll backdrop-blur-sm print:overflow-visible print:h-auto print:backdrop-blur-none">
        <BrowserRouter basename={import.meta.env.BASE_URL}>
          <AppRouter />
        </BrowserRouter>
      </div>
    </div>
  );
}
