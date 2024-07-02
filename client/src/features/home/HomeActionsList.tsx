import styled from "styled-components";
import CreateNewFileButton from "../../ui/CreateNewFileButton";
import Heading from "../../ui/Heading";
import OpenFileButton from "../../ui/OpenFileButton";

const StyledHomeActionList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;

  @media screen and (min-width: 75em) {
    align-items: start;
    justify-content: start;
  }
`;

const StyledHomeActions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export default function HomeActionsList() {
  return (
    <StyledHomeActionList>
      <Heading as="h2">Start</Heading>
      <StyledHomeActions>
        <CreateNewFileButton>New File ...</CreateNewFileButton>
        <OpenFileButton>Open File ..</OpenFileButton>
      </StyledHomeActions>
    </StyledHomeActionList>
  );
}
