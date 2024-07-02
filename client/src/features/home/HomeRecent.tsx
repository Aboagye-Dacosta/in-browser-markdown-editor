import styled from "styled-components";
import Heading from "../../ui/Heading";
import HomeRecentList from "./HomeRecentList";

const StyledHomeRecent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  align-items: center;
  justify-content: center;

  @media screen {
    align-items: start;
    justify-content: start;
  }
`;

export default function HomeRecent() {
  return (
    <StyledHomeRecent>
      <Heading as="h2">Recently opened</Heading>
      <HomeRecentList />
    </StyledHomeRecent>
  );
}
