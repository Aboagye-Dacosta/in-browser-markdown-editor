import toast, { ToastBar, Toaster } from "react-hot-toast";
import styled, { css } from "styled-components";

const IconHolder = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 2rem;
  height: 2rem;
  border-radius: 1rem;
  overflow: hidden;
  z-index: 50;

  & > img {
    width: 1rem;
  }

  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: var(--color-grey-200);
    transition: opacity 0.5s ease;
    opacity: 0;
    z-index: -1;
  }

  &:hover&::before {
    opacity: 1;
  }
`;

const StyledToast = styled.div`
  display: flex;
  align-items: center;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 1rem;
    ${(props) => {
      //@ts-expect-error value is ok
      switch (props.type) {
        case "error":
          return css`
            background-color: var(--color-red-700);
          `;
        case "success":
          return css`
            background-color: var(--color-green-100);
          `;
        default:
          return css`
            background-color: var(--color-yellow-100);
          `;
      }
    }};
  }
`;

function CustomToaster() {
  return (
    <Toaster
      position="top-center"
      gutter={12}
      containerStyle={{
        margin: "8px",
      }}
      toastOptions={{
        success: {
          duration: 3000,
        },
        error: {
          duration: 4000,
        },
        style: {
          backgroundColor: "var(--color-grey-0)",
          fontSize: "16px",
          color: "var(--color-grey-700)",
          maxWidth: "500px",
          padding: "16px 24px",
          boxShadow: "var(--shadow-lg)",
          overflow: "hidden",
        },
      }}
    >
      {(t) => (
        <ToastBar toast={t}>
          {({ icon, message }) => (
            //@ts-expect-error value is ok
            <StyledToast type={t.type}>
              {icon}
              {message}
              <IconHolder onClick={() => toast.remove(t.id)}>
                <img src="/assets/icon-close.svg" />
              </IconHolder>
            </StyledToast>
          )}
        </ToastBar>
      )}
    </Toaster>
  );
}

export default CustomToaster;
