import { ReactNode } from "react";
import styled from "styled-components";
import { File } from "../entities";

const StyledFileTileList = styled.div`
  display: none;

  @media screen and (min-width: 75em) {
    display: flex;
    gap: 0.5rem;
    justify-content: start;
    align-items: start;
    height: 100%;
  }
`;

export default function FileTileList({
  render,
  files,
}: {
  files: File[];
  render(file: File): ReactNode;
}) {
  return (
    <StyledFileTileList>{files.map((file) => render(file))}</StyledFileTileList>
  );
}
