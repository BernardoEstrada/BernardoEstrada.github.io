import { Themes } from "./themes";
import { Helmet } from "react-helmet";

// React helper that keeps using Helmet to set the <html> data-theme
export default function Themefy(props: { theme: Themes }) {
  return <Helmet htmlAttributes={{ "data-theme": props.theme }} />;
}
