// import { Link } from "react-router-dom";
import { lazy, Suspense } from "react";

const WipPortfolio = lazy(() => import("./portfolios/wip-page/App"));

export default function HomePage() {
  return (
    <Suspense fallback={null}>
      <WipPortfolio />
    </Suspense>
    // <div className="flex flex-col items-center justify-center h-screen">
    //   <h1 className="text-4xl font-bold">HomePage</h1>
    //   <Link to="/portfolio/os">Portfolio</Link>
    //   <Link to="/portfolio/editor">Editor</Link>
    //   <Link to="/portfolio/wip">WIP</Link>
    // </div>
  );
}
