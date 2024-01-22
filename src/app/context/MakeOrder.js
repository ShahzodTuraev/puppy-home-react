import React, { createContext, useContext, useState } from "react";
export const MakeOrderContext = createContext();
export const MakeOrderCont = () => useContext(MakeOrderContext);
const MakeOrders = ({ children }) => {
  const [orderBtn, setOrderBtn] = useState(0);

  return (
    <MakeOrderContext.Provider value={[orderBtn, setOrderBtn]}>
      {children}
    </MakeOrderContext.Provider>
  );
};
export default MakeOrders;
