import styled from "styled-components";

import { BsFillTrashFill, BsHeart, BsHeartFill } from "react-icons/bs";
import { MdModeEdit } from "react-icons/md";

import { ReactTagify } from "react-tagify";

import React from "react";
import { useContext, useEffect, useState, useRef } from "react";

import mql from '@microlink/mql'

import { useNavigate } from "react-router-dom";
import ReactTooltip from 'react-tooltip';

import GlobalContext from "../../contexts/globalContext";
import { EditPost } from "../../Services/api";

import {updateLike} from '../../Services/api.js'
import getConfig from "../../Services/getConfig";

export default function Post(
    {
        username,
        postUserId,
        userImg,
        text,
        link,
        likesQtd,
        liked,
        postId }
) {

    const [message, setMessage] = useState('');

    // AJUSTAR ESSE LIKE AQUI
    const [like, setLike] = useState(liked)
    const [color, setColor] = useState('false')

    const [urlMetadataOBJ, setUrlMetadataOBJ] = useState({})
    const token = localStorage.getItem("token")
    const {
        deleteScreen, setDeleteScreen,
        editPost, SetEditPost,
        postId_global, setPostId_global
    } = useContext(GlobalContext);

    const userId = localStorage.getItem("userId");

    const navigate = useNavigate()
    useEffect(async () => {
        SetEditPost({ postId: '', status: false })
        if (!message) { setMessage(text) }


        if (like) { setColor('true') }
        const { data } = await mql(link, {
            data: {
                avatar: {
                    selector: '#avatar',
                    type: 'image',
                    attr: 'src'
                }
            }
        })
        setUrlMetadataOBJ(data)
    }, [])


    const inputRef = useRef();
    useEffect(async () => {
        inputRef.current.focus();
    }, [])

    function goTo(tag) {
        const newTag = tag.replace('#', '')
        navigate(`/hashtag/${newTag}`)
    }


    const handleChange = event => {
        if (!message) { setMessage(text) }
        setMessage(event.target.value);
    };
    const handleClick = event => {
        event.preventDefault();

        // value of input field

        // set value of input field
        setMessage('New value');
    };

    function sendForm(e) {
        e.preventDefault()
        const id = postId;
        const body = {
            text: message,
        }

        const promise = EditPost(body, id)

        promise.then((res) => {
            document.location.reload()
            SetEditPost({ postId: '', status: false })
        })
        promise.catch((err) => alert(err.message))
    }

    document.onkeydown = function (e) {
        if (e.key === 'Escape') {
            setMessage(text);
            SetEditPost({ postId: '', status: false })
        }
    }


    

    function HandleLike(color){
        if(color === 'true'){
            setColor('false')
        }else{
            setColor('true')
        }
        
        const body = {
            postId
        }


        try {
            if(color === 'true'){
                console.log('like')
                updateLike(getConfig(token), body)
            }
            if(color === 'false'){
                console.log('disLike')
                // updateDislike(getConfig(token), body)
            }
            
            
        } catch (error) {
            console.log(error)
        }

        

    }

    return (
        <>
            {(!urlMetadataOBJ.url) ?
                (<p>LOADING</p>)
                :
                (<PostHTML>
                    <ImgWrapper color={color}>
                        <img src={userImg} />
                        <div
                            data-tip data-for="registerTip"
                        >
                            {color === 'true' ?
                                (
                                    <BsHeartFill
                                        size='20px'
                                        onClick={() => {
                                            setLike(!like)
                                            setColor('false')
                                            HandleLike(color)
                                        }}
                                    />
                                ) : (
                                    <BsHeart
                                        size='20px'
                                        onClick={() => {
                                            setLike(!like)
                                            setColor('true')
                                            HandleLike(color)
                                        }}
                                    />
                                )}
                            <ReactTooltip
                                id="registerTip"
                                place="bottom"
                                backgroundColor='#FFFFFF'
                            >
                                <p
                                    style={{ color: 'black' }}
                                >
                                    Tooltip for the register button
                                </p>

                            </ReactTooltip>

                        </div>

                        <p>{likesQtd}</p>

                    </ImgWrapper>
                    <Main>
                        <Title>
                            {postUserId != userId ?
                                (<h1
                                    onClick={() => navigate(`/user/${userId}`)}
                                >
                                    {username}
                                </h1>)
                                :
                                (<>
                                    <h1
                                        onClick={() => navigate(`/user/${userId}`)}
                                    >
                                        {username}
                                    </h1>
                                    <IconsWrapper>
                                        <MdModeEdit
                                            onClick={() => {
                                                if (editPost.status) {
                                                    setMessage(text);
                                                    SetEditPost({ postId: '', status: false })
                                                }
                                                else {
                                                    SetEditPost({ postId: postId, status: true })
                                                }
                                            }}
                                            color='white' 
                                            style={{
                                                marginLeft: '10px',
                                                cursor: 'pointer'
                                            }}
                                        />
                                        <BsFillTrashFill
                                            onClick={() => { setDeleteScreen({ postId: postId, status: true }) }}
                                            color='white'
                                            style={{
                                                marginLeft: '10px',
                                                cursor: 'pointer'
                                            }}
                                            size='15px'
                                        />
                                    </IconsWrapper>
                                </>)}
                        </Title>
                        <Description>
                            <ReactTagify
                                colors={"white"}
                                tagClicked={(tag) => {
                                    goTo(tag)
                                }}
                            >
                                {text}
                            </ReactTagify>
                            {
                                (editPost.status && postId === editPost.postId) ?
                                    (
                                        <>
                                            <EditContainer></EditContainer>
                                            <form onSubmit={sendForm}>
                                                <TextInput
                                                    type="text" id="message"
                                                    name="message" onChange={handleChange}
                                                    required={true} value={message}
                                                    ref={inputRef}
                                                ></TextInput>
                                            </form>
                                        </>
                                    ) :
                                    ('')
                            }
                        </Description>

                        <UrlMetadaSpace>
                            <UrlMetadaDetails>
                                <TitleUrl> {`${urlMetadataOBJ.title}`} </TitleUrl>
                                <DescriptionUrl> {`${urlMetadataOBJ.description}`} </DescriptionUrl>
                                <LinkUrl>{`${urlMetadataOBJ.url}`}</LinkUrl>
                            </UrlMetadaDetails>
                            <ImageUrl>
                                <img src={urlMetadataOBJ.image?.url}
                                    alt="image not found" />
                            </ImageUrl>
                        </UrlMetadaSpace>
                    </Main>
                </PostHTML>
                )
            }
        </>
    )
}

