import { useState } from "react";
import { Button } from "./Button";

export const Error = ({ children }) => {
  const [visible, setVisible] = useState(true);
  if (!visible) return;
  return (
    <div className="z-50 fixed bottom-0 right-0 pl-4 pr-14 py-8 m-5 bg-white ring ring-red-200 rounded-lg flex-1 flex items-center justify-center text-xl text-red-600">
      <p>
        <b>Error: </b>
        <i>{children}!</i>
      </p>
      <div className="absolute top-0 right-0 ">
        <Button onClick={() => setVisible(false)} variant="close">
          Close
        </Button>
      </div>
    </div>
  );
};
