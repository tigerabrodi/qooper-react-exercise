import { createContext, useState, useEffect, ReactNode } from "react";
import { useHistory } from "react-router-dom";
import { BASE_API_URL, User } from "../helpers";

type CurrentUser = Pick<User, "id" | "firstName"> | null;

export type UserContextType = {
  currentUser: CurrentUser;
  login: (formData: FormData) => Promise<void>;
  logout: () => void;
};

export const UserContext = createContext<UserContextType | null>(null);

type FormData = {
  username: string;
  firstName: string;
  lastName: string;
};

export function UserProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<CurrentUser>(null);
  const history = useHistory();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    if (token && user) {
      setCurrentUser(JSON.parse(user));
      history.push("/");
    } else {
      localStorage.clear();
      history.push("/signin");
    }
  }, [history]);

  const login = async (formData: FormData) => {
    try {
      const response = await fetch(`${BASE_API_URL}/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const user = (await response.json()) as User;
      const newCurrentUser = { id: user.id, firstName: user.firstName };

      localStorage.setItem("token", user.token);
      localStorage.setItem("user", JSON.stringify(newCurrentUser));

      setCurrentUser(newCurrentUser);

      history.push("/");
    } catch (error) {
      console.error(error);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setCurrentUser(null);
    history.push("/signin");
  };

  return (
    <UserContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </UserContext.Provider>
  );
}
