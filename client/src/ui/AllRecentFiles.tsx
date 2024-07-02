import styled from "styled-components";
import { RecentListItem } from "../features/home/HomeRecentList";
import { FileType } from "../helpers/type";
import { useFiles } from "../hooks/useFiles";
import Heading from "./Heading";
import Spinner from "./Spinner";

const StyledAllRecentFiles = styled.div`
  width: 30rem;
  height: max-content;

  & div {
    padding: 0.7rem 0;
    max-height: 20rem;
    overflow-y: auto;
  }
`;

export default function AllRecentFiles({
  closeModal,
}: {
  closeModal?(): void;
}) {
  const { files, isPending } = useFiles();

  return (
    <StyledAllRecentFiles>
      <Heading as="h3">All Recent Files</Heading>
      {isPending ? (
        <Spinner />
      ) : (
        <div>
          {files?.length == 0 ? (
            <p>you have not open any files yet...</p>
          ) : (
            files
              //@ts-expect-error function is available
              ?.toReversed()
              .slice(0, 3)
              ?.map((recent: FileType) => (
                <RecentListItem key={recent.fileId} recent={recent} handler={closeModal} />
              ))
          )}
        </div>
      )}
    </StyledAllRecentFiles>
  );
}
