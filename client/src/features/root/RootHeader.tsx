import { Fragment, useEffect } from "react";
import styled from "styled-components";
import { useDeleteFile } from "../../hooks/useDeleteFile";
import { useUpdateFile } from "../../hooks/useUpdateFile";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { init } from "../../store/slice/appStateSlice";
import { removeFileFromOpenedFiles } from "../../store/slice/filesSlice";
import { toggleTheme } from "../../store/slice/theme";
import AllRecentFiles from "../../ui/AllRecentFiles";
import Button from "../../ui/Button";
import DropDownMenu from "../../ui/DropDownMenu";
import FileTileList from "../../ui/FileTileList";
import Modal from "../../ui/Modal";
import NewFileForm from "../../ui/NewFileForm";
import OpenedFileTile from "../../ui/OpenedFileTile";
import SpinnerSm from "../../ui/SpinnerSm";
import ThemeModeIcon from "../../ui/ThemeModeIcon";

const StyledRootHeader = styled.div`
  box-shadow: var(--shadow-sm);
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  gap: 1rem;

  z-index: 1000;

  & > div {
    display: flex;
    justify-content: start;
    align-items: center;
    height: 100%;
    gap: 2rem;
  }
`;

const StyledSaveAndDelete = styled.div`
  gap: 1rem;
  margin-right: 2rem;
`;

const StyledButton = styled(Button)`
  display: none;

  @media screen and (min-width: 56.25em) {
    display: block;
    border-radius: 0 !important;
    padding: 1rem 2rem;

    & .theme-btn {
      width: 4rem;
      height: 4rem;
      border-radius: 2rem;
      box-shadow: var(--shadow-sm);
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
`;

const StyledThemeButton = styled.button`
  width: 4rem;
  height: 4rem;
  border-radius: 2rem;
  box-shadow: var(--shadow-sm);
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;

  background-color: var(--color-grey-0);

  &.delete-btn {
    display: none;
  }

  &:hover {
    box-shadow: var(--shadow-md);
  }

  @media screen and (min-width: 56.25em) {
    &.delete-btn {
      display: flex;
    }
  }
`;

const Divider = styled.div`
  display: none;

  @media screen and (min-width: 75em) {
    display: block;
    width: 2px;
    height: 100%;
    background-color: var(--color-grey-100);
  }
`;

export default function RootHeader() {
  const dispatch = useAppDispatch();
  const { current, openedFiles } = useAppSelector((state) => state.files);
  const { isPendingDeleteFile, deleteFile } = useDeleteFile();
  const { isPendingFileUpdate, updateFile } = useUpdateFile();

  const hasData = openedFiles.length > 0;

  useEffect(() => {
    if (openedFiles.length === 0) {
      dispatch(init());
    }
  }, [dispatch, openedFiles.length]);

  const handleDeleteFile = () => {
    deleteFile(current, {
      onSuccess: () => {
        dispatch(removeFileFromOpenedFiles(current));
      },
    });
  };

  const handleUpdateFile = () => {
    updateFile(current);
  };

  return (
    <StyledRootHeader>
      <div>
        <Modal>
          <DropDownMenu>
            <DropDownMenu.Button>
              <ThemeModeIcon
                src="/assets/icon-menu-light.svg"
                alt="menu icon"
              />
            </DropDownMenu.Button>
            <DropDownMenu.Content>
              <DropDownMenu.Item action={() => {}}>
                <Modal.Open opens="new-file">
                  <Button variation="other" size="other">
                    <ThemeModeIcon src="/assets/icon-document-light.svg" />
                    New
                  </Button>
                </Modal.Open>
              </DropDownMenu.Item>
              <DropDownMenu.Item action={() => {}}>
                <Modal.Open opens="open-file">
                  <Button variation="other" size="other">
                    <ThemeModeIcon src="/assets/icon-document-light.svg" />
                    Open File
                  </Button>
                </Modal.Open>
              </DropDownMenu.Item>
              <DropDownMenu.Item action={hasData ? handleUpdateFile : () => {}}>
                <Button variation="other" size="other" disabled={!hasData}>
                  <img src="/assets/icon-save-dark.svg" /> Save
                </Button>
              </DropDownMenu.Item>
              <DropDownMenu.Item action={hasData ? handleDeleteFile : () => {}}>
                <Button variation="other" size="other" disabled={!hasData}>
                  <img src="/assets/icon-delete.svg" /> Delete
                </Button>
              </DropDownMenu.Item>
            </DropDownMenu.Content>
          </DropDownMenu>

          <Modal.Window name="new-file">
            <NewFileForm />
          </Modal.Window>

          <Modal.WindowTop name="open-file">
            <AllRecentFiles />
          </Modal.WindowTop>
        </Modal>
        <ThemeModeIcon src="/assets/logo-light.svg" alt="logo" />
        {hasData && <Divider />}
        {hasData && (
          <FileTileList
            files={openedFiles}
            render={(file) => (
              <OpenedFileTile
                file={file}
                key={file.fileId}
                isCurrent={file.fileId == current?.fileId}
              />
            )}
          />
        )}
      </div>

      <StyledSaveAndDelete>
        {Object.keys(current).length > 0 && (
          <Fragment>
            <StyledThemeButton
              className="theme-btn delete-btn"
              onClick={handleDeleteFile}
            >
              {isPendingDeleteFile ? (
                <SpinnerSm />
              ) : (
                <img src="/assets/icon-delete.svg" />
              )}
            </StyledThemeButton>
            <StyledButton
              variation="danger"
              size="small"
              onClick={handleUpdateFile}
              className="save-btn"
            >
              {isPendingFileUpdate ? (
                <SpinnerSm />
              ) : (
                <img src="/assets/icon-save.svg" />
              )}
              save
            </StyledButton>
          </Fragment>
        )}
        <StyledThemeButton
          className="theme-btn"
          onClick={() => dispatch(toggleTheme())}
        >
          <ThemeModeIcon src="/assets/icon-light-mode.svg" />
        </StyledThemeButton>
      </StyledSaveAndDelete>
    </StyledRootHeader>
  );
}
