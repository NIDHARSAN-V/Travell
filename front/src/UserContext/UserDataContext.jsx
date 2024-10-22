import React, { createContext, useState } from 'react';

const UserDataContext = createContext();

export const UserDataProvider = ({ children }) => {
  const [UserId, SetUserId] = useState(null);
  const [UserSection, SetSection] = useState("");

  const UpdateUserData = (id, section) => {
    console.log("UserData Context Updated:", id, section);
    SetUserId(id);
    SetSection(section);
  };

  return (
    <UserDataContext.Provider value={{ UserId, UserSection, UpdateUserData }}>
      {children}
    </UserDataContext.Provider>
  );
};

export { UserDataContext };
