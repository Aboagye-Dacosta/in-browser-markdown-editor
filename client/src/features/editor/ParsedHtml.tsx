import parse from "html-react-parser";
import Markdown from "../../styles/Markdonw.tsx";


function ParsedHtml({ result }: { result: string }) {
  return <Markdown className="parsed">{parse(result)}</Markdown>;
}

export default ParsedHtml;
