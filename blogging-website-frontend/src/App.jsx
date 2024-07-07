import { Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar.component";
import UserAuthForm from "./pages/userAuthForm.page";
import { createContext, useEffect, useState } from "react";
import { lookInSession } from "./common/session";
import Editor from "./pages/editor.pages";
import HomePage from "./pages/home.page";
import SearchPage from "./pages/search.page";
import PageNotFound from "./pages/404.page";
import ProfilePage from "./pages/profile.page";
import BlogPage from "./pages/blog.page";
import SideNav from "./components/sidenavbar.component";
import ChangePassword from "./pages/change-password.page";
import EditProfile from "./pages/edit-profile.page";
import Notifications from "./pages/notifications.page";


export const UserContext=createContext({})
export const ThemeContext=createContext({});

const App = () => {
    
    const [userAuth,setUserAuth]=useState({})
    const [theme,setTheme]=useState('light');

     useEffect(()=>{
        let userInSession=lookInSession('user');
        let themeInSession=lookInSession('theme');
        userInSession ? setUserAuth(JSON.parse(userInSession)) : setUserAuth({access_token:null})

        if(themeInSession){
            setTheme(()=> {
                document.body.setAttribute('data-theme',themeInSession);
                return themeInSession;
            })
        }
        else document.body.setAttribute('data-theme',theme);
     },[])


    return (
        <ThemeContext.Provider value={{theme,setTheme}}>
            <UserContext.Provider value={{userAuth,setUserAuth}}>
        <Routes>
            <Route path="/editor" element={<Editor/>}></Route>
            <Route path="/editor/:blog_id" element={<Editor/>}></Route>
            <Route path="/" element={<Navbar/>}>
                <Route index element={<HomePage/>}></Route>
                <Route path="dashboard" element={<SideNav/>}>
                    <Route path="notifications" element={<Notifications></Notifications>}></Route>
                </Route>
                <Route path="settings" element={<SideNav/>}>
                    <Route path="edit-profile" element={<EditProfile></EditProfile>} />
                    <Route path="change-password" element={<ChangePassword></ChangePassword>} />
                </Route>
                <Route path="signin"  element={<UserAuthForm type='sign-in' />}></Route>
                <Route path="signup"  element={<UserAuthForm type='sign-up' />}></Route>
                <Route path="search/:query" element={<SearchPage/>}></Route>
                <Route path="user/:id" element={<ProfilePage></ProfilePage>}></Route>
                <Route path="blog/:blog_id" element={<BlogPage></BlogPage>}></Route>
                <Route path="*" element={<PageNotFound></PageNotFound>}></Route>
            </Route>
        </Routes> 
            </UserContext.Provider>
        </ThemeContext.Provider>
    )
}

export default App;