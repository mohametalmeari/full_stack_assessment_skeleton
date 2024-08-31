import { useState } from "react";
import { Button } from "./Button";

export const Error = ({ children }) => {
  const [visible, setVisible] = useState(true);
  if (!visible) return;
  return (
    <div className="z-50 fixed bottom-0 right-0 px-10 py-8 m-5 bg-white ring rounded-lg flex-1 flex items-center justify-center text-3xl text-red-500">
      <p>
        <b>Error: </b>
        <i>{children}!</i>
        <div className="absolute top-0 right-0 ">
          <Button onClick={() => setVisible(false)} variant="close">
            &times;
          </Button>
        </div>
      </p>
    </div>
  );
};
