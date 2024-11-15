import React, { createContext, useState } from 'react';

const UserPlaceContext = createContext();

export const UserPlaceProvider = ({ children }) => {
  const [Place , SetPlace] = useState()


  const UpdatePlaceData = (place) => {
    console.log("Place in place Context : " , place)
     SetPlace(place);
  };

  return (
    <UserPlaceContext.Provider value={{Place , UpdatePlaceData}}>
      {children}
    </UserPlaceContext.Provider>
  );
};

export { UserPlaceContext };
