import { useEffect, useRef } from "react";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  getPreviewState,
  togglePreview,
} from "../../store/slice/editorActionsSlice";
import {
  getCurrentFile,
  setCurrentFileContent,
} from "../../store/slice/filesSlice";

const StyledComposeMarkdown = styled.div`
  position: relative;

  height: 100%;
  flex: 1;
  overflow-y: hidden;
  padding-bottom: 2rem;
  z-index: 10;
`;

const StyledEditor = styled.textarea`
  height: 100%;
  width: 100%;
  box-shadow: 0;
  padding: 2rem 1rem;
  overflow: auto;
  outline: none;
  background-color: transparent;

  &:focus {
    outline: none;
  }
`;

export const StyledComposeHeader = styled.div`
  position: absolute;
  top: 0.5px;
  right: 0;
  z-index: 900;
  padding: 1rem 2rem;
  width: max-content;

  display: flex;
  justify-content: flex-end;
  align-items: center;

  & button.visible-lg {
    display: none !important;
  }

  & button.visible-sm {
    display: flex !important;
  }

  @media screen and (min-width: 75em) {
    & button.visible-lg {
      display: flex !important;
    }

    & button.visible-sm {
      display: none !important;
    }
  }
`;

export const StyledButton = styled.button`
  border: none;
  background-color: var(--color-gre-0);
  box-shadow: var(--shadow-sm);

  width: 4rem;
  height: 4rem;
  border-radius: 2rem;

  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    box-shadow: var(--shadow-md);
  }

  & > img {
    width: 1.7rem;
  }
`;

//@ts-expect-error correct
const BASE_URL = import.meta.env.VITE_BASE_URL;
 

export default function EditorComposeMarkdown() {
  const ref = useRef<HTMLTextAreaElement>(null);
  const dispatch = useAppDispatch();
  const { content } = useAppSelector(getCurrentFile);
  const previewState = useAppSelector(getPreviewState);
  const current = useAppSelector(getCurrentFile);

  useEffect(() => {
    if (ref?.current) {
      ref.current.focus();
    }
  });

  return (
    <StyledComposeMarkdown>
      <StyledComposeHeader>
        <StyledButton
          className="visible-lg"
          onClick={() => dispatch(togglePreview())}
        >
          <img
            src={
              previewState
                ? "/assets/icon-show-preview.svg"
                : "/assets/icon-hide-preview.svg"
            }
          />
        </StyledButton>
        <StyledButton
          className="visible-sm"
          onClick={() => dispatch(togglePreview())}
        >
          <img src={"/assets/icon-hide-preview.svg"} />
        </StyledButton>
        <StyledButton
          as="a"
          download={`${current.fileId}-${current.pathName}`}
          href={`${BASE_URL}/files/download/${current.fileId}`}
        >
          <img src="/assets/icon-download.svg" />
        </StyledButton>
      </StyledComposeHeader>
      <StyledEditor
        ref={ref}
        value={content}
        onChange={(e) => {
          dispatch(setCurrentFileContent(e.target.value));
        }}
        style={{ border: "none" }}
      />
    </StyledComposeMarkdown>
  );
}
