import { ReactNode } from "react";
import styled from "styled-components";
import { FileType } from "../store/slice/filesSlice";

const StyledFileTileListMb = styled.div`
  display: flex;
  justify-content: start;
  align-items: start;
  height: 100%;

  @media screen and (min-width: 75em) {
    display: none;
  }
`;

export default function FileTileListMb({
  render,
  files,
}: {
  files: FileType[];
  render(file: FileType): ReactNode;
}) {
  return (
    <StyledFileTileListMb>
      {files.map((file) => render(file))}
    </StyledFileTileListMb>
  );
}
