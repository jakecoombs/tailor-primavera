import { useDocumentTitle } from "../lib/utils";

const NoPage = () => {
    useDocumentTitle("Page Not Found - Tailor of Primavera");
    return <h1>404 - Page Not Found.</h1>;
  };
  
export default NoPage;
  