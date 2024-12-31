import React from "react";

const UserContext = React.createContext("This is the default value");
const UserProvider = UserContext.Provider;
const UserConsumer = UserContext.Consumer;
export { UserProvider, UserConsumer };
export default UserContext