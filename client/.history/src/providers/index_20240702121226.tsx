import { PropsWithChildren } from "react";
import PrimeReactComponentsProvider from "./PrimeReactComponentsProvider";
import ReactQueryProvider from "./ReactQueryProvider";
import ReduxStoreProvider from "./ReduxStoreProvider";
import ThemeProvider from "./ThemeProvider";
import CustomToaster from "../ui/CustomToaster";

export default function Provider({ children }: PropsWithChildren) {
  return (
    <ReactQueryProvider>
      <ReduxStoreProvider>
        
          <ThemeProvider>{children}
            <CustomToaster/>
          </ThemeProvider>
        
      </ReduxStoreProvider>
    </ReactQueryProvider>
  );
}
