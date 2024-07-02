import {
  cloneElement,
  createContext,
  JSXElementConstructor,
  PropsWithChildren,
  ReactElement,
  ReactNode,
  useContext,
  useState,
} from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";
import { useCloseClickOutside } from "../hooks/useCloseClickOutside";
import ThemeModeIcon from "./ThemeModeIcon";

const DefStyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-lg);
  padding: 3.2rem 4rem;
  transition: all 0.5s;
  box-shadow: var(--shadow-lg);

`;

const StyledModal = styled(DefStyledModal)`
  transform: translate(-50%, -50%);
`;

const StyledModalTop = styled(DefStyledModal)`
  transform: translate(-50%, -100%);
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: var(--backdrop-color);
  backdrop-filter: blur(4px);
  z-index: 1000;
  transition: all 0.5s;
`;
const OverlayTop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: var(--backdrop-color);
  backdrop-filter: blur(4px);
  z-index: 1000;
  transition: all 0.5s;
`;

const Button = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;
  position: absolute;
  top: 1.2rem;
  right: 1.9rem;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & img {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-500);
  }
`;

const WindowBody = styled.div`
  overflow: auto;
`;

type ModalType = {
  closeModal(): void;
  openName: string;
  openWindow(name: string): void;
};

const ModalContext = createContext({} as ModalType);

function Modal({ children }: PropsWithChildren) {
  const [openName, setOpenName] = useState("");
  const closeModal = () => setOpenName("");
  const openWindow = (name: string) => setOpenName(name);

  return (
    <ModalContext.Provider value={{ closeModal, openName, openWindow }}>
      {children}
    </ModalContext.Provider>
  );
}

function Open({
  children,
  opens: opensWindowName,
}: {
  children: ReactNode;
  opens: string;
}) {
  const { openWindow } = useContext(ModalContext);

  const clone = cloneElement(
    children as ReactElement<unknown, string | JSXElementConstructor<unknown>>,
    {
      //@ts-expect-error value is ok
      onClick: () => {
        openWindow(opensWindowName);
      },
    }
  );

  return clone;
}

function Window({
  children,
  name: windowName,
}: {
  children: ReactNode;
  name: string;
}) {
  const { openName, closeModal } = useContext(ModalContext);
  const ref = useCloseClickOutside(closeModal);

  if (openName != windowName) return;

  return createPortal(
    <Overlay>
      <StyledModal
        //@ts-expect-error value is ok
        ref={ref}
      >
        <Button onClick={closeModal}>
          <ThemeModeIcon src="/assets/icon-close.svg" />
        </Button>
        <WindowBody>
          {cloneElement(
            children as ReactElement<
              unknown,
              string | JSXElementConstructor<unknown>
            >,
            //@ts-expect-error value is ok
            { closeModal }
          )}
        </WindowBody>
      </StyledModal>
    </Overlay>,
    document.body
  );
}

function WindowTop({
  children,
  name: windowName,
}: {
  children: ReactNode;
  name: string;
}) {
  const { openName, closeModal } = useContext(ModalContext);
  const ref = useCloseClickOutside(closeModal);

  if (openName != windowName) return;

  return createPortal(
    <OverlayTop>
      <StyledModalTop
        //@ts-expect-error value is ok
        ref={ref}
      >
        <Button onClick={closeModal}>
          <ThemeModeIcon src="/assets/icon-close.svg" />
        </Button>
        <WindowBody>
          {cloneElement(
            children as ReactElement<
              unknown,
              string | JSXElementConstructor<unknown>
            >,
            //@ts-expect-error value is ok
            { closeModal }
          )}
        </WindowBody>
      </StyledModalTop>
    </OverlayTop>,
    document.body
  );
}

Modal.Window = Window;
Modal.WindowTop = WindowTop;
Modal.Open = Open;

export default Modal;
