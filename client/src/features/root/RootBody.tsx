import { PropsWithChildren } from "react";
import styled from "styled-components";

const StyledRootBody = styled.div`
  height: 90vh;
`;

export default function RootBody({ children }: PropsWithChildren) {
  return <StyledRootBody>{children}</StyledRootBody>;
}
