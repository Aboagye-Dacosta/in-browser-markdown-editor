import { PropsWithChildren } from "react";
import AllRecentFiles from "./AllRecentFiles";
import Button from "./Button";
import Modal from "./Modal";
import ThemeModeIcon from "./ThemeModeIcon";

export default function OpenFileButton({ children }: PropsWithChildren) {
  return (
    <Modal>
      <Modal.Open opens="open-file">
        <Button variation="other" size="other">
          <ThemeModeIcon src="/assets/icon-document-light.svg" />
          {children}
        </Button>
      </Modal.Open>

      <Modal.WindowTop name="open-file">
        <AllRecentFiles />
      </Modal.WindowTop>
    </Modal>
  );
}
