import { onAuthStateChanged } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "./firebase";



const UserContext = createContext();

export const AuthContextProvider = ({ children }) =>{
    const [count, setcount] = useState();
    const [favlist,setfavlist] = useState();
    const [loggedin,setloggedin] = useState([]);
    const [user, setUser] = useState({});

   
    useEffect(()=>{
      const unsubscribe = onAuthStateChanged(auth,(currentUser) =>{
        setUser(currentUser);
        if(currentUser){
          setloggedin(true)
        }else {
          setloggedin(false)
        }
  
      
      });
      return () =>{
        unsubscribe();
      }
       
      
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);


    return (
        <UserContext.Provider
          value={{
           count,
           setcount,
           favlist,
           setfavlist,
           loggedin,
           setloggedin,
           user,
           setUser
          }}
        >
          {children}
        </UserContext.Provider>
      );
    };
    
    export const UserAuth = () => {
    return useContext(UserContext);
  };