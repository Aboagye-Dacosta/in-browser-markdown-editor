import { PropsWithChildren } from "react";
import styled from "styled-components";
import { useAppSelector } from "../../store/hooks";
import FileTileListMb from "../../ui/FileTileListMb";
import OpenedFileTile from "../../ui/OpenedFileTile";
import RootBody from "./RootBody";
import RootHeader from "./RootHeader";

const StyledRootLayout = styled.div`
  display: grid;
  grid-template-rows: 5rem 3rem 1fr;
  background-color: var(--color-grey-0);
  height: 100vh;
  overflow: hidden;

  @media screen and (min-width: 75em) {
    display: grid;
    grid-template-rows: 5rem 1fr;
    margin: 3rem 5rem;
  }
`;

const StyledMobileOpenedList = styled.div`
  display: flex;
  width:100%;
  overflow-x: auto;

  @media screen and (min-width: 75em) {
    display: none;
  }
`;

export default function RootLayout({ children }: PropsWithChildren) {
  const { current, openedFiles } = useAppSelector((state) => state.files);

  return (
    <StyledRootLayout>
      <RootHeader />
      <StyledMobileOpenedList>
        <FileTileListMb
          files={openedFiles}
          render={(file) => (
            <OpenedFileTile
              file={file}
              key={file.fileId}
              isCurrent={file.fileId == current?.fileId}
            />
          )}
        />
      </StyledMobileOpenedList>
      <RootBody>{children}</RootBody>
    </StyledRootLayout>
  );
}
