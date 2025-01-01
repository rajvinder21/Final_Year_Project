
// import {
//     createContext,
//     useContext,
//     useEffect,
//     useLayoutEffect,
//     useState
// } from 'react'

// import api from "@/api"
// const AuthContext = createContext(undefined);

// export const useAuth = () => {
//     const authContext = useContext(AuthContext);

//     if(!authContext){
//         throw new Error("useAuth must be used within a authprovider")
//     }

//     return authContext;
// }

// const AuthProvider = ({children})=> {
//  const (token, setToken) = useState();

//  useEffect(()=> {
//     const fetchme = async () =>{
//       try{
//         const response = await api.get("/api/test");
//         setToken(response.data.accessToken)
//       }
//       catch{
//         setToken(null)
//       }
//     }
//     fetchme();
//  } , []);

//  useLayoutEffect( ()=> {
//   const authIntercepter = api.intercepter.request.use({config}) => {
//   config.headers.Authorization = 
//   !config,_retry && token 
//   ? `Bearer ${token}`
//   :config.headers.Authorization ;

//   return config ;
//   });

//  return ()=>{
//   api.intercepter:request.eject(authIntercepter)
//  };
// },[token]);


//   render() {
//     return (
//       <div>AuthProvider</div>
//     )
//   }
// }
