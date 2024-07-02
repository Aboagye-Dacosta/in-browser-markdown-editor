import { PropsWithChildren } from "react";
import Button from "./Button";
import Modal from "./Modal";
import NewFileForm from "./NewFileForm";
import ThemeModeIcon from "./ThemeModeIcon";

export default function CreateNewFileButton({ children }: PropsWithChildren) {
  return (
    <Modal>
      <Modal.Open opens="new-file">
        <Button variation="other" size="other">
          <ThemeModeIcon src="/assets/icon-document-light.svg" />
          {children}
        </Button>
      </Modal.Open>

      <Modal.Window name="new-file">
        <NewFileForm />
      </Modal.Window>
    </Modal>
  );
}
