import { useState, lazy, Suspense } from "react";
import { DEFAULT_DARK, getThemeColors } from "@theme";
import { resume } from "@portfolios/data/resume";
import { Helmet } from "react-helmet";
import { ParallaxProvider } from "react-scroll-parallax";

const Themefy = lazy(() => import("../../theme/Themefy").then((m) => ({ default: m.default })));
const NavBar = lazy(() => import("./components/NavBar"));
const Landing = lazy(() => import("./components/Landing"));
const WIPCard = lazy(() => import("./components/WIP.card"));
const AboutCard = lazy(() => import("./components/AboutCard"));
const BubbleChart = lazy(() => import("./components/BubbleChart"));

export default function App() {
  const [theme, setTheme] = useState(DEFAULT_DARK);
  const [colors, setColors] = useState(getThemeColors());

  return (
    <>
      <Suspense fallback={null}>
        <Themefy theme={theme} />
      </Suspense>
      <Helmet>
        <title>{resume.basics.name}</title>
        <meta name="description" content={resume.basics.headline} />
        <meta name="theme-color" content={colors.b1} />
      </Helmet>
      <Suspense fallback={null}>
        <NavBar theme={theme} setTheme={setTheme} setColors={setColors} />
      </Suspense>

      <ParallaxProvider>
        <Suspense fallback={null}>
          <Landing resume={resume} />
        </Suspense>
        <div className="min-h-screen flex flex-col justify-center items-center w-full px-4 sm:px-6 py-12">
          <Suspense fallback={null}>
            <WIPCard />
          </Suspense>
        </div>
        {false && (
          <div>
            <Suspense fallback={null}>
              <AboutCard resume={resume} />
              <BubbleChart themeColors={colors} />
            </Suspense>
          </div>
        )}
      </ParallaxProvider>
    </>
  );
}