const Text = styled.div``
const PostHTML = styled.div`
    display: flex;
    width: 610px;
    border-radius:16px;
    margin-bottom: 16px;
    background-color:  black;
    position: relative;
`
const TitleUrl = styled.h1`
  font-family: Lato;
  font-size: 16px;
  font-weight: 400;
  line-height: 19px;
  letter-spacing: 0em;
  text-align: left;
  color: #cecece;
  margin-bottom: 10px;
`;
const DescriptionUrl = styled.p`
  font-family: Lato;
  font-size: 11px;
  font-weight: 400;
  line-height: 13px;
  letter-spacing: 0em;
  text-align: left;
  color: #9b9595;
`;
const LinkUrl = styled.p`
  font-family: Lato;
  font-size: 11px;
  font-weight: 400;
  line-height: 13px;
  letter-spacing: 0em;
  text-align: left;
  color: #9b9595;
  position: absolute;
  bottom: 10px;
`;
const UrlMetadaDetails = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  padding: 24px 27px 5px 19px;
`;
const ImageUrl = styled.div`
    img {
        width: 154px;
        height: 153px;
        border-radius:  0 16px 16px 0 ;
        object-fit: cover 
    }
`
const ImgWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    div{
        color: ${props => props.color === 'true' ? 'red' : 'white'};
        cursor: pointer;
    }
    img{
        margin: 18px 18px 30px 18px ;
        width:50px;
        height:50px;
        border-radius: 50%;
        object-fit: cover;
    }
    p{
        margin-top: 5px;
        color: white;
    }
`
const Main = styled.div`
  padding: 0 21px 20px 0;
  /* background-color: blue; */
`;
const Title = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 5px 0 7px 0;
  margin-top: 16px;
  /* background-color: blue; */
  h1 {
    font-size: 19px;
    font-weight: 400;
    line-height: 22.8px;
    color: #fff;
    cursor: pointer;
  }
`;
const IconsWrapper = styled.div`
  color: blue;
`;
const Description = styled.div`
    margin-bottom: 15px;
    font-size: 17px;
    font-weight: 600;
    color: #B7B7B7;
    /* background-color: yellow; */
`
const UrlMetadaSpace = styled.div`
  display: flex;
  justify-content: space-between;
  width: 503px;
  height: 155px;
  margin-bottom: 10px;
  border: solid 1px gray;
  border-radius: 16px;
  color: white;
  /* background-color: red; */
`;
const EditContainer = styled.div`
    background-color:  black;
    width: 100%;
    height: 30px;
    border: unset;
    border-radius:5px;
`;
const TextInput = styled.input`
    position:absolute;
    top:40px;
    left:85px;
    width:83%;
    height: 16%;
    border: unset;
    border-radius:5px;
    margin-top: 10px;
    background-color: #EFEFEF;
    ::placeholder{
        font-size: 15px;
        font-weight: 300;
        color: #949494;
    }
`