import styled from "styled-components";
import { generateDate } from "../../helpers/utils";
import { useFiles } from "../../hooks/useFiles";
import { useAppDispatch } from "../../store/hooks";
import { activate } from "../../store/slice/appStateSlice";
import { addFileToOpenedFiles, FileType } from "../../store/slice/filesSlice";
import Spinner from "../../ui/Spinner";

const StyledRecentList = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;

  @media screen and (min-width: 75em) {
    justify-content: start;
    align-items: start;
  }
`;


const StyledRecentListItem = styled.div`
  display: flex;
  gap: 1.5rem;
  cursor: pointer;
  font-size: 1.2rem;
  transition: transform 200ms ease-in-out;
  &:hover {
    transform: translateY(-2px);
  }
  &:hover span:first-of-type {
    color: var(--color-brand-700);
  }
`;

export function RecentListItem({ recent ,handler}: { recent: FileType ,handler?():void}) {
  const dispatch = useAppDispatch();

  return (
    <StyledRecentListItem
      onClick={() => {
        dispatch(addFileToOpenedFiles(recent));
        dispatch(activate());
        if(handler){
          handler()
        }
      }}
    >
      <span>{recent.pathName} </span> &mdash;
      <span>{generateDate(recent.createdAt)}</span>
    </StyledRecentListItem>
  );
}

export default function HomeRecentList() {
  const { isPending, files } = useFiles();

  return (
    <>
      {isPending ? (
        <Spinner />
      ) : (
        <StyledRecentList>
          {files?.length == 0 ? (
            <p>you have not open any files yet...</p>
          ) : (
            files
              //@ts-expect-error function is available
              ?.toReversed()
              .slice(0, 3)
              ?.map((recent: FileType) => (
                <RecentListItem key={recent.fileId} recent={recent} />
              ))
          )}
        </StyledRecentList>
      )}
    </>
  );
}
