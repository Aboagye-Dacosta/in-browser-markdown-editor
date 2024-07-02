import styled from "styled-components";
import { useAppSelector } from "../../store/hooks";
import {
  getMaximizeState,
  getPreviewState,
} from "../../store/slice/editorActionsSlice";
import EditorComposeMarkdown from "./EditorComposeMarkdown";
import RenderMarkdown from "./RenderMarkdown";

const StyledEditorLayout = styled.div`
  width: 100%;
  height: 100%;

  align-items: start;
  justify-content: start;

  &.layout-sm {
    display: flex;
  }
  &.layout-lg {
    display: none;
  }

  @media screen and (min-width: 75em) {
    &.layout-sm {
      display: none;
    }
    &.layout-lg {
      display: flex;
    }
  }
`;

const Divider = styled.div`
  height: 100%;
  width: 2px;
  background-color: var(--color-grey-100);
`;

export default function EditorLayout() {
  const previewState = useAppSelector(getPreviewState);
  const maximizeState = useAppSelector(getMaximizeState);

  return (
    <>
      <StyledEditorLayout className="layout-lg">
        {!maximizeState && <EditorComposeMarkdown />}
        {previewState && <Divider />}
        {previewState && <RenderMarkdown />}
      </StyledEditorLayout>
      <StyledEditorLayout className="layout-sm">
        {!previewState && <EditorComposeMarkdown />}
        {previewState && <RenderMarkdown />}
      </StyledEditorLayout>
    </>
  );
}
