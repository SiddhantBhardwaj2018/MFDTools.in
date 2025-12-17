import { createContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { NEXT_URL } from "../config/url";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState("");
  const [isError, setIsError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const nonSensitiveRoutes = ["/","/forgotPassword"];

  const router = useRouter();

  useEffect(() => {
    checkUserLoggedIn();
  }, []);

  const login = async (email, password) => {
    setIsLoading(true);
    const res = await fetch(`${NEXT_URL}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      setIsLoading(false);
      setIsError("Email & Password were provided incorrectly !");
    } else {
      let user = data.user;
      if (user.status) {
        setIsLoading(false);
        setIsError(user.status);
      } else {
        setUser(user);
        localStorage.setItem("token", user.token);
        localStorage.setItem("role", user.role);
        setIsLoading(false);
        setIsError(null);
        if (user.role == "ROLE_ADMIN") {
          router.push("/admin");
        } else if (user.role == "ROLE_BASIC_USER") {
          router.push("/panel");
        }
      }
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setUser(null);
    if (!nonSensitiveRoutes.includes(router.pathname)) {
      setTimeout(() => {
        router.push("/");
      },1000)
    }
  };

  const checkUserLoggedIn = async () => {
    let token = localStorage.getItem("token");
    if (token !== undefined && token !== null) {
      const res = await fetch(`${NEXT_URL}/api/auth/checkUserLoggedIn`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: token,
        }),
      });
      const data = await res.json();
      console.log(user);
      if (!res.ok) {
        logout();
      } else {
        let role = data.user.role;
        setUser({
          token,
          role,
        });
      }
    }
  };

  return (
    <AuthContext.Provider value={{ user, isError, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
export default AuthContext;