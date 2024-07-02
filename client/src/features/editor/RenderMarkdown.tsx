import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { getCurrentFile } from "../../store/slice/filesSlice";
//@ts-expect-error package is available
import markdownit from "markdown-it";
import {
  getMaximizeState,
  toggleMaximize,
  togglePreview,
} from "../../store/slice/editorActionsSlice";
import { StyledButton, StyledComposeHeader } from "./EditorComposeMarkdown";
import ParsedHtml from "./ParsedHtml";


const StyledRenderMarkdown = styled.div`
  flex: 1;
  padding: 2rem 3rem;
  position: relative;
  height: 100%;
  overflow: auto;

  font-size: 1rem;
`;

export default function RenderMarkdown() {
  const dispatch = useAppDispatch();
  const { content } = useAppSelector(getCurrentFile);
  const maximize = useAppSelector(getMaximizeState);
  const md = markdownit();
  const result = md.render(content ?? "");

  return (
    <StyledRenderMarkdown>
      <StyledComposeHeader>
        <StyledButton
          className="visible-lg"
          onClick={() => dispatch(toggleMaximize())}
        >
          <img
            src={
              maximize
                ? "/assets/icon-minimize.svg"
                : "/assets/icon-maximize.svg"
            }
          />
        </StyledButton>

        <StyledButton
          className="visible-sm"
          onClick={() => dispatch(togglePreview())}
        >
          <img className="visible-sm" src={"/assets/icon-show-preview.svg"} />
        </StyledButton>
      </StyledComposeHeader>
      <ParsedHtml result={result} />
    </StyledRenderMarkdown>
  );
}
