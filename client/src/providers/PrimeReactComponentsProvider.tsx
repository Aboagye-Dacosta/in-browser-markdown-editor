import { PrimeReactProvider } from "primereact/api";
import { PropsWithChildren } from "react";

export default function PrimeReactComponentsProvider({
  children,
}: PropsWithChildren) {
  return <PrimeReactProvider>{children}</PrimeReactProvider>;
}
