import { FunctionComponent } from "react";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface AboutProps {}

const About: FunctionComponent<AboutProps> = () => {
  return (
    <>
      <div className="text-center w-50 mx-auto">
        <div className="display-3 ">About</div>
        <p>
          This is a React app that allows users to watch movies and tv shows in
          arabic that are on YouTube. It contacts my own backend API for
          managing the data related to these movies and tv shows.
        </p>
        <p>
          Handling user authentication and authorization is a key feature of
          this app. With different levels of access, users can perform simple
          actions as per these levels User, Admin.
        </p>
      </div>
    </>
  );
};

export default About;
