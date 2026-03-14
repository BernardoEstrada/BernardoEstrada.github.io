import { Suspense, lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const HomePage = lazy(() => import("./HomePage"));
const NotFoundPage = lazy(() => import("./NotFoundPage"));
const OsPortfolio = lazy(() => import("./portfolios/os/App"));
const EditorPortfolio = lazy(() => import("./portfolios/editor/App"));
const WipPortfolio = lazy(() => import("./portfolios/wip-page/App"));

export default function App() {
  return (
    <BrowserRouter basename="">
      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/portfolio/os" element={<OsPortfolio />} />
          <Route path="/portfolio/os/:os" element={<OsPortfolio />} />
          <Route path="/portfolio/wip" element={<WipPortfolio />} />
          <Route path="/portfolio/editor" element={<EditorPortfolio />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
