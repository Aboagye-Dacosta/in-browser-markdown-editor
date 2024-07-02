import { useAppSelector } from "../store/hooks";
import { getTheme } from "../store/slice/theme";

export default function ThemeModeIcon({
  src,
  alt,
  className,
  style,
}: {
  src: string;
  alt?: string;
  className?: string;
  style?: object;
}) {
  const  isDarkMode = useAppSelector(getTheme)

  return (
    <img
      src={
        isDarkMode ? src.replace("dark", "light") : src.replace("light", "dark")
      }
      alt={alt}
      className={className}
      style={style}
    />
  );
}
