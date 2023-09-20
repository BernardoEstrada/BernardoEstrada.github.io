import { DEFAULT_DARK, DEFAULT_LIGHT, Themes, getThemeColors } from "../utils/Theme"
import { SunIcon, MoonIcon, ChevronDownIcon } from "@heroicons/react/24/solid"
import { useEffect, useState } from "react";
import { usePrefersColorScheme } from "use-prefers-color-scheme"

export default function NavBar (props: {
  theme: Themes,
  setTheme: (theme: Themes) => void,
  setColors: (colors: Record<string, string>) => void,
}) {
  const preferredTheme = localStorage.getItem('theme') as Themes || Themes.DEVICE_SETTINGS
  const {theme, setTheme, setColors} = props;
  const [selectedTheme, setSelectedTheme] = useState(preferredTheme)

  const preferredScheme = usePrefersColorScheme();
  useEffect(() => {
    if (selectedTheme === Themes.DEVICE_SETTINGS) {
      switch (preferredScheme) {
        case 'dark': setTheme(DEFAULT_DARK); break;
        case 'light': setTheme(DEFAULT_LIGHT); break;
        default: setTheme(DEFAULT_DARK); break;
      }
    }
    else setTheme(selectedTheme)
    localStorage.setItem('theme', selectedTheme)
    setTimeout(() => setColors(getThemeColors()), 0)
  }, [selectedTheme, preferredScheme, theme, setTheme, setColors])

  return (
    <div className="flex flex-row-reverse fixed right-0 z-50">
      <div className="join m-5 mr-0">
        <div className='btn join-item'>
          <label className="swap swap-rotate">
            <input type="checkbox" checked={selectedTheme===DEFAULT_DARK} onChange={e => setSelectedTheme(e.target.checked?DEFAULT_DARK:DEFAULT_LIGHT)}/>
            <SunIcon className="swap-on fill-current w-8 h-8"/>
            <MoonIcon className="swap-off fill-current w-7 h-7"/>
          </label>
        </div>
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn join-item">
            <ChevronDownIcon className="w-5 h-5"/>
          </label>
          <div className="dropdown-content z-[1] menu pt-2 shadow bg-base-200 rounded-box w-52 overflow-scroll h-52 scroll-m-0 no-scrollbar">
            <ul tabIndex={0}>
              {Object.values(Themes).map((t, index) => (
                <li key={index} onClick={() => setSelectedTheme(t)}>
                  <a className={t === selectedTheme ? 'active' : ''}>
                    {t.charAt(0).toLocaleUpperCase()+t.slice(1).replace('-', ' ')}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}