import {
  createContext,
  FunctionComponent,
  ReactNode,
  useContext,
  useState,
} from "react";
import { User } from "../interfaces/User";

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  searchResults: string | null;
  setSearchResults: (results: string) => void;
}

export const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
  searchResults: null,
  setSearchResults: () => {},
});

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: FunctionComponent<UserProviderProps> = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [searchResults, setSearchResults] = useState<string | null>(null);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        searchResults,
        setSearchResults,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
