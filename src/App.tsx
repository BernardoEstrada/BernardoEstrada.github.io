import { useEffect, useState } from 'react'
import Themefy, { DEFAULT_DARK, DEFAULT_LIGHT, Themes, getThemeColors } from './utils/Theme'
import resume from '@assets/BernardoEstrada.resume.json' assert { type: "json" }
import BubbleChart from './components/BubbleChart'
import NavBar from './components/NavBar'
import Landing from './components/Landing'
import { Helmet } from 'react-helmet'
import usePrefersColorScheme from 'use-prefers-color-scheme'
import faviconDark from '@assets/favicon/favicon-dark.svg' assert { type: "svg" }
import faviconLight from '@assets/favicon/favicon-light.svg' assert { type: "svg" }

console.log('%c Hello There!', 'font-size: 36px; font-weight: bold');
function App() {
  const preferredScheme = usePrefersColorScheme();
  const preferredTheme = localStorage.getItem('theme') as Themes || Themes.DEVICE_SETTINGS
  const [theme, setTheme] = useState(preferredTheme)
  const [colors, setColors] = useState(getThemeColors())

  useEffect(() => {
    localStorage.setItem('theme', theme)
    if (theme === Themes.DEVICE_SETTINGS) setTheme(preferredScheme === 'dark' ? DEFAULT_DARK : DEFAULT_LIGHT)
    setTimeout(() => setColors(getThemeColors()), 0)
  }, [theme])
  useEffect(() => {
    if (theme === DEFAULT_DARK && preferredScheme !== 'dark') setTheme(DEFAULT_LIGHT)
    if (theme === DEFAULT_LIGHT && preferredScheme === 'dark') setTheme(DEFAULT_DARK)
  }, [preferredScheme])

  const getIcon = (schema: "dark" | "light" | "no-preference") => {
    if (schema === 'dark') return faviconDark
    if (schema === 'light') return faviconLight
    return theme === DEFAULT_DARK ? faviconDark : faviconLight
  }

  return (
    <>
      <Themefy theme={theme} />
      <Helmet >
        <title>{resume.basics.name}</title>
        <meta name="description" content={resume.basics.headline} />
        <link rel="icon" type="image/svg+xml" href={getIcon(preferredScheme)} />
      </Helmet>
      <NavBar theme={theme} setTheme={setTheme} />

      <Landing />
      <div className="hidden">
        {/* todo */}
        <br/>
        <span className="text-blue-500 ">{resume.basics.summary}</span>
        <BubbleChart themeColors={colors} />
      </div>
    </>
  )
}

export default App
