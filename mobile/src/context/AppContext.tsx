// src/contexts/AppContext.tsx
import { createContext, useState } from 'react';
import { User } from '../types/user';

type AppContextType = {
  user: User | null;
  setUser: (user: User | null) => void;
  isLoged: boolean;
};

const AppContext = createContext<AppContextType>({
  user: null,
  setUser: () => {},
  isLoged: false,
});

type Props = {
  children: React.ReactNode;
};

export function AppProvider({ children }: Props) {
  const [user, setUser] = useState<User | null>(null);

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        isLoged: !!user,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export default AppContext;
