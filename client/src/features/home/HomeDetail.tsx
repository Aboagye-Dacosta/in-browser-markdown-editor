import styled from "styled-components";
import ThemeModeIcon from "../../ui/ThemeModeIcon";
import HomeActionsList from "./HomeActionsList";
import HomeRecent from "./HomeRecent";

const StyledHome = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;

  padding: 3rem 0;
  justify-content: center;
  align-items: center;

  @media screen and (min-width: 56.25em) {
    padding: 10rem 0 0 10rem;
    justify-content: start;
    align-items: start;
  }

  & > p {
    margin-bottom: 3rem;
  }
`;

const StyledLogo = styled(ThemeModeIcon)`
  width: 20rem;
`;

export default function HomeDetail() {
  return (
    <StyledHome>
      <StyledLogo src="/assets/logo-light.svg" />
      <p>Editing Evolved to the next level</p>

      <HomeActionsList />
      <HomeRecent />
    </StyledHome>
  );
}
