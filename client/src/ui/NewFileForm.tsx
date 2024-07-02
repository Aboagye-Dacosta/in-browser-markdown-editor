import { useState } from "react";
import styled from "styled-components";
//@ts-expect-error it is present
import { v4 as uuidv4 } from "uuid";
import { useNewFile } from "../hooks/useNewFile";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { activate, getLifecycle } from "../store/slice/appStateSlice";
import { addFileToOpenedFiles } from "../store/slice/filesSlice";
import Button from "./Button";
import Input from "./Input";
import SpinnerSm from "./SpinnerSm";

import data from "../data.json";
import { File } from "../entities";

const StyledNewFileForm = styled.div`
  padding: 2rem 0 0 0;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  justify-content: center;
  align-items: center;
`;
const StyledActions = styled.div`
  display: flex;
  gap: 2rem;
`;
const StyledInput = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`;

export default function NewFileForm({ closeModal }: { closeModal?(): void }) {
  const dispatch = useAppDispatch();
  const { mutate, isPending } = useNewFile();

  const lifecycleState = useAppSelector(getLifecycle);
  const [fileName, setFileName] = useState<string>("");

  const fileId = uuidv4();

  const file: File = {
    fileId,
    //@ts-expect-error function exists on strings
    pathName: `${fileName}.md`.replaceAll(" ","_"),
    content: data[1].content,
    createdAt: new Date(Date.now()).toISOString(),
  };

  const handleCreateFile = () => {
    if (fileName) {
      mutate(file, {
        onSettled: () => {
          if (closeModal) closeModal();
        },
        onSuccess: () => {
          dispatch(addFileToOpenedFiles(file));
          if (lifecycleState !== "active") {
            dispatch(activate());
          }
        },
      });
    } else {
      if (closeModal) closeModal();
    }
  };

  return (
    <StyledNewFileForm>
      <StyledInput>
        <Input
          placeholder="File name"
          value={fileName}
          onChange={(e) => setFileName(e.target.value)}
          onKeyUp={(e) => {
            if (e.key == "Enter") {
              handleCreateFile();
            }
          }}
          autoFocus
        />
        <span>.md</span>
      </StyledInput>
      <StyledActions>
        <Button
          variation="danger"
          disabled={isPending}
          onClick={() => {
            if (closeModal) closeModal();
          }}
        >
          Cancel
        </Button>
        <Button disabled={isPending} onClick={handleCreateFile}>
          {isPending && <SpinnerSm />}
          Create file
        </Button>
      </StyledActions>
    </StyledNewFileForm>
  );
}
