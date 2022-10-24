import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import GlobalStyle from './Styles/GlobalStyle';
import GlobalContext from './contexts/globalContext';

import SignIn from './Components/signIn/SignIn';
import SingUp from './Components/signUp/SignUp';
import TimeLine from './Pages/TimeLine.js';
import Hashtag from './Pages/hashtagPage';

export default function App() {
    const [token, setToken] = useState('');
    const [user, setUser] = useState('');
    const [reRender, setReRender] = useState(true);
    const [post, setPost] = useState({
        img: '',
        name: '',
        likesQtd:'',
        liked:''
    })
    return (
        <>
            <GlobalStyle />
            <GlobalContext.Provider value={{ 
                user,
                setUser,
                token,
                setToken,
                reRender, 
                setReRender, 
                post, 
                setPost }}>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<SignIn />} />
                        <Route path="/signup" element={<SingUp />} />
                        <Route path="/timeline" element={<TimeLine />} />
                        <Route path="/hashtag/:hashtag" element={<Hashtag />} />
                    </Routes>
                </BrowserRouter>
            </GlobalContext.Provider>
        </>
    );
}