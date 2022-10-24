import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import {signUp} from '../../Services/api';

export default function SignUp(){

    const navigate = useNavigate();
    const [user, setUser] = useState({});

    function handleForm(e) {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    async function sendForm(e){

        e.preventDefault();

        const { name, email, password, pictureUrl} = user;
        
        if(!name || !email || !password || !pictureUrl){
            return alert('Todos os campos são obrigatórios!');
        }

        try{
            await signUp(user)
            navigate('/')
        }catch(error){
            alert(error.response.data);
        }
    }

    return (
        <Container>
            <Web>
                <LogoBox>
                    <h1>Linkr</h1>
                    <p>save, share and discover the best links on the web</p>
                </LogoBox>
            </Web>
            <Mobile onSubmit={sendForm}>
                <input 
                placeholder="e-mail"
                type="email"
                name="email"
                onChange={handleForm}
                required></input>
                <input 
                placeholder="password"
                type="password"
                name="password"
                onChange={handleForm}
                required></input>
                <input 
                placeholder="username"
                type="text"
                name="name"
                onChange={handleForm}
                required></input>
                <input 
                placeholder="picture url"
                type="url"
                name="pictureUrl"
                onChange={handleForm}
                required></input>
                <Register>Sign Up</Register>
                <Login to="/">Switch back to log in</Login>
            </Mobile>
        </Container>
    )
};

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
`
const Web = styled.div`
    width: 65%;
    height: 100%;
    background-color: #151515;
    display: flex;
    align-items: center;
    justify-content: center;
`
const LogoBox = styled.div`
    width: 50%;
    height: 300px;
    h1{
        font-family: 'Passion One';
        font-style: normal;
        font-weight: 700;
        font-size: 106px;
        color: #FFFFFF;
    }
    p{
        width: 90%;
        font-family: 'Oswald';
        font-weight: 700;
        font-size: 43px;
        color: #FFFFFF;
    }
`
const Mobile = styled.form`
    width: 35%;
    height: 100%;
    background-color: #333333;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    input{
        width: 80%;
        height: 65px;
        background-color: #FFFFFF;
        border-radius: 6px;
        margin-bottom: 10px;
        border: none;
        font-family: 'Oswald';
        font-weight: 700;
        font-size: 20px;
        color: #9F9F9F;;
        box-sizing: border-box;
        padding: 15px;
        ::placeholder{
            font-family: 'Oswald';
            font-weight: 700;
            font-size: 20px;
            color: #9F9F9F;
        }
    }
`
const Register = styled.button`
    width: 80%;
    height: 65px;
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #1877F2;;
    border-radius: 5px;
    font-family: 'Oswald';
    font-weight: 700;
    font-size: 25px;
    color: #FFFFFF;
    border: none;
    cursor: pointer;
`
const Login = styled(Link)`
    font-family: 'Lato';
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    color: #FFFFFF;
    text-decoration-line: underline;
`