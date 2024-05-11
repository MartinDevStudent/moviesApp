import React, { useState } from "react";

interface UserContextInterface {
  username: string;
  addUsername: (username: string) => void;
}
const initialContextState: UserContextInterface = {
  username: "martin",
  addUsername: (username) => {
    username;
  },
};

export const UserContext =
  React.createContext<UserContextInterface>(initialContextState);

const UserContextProvider: React.FC<React.PropsWithChildren> = (props) => {
  const [username, setUserName] = useState<string>("");

  const addUsername = (username: string) => {
    setUserName(username);
  };

  console.log("username", username);

  return (
    <UserContext.Provider
      value={{
        username,
        addUsername,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
