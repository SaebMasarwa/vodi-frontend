import { FunctionComponent } from "react";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface PageNotFoundProps {}

const PageNotFound: FunctionComponent<PageNotFoundProps> = () => {
  return (
    <div className="display-5">
      404 - PAGE NOT FOUND
      <img src="./404.png" alt="Page Not Found" />
    </div>
  );
};

export default PageNotFound;
