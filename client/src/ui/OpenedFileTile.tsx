import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { init } from "../store/slice/appStateSlice";
import {
  openFile,
  removeFileFromOpenedFiles,
} from "../store/slice/filesSlice";
import ThemeModeIcon from "./ThemeModeIcon";
import { File } from "../entities";

const StyledOpenedFileTile = styled.div`
  display: flex;
  gap: 1rem;
  height: 100%;
  padding: 0 0 0 0.5rem;
  align-items: center;
  justify-content: start;
  box-shadow: var(--shadow-sm);

  &:hover {
    background-color: var(--color-grey-100);
  }

  & > button {
    height: 90%;
    padding: 0 1rem;
    border: none;
    background-color: transparent;

    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
  }

  & img {
    width: 1rem;
  }

  & > span {
    font-size: 1.2rem;
  }

  &.current {
    background-color: var(--color-brand-600);
    color: var(--color-white);
  }
  &.current:hover {
    background-color: var(--color-brand-800);
    color: var(--color-white);
  }
`;

export default function OpenedFileTile({
  file,
  isCurrent,
}: {
  file: File;
  isCurrent: boolean;
}) {
  const dispatch = useAppDispatch();
  const openedFiles = useAppSelector((state) => state.files.openedFiles);

  return (
    <StyledOpenedFileTile className={isCurrent ? "current" : ""}>
      <button onClick={() => dispatch(openFile(file))}>
        <ThemeModeIcon src="/assets/icon-document-light.svg" />
        <span>{file.pathName}</span>
      </button>
      <button
        onClick={() => {
          dispatch(removeFileFromOpenedFiles(file));
          if (openedFiles.length === 0) {
            dispatch(init());
          }
        }}
      >
        <img src="/assets/icon-close.svg" alt="close" />
      </button>
    </StyledOpenedFileTile>
  );
}
