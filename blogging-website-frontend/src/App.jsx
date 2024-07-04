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


export const UserContext=createContext({})

const App = () => {
    
    const [userAuth,setUserAuth]=useState({})

     useEffect(()=>{
        let userInSession=lookInSession('user');
        userInSession ? setUserAuth(JSON.parse(userInSession)) : setUserAuth({access_token:null})
     },[])


    return (
        <UserContext.Provider value={{userAuth,setUserAuth}}>
        <Routes>
            <Route path="/editor" element={<Editor/>}></Route>
            <Route path="/editor/:blog_id" element={<Editor/>}></Route>
            <Route path="/" element={<Navbar/>}>
                <Route index element={<HomePage/>}></Route>
                <Route path="settings" element={<SideNav/>}>
                    <Route path="edit-profile" element={<h1>Edit Profile Page</h1>} />
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
    )
}

export default App;