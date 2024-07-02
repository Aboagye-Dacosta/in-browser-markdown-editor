import styled, { css } from "styled-components";

const sizes = {
  small: css`
    font-size: 1.2rem;
    padding: 0.4rem 0.8rem;
    text-transform: uppercase;
    font-weight: 600;
    text-align: center;
  `,
  medium: css`
    font-size: 1.4rem;
    padding: 1.2rem 1.6rem;
    font-weight: 500;
    text-align: center;
  `,
  other: css`
    justify-content: start;
    font-size: 1.4rem;
    padding: 1.2rem 1.6rem;
    text-align: left;
    width: 20rem;
    font-weight: 500;
    border-radius: 0;
  `,
  large: css`
    font-size: 1.6rem;
    padding: 1.2rem 2.4rem;
    font-weight: 500;
    text-align: center;
  `,
};

const variations = {
  primary: css`
    color: var(--color-brand-50);
    background-color: var(--color-brand-600);

    &:hover {
      background-color: var(--color-brand-700);
    }
  `,
  secondary: css`
    color: var(--color-grey-600);
    background: var(--color-grey-0);
    border: 1px solid var(--color-grey-200);

    &:hover {
      background-color: var(--color-grey-50);
    }
  `,

  other: css`
    color: var(--color-grey-600);
    background: var(--color-grey-0);
    box-shadow: var(--shadow-sm);
    &:hover {
      box-shadow: var(--shadow-md);
    }
  `,

  danger: css`
    color: var(--color-red-100);
    background-color: var(--color-red-700);

    &:hover {
      background-color: var(--color-red-800);
    }
  `,
};

const Btn = styled.button<{
  size?: "small" | "medium" | "large" | "other";
  variation?: "primary" | "secondary" | "danger" | "other";
}>`
  border: none;
  border-radius: var(--border-radius-sm);
  box-shadow: var(--shadow-sm);
  position: relative;
  display: flex;
  justify-content: center;
  gap: 0.5rem;
`;

const Button = styled(Btn).attrs(({ size, variation }) => ({
  size: size || "medium",
  variation: variation || "primary",
}))`
  /* white-space: nowrap; */

  ${(props) => {
    switch (props.size) {
      case "small":
        return sizes.small;
      case "medium":
        return sizes.medium;
      case "large":
        return sizes.large;
      case "other":
        return sizes.other;
    }
  }}

  ${(props) => {
    switch (props.variation) {
      case "primary":
        return variations.primary;
      case "secondary":
        return variations.secondary;
      case "danger":
        return variations.danger;
      case "other":
        return variations.other;
    }
  }}
`;

export default Button;
