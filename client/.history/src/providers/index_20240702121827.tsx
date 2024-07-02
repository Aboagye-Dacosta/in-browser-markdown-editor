import { PropsWithChildren } from "react";

import CustomToaster from "../ui/CustomToaster";
import ReactQueryProvider from "./ReactQueryProvider";
import ReduxStoreProvider from "./ReduxStoreProvider";
import ThemeProvider from "./ThemeProvider";

export default function Provider({ children }: PropsWithChildren) {
  return (
    <ReactQueryProvider>
      <ReduxStoreProvider>
        <ThemeProvider>
          {children}
          <CustomToaster />
        </ThemeProvider>
      </ReduxStoreProvider>
    </ReactQueryProvider>
  );
}
