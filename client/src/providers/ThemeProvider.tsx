import { PropsWithChildren,useEffect } from "react";
import { useAppSelector } from "../store/hooks";
import { getTheme } from "../store/slice/theme";

export default function ThemeProvider({ children }: PropsWithChildren) {
   const isDarkMode = useAppSelector(getTheme);

   useEffect(() => {
     if (isDarkMode) {
       document.documentElement.classList.add("dark-mode");
       document.documentElement.classList.remove("light-mode");
     } else {
       document.documentElement.classList.add("light-mode");
       document.documentElement.classList.remove("dark-mode");
     }
   }, [isDarkMode]);
  
  return <>{children}</>;
}
