import { useState } from "react";
import { DEFAULT_DARK, getThemeColors, Themefy } from "@theme";
import { resume } from "@portfolios/data/resume";
import BubbleChart from "./components/BubbleChart";
import NavBar from "./components/NavBar";
import Landing from "./components/Landing";
import { Helmet } from "react-helmet";
import { ParallaxProvider } from "react-scroll-parallax";
import AboutCard from "./components/AboutCard";
import WIPCard from "./components/WIP.card";

export default function App() {
  const [theme, setTheme] = useState(DEFAULT_DARK);
  const [colors, setColors] = useState(getThemeColors());

  return (
    <>
      <Themefy theme={theme} />
      <Helmet>
        <title>{resume.basics.name}</title>
        <meta name="description" content={resume.basics.headline} />
        <meta name="theme-color" content={colors.b1} />
      </Helmet>
      <NavBar theme={theme} setTheme={setTheme} setColors={setColors} />

      <ParallaxProvider>
        <Landing resume={resume} />
        <div className="min-h-screen flex flex-col justify-center items-center w-full px-4 sm:px-6 py-12">
          <WIPCard />
        </div>
        {false && (
          <div>
            {/* todo */}
            <AboutCard resume={resume} />
            <BubbleChart themeColors={colors} />
          </div>
        )}
      </ParallaxProvider>
    </>
  );
}
