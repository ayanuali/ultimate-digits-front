import { React, useEffect, useState } from "react";
import HomePageReal from "../home-page/HomePageReal";
import ConfirmationPageReal from "../confirmation-page/ConfirmationPageReal";
import ConfirmationRealPage2 from "../confirmation-page/ConfirmationRealPage2";
import AuthenticationPageReal from "./AuthenticationPageReal";
import { useSelector, useDispatch } from "react-redux";
import { setUserData } from "../../services/wallet/UserSlice";
export default function LoadingPageReal({
  setContract_connect,
  waddress,
  setwaddress,
  code,
  setCode,
  setNav,
}) {
  //function to declare state of variables

  const userr = useSelector((state) => state.user);
  const dispatch = useDispatch();
  console.log(userr, "before redux");

  const done = false;
  const [number, setNumber] = useState("");
  const [proceedTo, setProceedTo] = useState("HomePage");
  const [signer, setsigner] = useState("");

  useEffect(() => {
    setNav("1");

    if (userr) {
      if (userr.address && userr.updateReal) {
        setProceedTo("HomePage");
        return;
      }
      if (userr.address && userr.phno) {
        setProceedTo("lastpage");
      }
      if (userr.address && userr.virtuals) {
        setProceedTo("lastpage");
      }
    }
  }, []);

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
            data={userr}
          />
        );
      case "Authenticate":
        return (
          <AuthenticationPageReal
            setProceedTo={setProceedTo}
            number={number}
            code={code}
            data={userr}
            setuser={setUserData}
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
            data={userr}
          />
        );
      case "lastpage":
        return (
          <ConfirmationRealPage2
            number={number}
            waddress={waddress}
            code={code}
            data={userr}
          />
        );
      default:
        return;
    }
  };
  return <div>{flowHandler(proceedTo)}</div>;
}
