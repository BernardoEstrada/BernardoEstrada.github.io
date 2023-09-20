import { useState } from 'react'
import Themefy, { DEFAULT_DARK, getThemeColors } from './utils/Theme'
import resume from '@assets/BernardoEstrada.resume.json' assert { type: "json" }
import BubbleChart from './components/BubbleChart'
import NavBar from './components/NavBar'
import Landing from './components/Landing'
import { Helmet } from 'react-helmet'
import { ParallaxProvider, Parallax } from 'react-scroll-parallax'

console.log('%c Hello There!', 'font-size: 36px; font-weight: bold');
function App() {
  const [theme, setTheme] = useState(DEFAULT_DARK)
  const [colors, setColors] = useState(getThemeColors())

  return (
    <>
      <Themefy theme={theme} />
      <Helmet >
        <title>{resume.basics.name}</title>
        <meta name="description" content={resume.basics.headline} />
        <meta name="theme-color" content={colors.b1} />
      </Helmet>
      <NavBar theme={theme} setTheme={setTheme} setColors={setColors} />

      <ParallaxProvider>
        <Landing />
        <div>
          {/* todo */}
          <Parallax speed={10}>
            <div className="container w-full backdrop-blur-lg">
              <div className="card w-96 bg-base-100 shadow-xl">
                <div className="card-body">
                  <h2 className="card-title">About me</h2>
                  <p className="text-blue-500 ">{resume.basics.summary}</p>
                </div>
              </div>
            </div>
          </Parallax>
          <BubbleChart themeColors={colors} />
          <BubbleChart themeColors={colors} />
          <BubbleChart themeColors={colors} />
          <BubbleChart themeColors={colors} />
          <BubbleChart themeColors={colors} />
          <BubbleChart themeColors={colors} />
        </div>
      </ParallaxProvider>
    </>
  )
}

export default App
