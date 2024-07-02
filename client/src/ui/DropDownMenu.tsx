import {
  createContext,
  PropsWithChildren,
  ReactNode,
  useContext,
  useState,
} from "react";
import styled from "styled-components";
import { useCloseClickOutside } from "../hooks/useCloseClickOutside";

const StyledDropDownMenu = styled.div`
  position: relative;
  overflow-x: visible;
  width: 4rem;
  height: 100%;
`;

const StyledMenuContent = styled.div`
  display: absolute;
  left: 1rem;
  z-index: 1000;

  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-md);
  width: max-content;
  padding: 1rem 0;
`;

const StyledMenuItem = styled.div`
  cursor: pointer;
  user-select: none;
  min-width: 10rem;
  padding: 0.7rem 1rem;

  z-index: 1000;

  &:hover {
    box-shadow: var(--shadow-sm);
  }
`;
const StyledMenuButton = styled.button`
  height: 100%;
  border: none;
  background-color: var(--color-grey-700);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
`;

type DropDownMenuType = {
  openMenu: () => void;
  closeMenu: () => void;
  toggleMenu: () => void;
  isMenuOpen: boolean;
};

const DropDownMenuContext = createContext({} as DropDownMenuType);

function useDropDownMenuContext() {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const closeMenu = () => setIsMenuOpen(false);
  const openMenu = () => setIsMenuOpen(true);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return { isMenuOpen, openMenu, closeMenu, toggleMenu };
}

function useDropDownMenu(): DropDownMenuType {
  const context = useContext(DropDownMenuContext);

  if (!context)
    throw new Error("you are using menu context outside of menu provider");
  return context;
}

function DropDownMenuProvider({ children }: PropsWithChildren) {
  return (
    <DropDownMenuContext.Provider value={useDropDownMenuContext()}>
      {children}
    </DropDownMenuContext.Provider>
  );
}

function DropDownMenu({ children }: PropsWithChildren) {
  return (
    <DropDownMenuProvider>
      <StyledDropDownMenu>{children}</StyledDropDownMenu>
    </DropDownMenuProvider>
  );
}

function Button({ children }: PropsWithChildren) {
  const { toggleMenu } = useDropDownMenu();

  return (
    <StyledMenuButton
      className="menuBtn"
      onClick={(e) => {
        e.stopPropagation();
        toggleMenu();
      }}
    >
      {children}
    </StyledMenuButton>
  );
}

function Content({ children }: PropsWithChildren) {
  const { isMenuOpen, closeMenu } = useDropDownMenu();
  const ref = useCloseClickOutside(closeMenu, false);

  return (
    <>
      {isMenuOpen && (
        <StyledMenuContent
          className="content"
          //@ts-expect-error value is ok
          ref={ref}
        >
          {children}
        </StyledMenuContent>
      )}
    </>
  );
}

function Item({
  children,
  action,
}: {
  children: ReactNode;
  action: () => void;
}) {
  const { closeMenu } = useDropDownMenu();
  const handleItemClick = () => {
    action();
    closeMenu();
  };
  return <StyledMenuItem onClick={handleItemClick}>{children}</StyledMenuItem>;
}

DropDownMenu.Content = Content;
DropDownMenu.Item = Item;
DropDownMenu.Button = Button;

export default DropDownMenu;
