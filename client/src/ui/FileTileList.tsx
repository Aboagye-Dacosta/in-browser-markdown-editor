import { ReactNode } from "react";
import styled from "styled-components";
import { FileType } from "../store/slice/filesSlice";

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
  files: FileType[];
  render(file: FileType): ReactNode;
}) {
  return (
    <StyledFileTileList>{files.map((file) => render(file))}</StyledFileTileList>
  );
}
