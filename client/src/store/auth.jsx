import { createContext, useContext, useState, useEffect } from "react";

//1.context
export const AuthContext = createContext();


//2.Provider
// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState("");
    const [user, setUser] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [services, setServices] = useState("");
    const authorization = `Bearer ${token}`;

    //function to stored the token in local storage
    const storeTokenInLS = (serverToken) => {
        setToken(serverToken);
        return localStorage.setItem("token", serverToken);
    };

   //this is the get the value in either true or false in the original state of token
   let isLoggedIn = !!token;

   console.log("token", token);
   console.log("isLoggedin ", isLoggedIn);

  //   to check whether is loggedIn or not
  const LogoutUser = () => {
    setToken("");
    return localStorage.removeItem("token");
  };

   // function to check the user Authentication or not
   const userAuthentication = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("http://localhost:5100/api/auth/user", {
        method: "GET",
        headers: {
          Authorization: authorization,
        },
      });

      if (response.ok) {
        const data = await response.json();

        console.log("auth user data==>", data);

        // our main goal is to get the user data 👇
        setUser(data.userData);
        setIsLoading(false);
      } else {
        setIsLoading(true);
        console.error("Error fetching user data");
      }
    } catch (error) {
      console.log(error);
    }
  };

const  getServices = async () => {
      try {
        const response = await fetch("http://localhost:5100/api/data/service", {
          method: "GET"
        });
        if(response.ok) {
          const data = await response.json();
          console.log("service response", data);
          setServices(data.msg);
        }
      } catch (error) {
          console.log(`Services frontend error:${error}` );
      }
  }

  //to fetch the services data from the database


  useEffect(() => {
    console.log("auth use effect");
    userAuthentication();
    getServices();
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, storeTokenInLS, LogoutUser, user, services, authorization, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

//consumer (means delivery boy)
export const useAuth = () => {
  const authContextValue = useContext(AuthContext);
  if (!authContextValue) {
    throw new Error("useAuth used outside of the Provider");
  }
  return authContextValue;
};