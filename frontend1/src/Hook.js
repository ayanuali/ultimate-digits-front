import { createContext, useState } from "react";
import CartShow from "./pages/auth-page/components/cart-show/cart_show";
import ConfirmationPageVirtual1 from "./pages/confirmation-page/ConfirmationPageVirtual1";

export const UserContext = createContext();
export default function Component1({children}) {
    const [tokenId, setTokenId] = useState("");
    const [flag1,setflag1]=useState("0")
    const [flag2,setflag2]=useState("0")
    const [totaling,settotaling]=useState('');
    return (
      <UserContext.Provider value={{tokenId, setTokenId,flag1,setflag1,flag2,setflag2,totaling,settotaling}}>
        {children}
      </UserContext.Provider>
    );
  }
//   export UserContext;