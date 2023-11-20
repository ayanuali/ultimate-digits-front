import { React, useState } from "react";
import HomePageReal from "../home-page/HomePageReal";
import ConfirmationPageReal from "../confirmation-page/ConfirmationPageReal";
import ConfirmationRealPage2 from "../confirmation-page/ConfirmationRealPage2";
import AuthenticationPageReal from "./AuthenticationPageReal";

export default function LoadingPageReal({
  setContract_connect,
  waddress,
  setwaddress,
  code,
  setCode,
}) {
  //function to declare state of variables
  const done = false;
  const [number, setNumber] = useState("");
  const [proceedTo, setProceedTo] = useState("HomePage");
  const [signer, setsigner] = useState("");

  //function to declare the flow of virtual track
  const flowHandler = (type) => {
    switch (type) {
      case "HomePage":
        return (
          <HomePageReal
            setProceedTo={setProceedTo}
            setNumber={setNumber}
            number={number}
            code={code}
            setCode={setCode}
          />
        );
      case "Authenticate":
        return (
          <AuthenticationPageReal
            setProceedTo={setProceedTo}
            number={number}
            code={code}
          />
        );
      case "ConfirmationPageReal":
        return (
          <ConfirmationPageReal
            code={code}
            setProceedTo={setProceedTo}
            number={number}
            waddress={waddress}
            setwaddress={setwaddress}
            signer={signer}
            setsigner={setsigner}
            setContract_connect={setContract_connect}
          />
        );
      case "lastpage":
        return (
          <ConfirmationRealPage2
            number={number}
            waddress={waddress}
            code={code}
          />
        );
      default:
        return;
    }
  };
  return <div>{flowHandler(proceedTo)}</div>;
}
