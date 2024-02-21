import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import Login from "./pages/Login/Login";
import Main from "./pages/Main/Main";
import Register from "./pages/Register/Register";
import AddPlaylist from "./pages/Add Playlist/AddPlaylist";
import Transfer from "./pages/Transfer/Transfer";
import SongPage from "./pages/Song/Song";
import Search from "./pages/Search/Search";
import UserList from "./pages/UserList/UserList"; 
import User from "./pages/User/User"; 
import Referral from "./pages/Referral/Referral"; 
import AddSong from "./pages/Add Song/AddSong";
import MySong from "./pages/My Song/MySong";
import Subscription from "./pages/Subscription/Subscription";
import TopUp from "./pages/Top Up/TopUp";
import NotFound from "./pages/NotFound/NotFound";
import ChatPage from "./pages/Chat/ChatPage";


let pages = [
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/main",
    element: <Main/>,
  },
  {
    path: "/login",
    element: <Login/>,
  },
  {
    path: "/register",
    element: <Register/>,
  },
  // {
  //   path: "/addPlaylist",
  //   element: <AddPlaylist/>,
  // },
  {
    path: "/songPage",
    element: <SongPage/>,
  },
  {
    path: "/search",
    element: <Search/>,
  },
  {
    path: "/userlist",
    element: <UserList/>,
  },
  {
    path: "/user",
    element: <User/>,
  },
  {
    path: "/referral",
    element: <Referral/>,
  },
  {
    path: "/addSong",
    element: <AddSong/>,
  },
  {
    path: "/mySong",
    element: <MySong/>,
  },
  {
    path: "/topUp",
    element: <TopUp/>,
  },
  {
    path: "/subscription",
    element: <Subscription/>,
  },
  {
    path: "/topUp",
    element: <TopUp/>,
  },
  {
    path: "/chatPage",
    element: <ChatPage/>,
  },
  {
    path: "/transfer",
    element: <Transfer/>,
  }
];


let noLoginPages = [
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <Login/>,
  },
  {
    path: "/register",
    element: <Register/>,
  }
];


const Router = () => {
    return (
        <BrowserRouter>
            
            <Routes>
                { localStorage.getItem('username') === null ?

                noLoginPages.map((page, index) => {
                  return <Route key={index} path={page.path} element={page.element} />;
                })
                  :
                pages.map((page, index) => {
                    return <Route key={index} path={page.path} element={page.element} />;
                })
                }
                <Route path="*" element={<NotFound/>} />
            </Routes>
        </BrowserRouter>
    );
};
  
export default Router;