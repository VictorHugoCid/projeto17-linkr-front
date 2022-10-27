import styled from "styled-components";
import { BsFillTrashFill, BsHeart, BsHeartFill } from "react-icons/bs";
import { MdModeEdit } from "react-icons/md";
import { ReactTagify } from "react-tagify";
import React from "react";
import { useContext, useEffect, useState } from "react";
import mql from '@microlink/mql'
import { useNavigate } from "react-router-dom";
import ReactTooltip from 'react-tooltip';
import GlobalContext from "../../contexts/globalContext";
import PropagateLoader from "react-spinners/PropagateLoader";
import { OnClickEditPost } from "./Functions/editPost";
import EditInput from "./Functions/editInput";
import { GoToTag } from "./Functions/goToTag";

import { updateLike, updateDislike } from '../../Services/api.js'
import getConfig from "../../Services/getConfig";

export default function Post(
    {
        username,
        postUserId,
        userImg,
        text,
        link,
        likesQtd,
        postId,
        userLiked
    }
) {
    //useState
    const [like, setLike] = useState(false)
    const [message, setMessage] = useState('');
    const [urlMetadataOBJ, setUrlMetadataOBJ] = useState({})
    const [form, setForm] = useState({ link: '', text: '' })
    //GlobalContext
    const {
        setDeleteScreen, editPost, SetEditPost,
        postId_global, setPostId_global,
        reRender, setReRender } = useContext(GlobalContext);
    // generic const declaration
    const navigate = useNavigate()
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");
    const handleChange = event => {
        if (!message) { setMessage(text) }
        setMessage(event.target.value);
    };

    useEffect(async () => {
        SetEditPost({ postId: '', status: false })
        if (!message) { setMessage(text) }

        if (userLiked) {

            setLike(true)
        }

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

    function HandleLike(like) {
        const body = { postId }

        try {
            if (!like) {
                // console.log('like')
                updateLike(getConfig(token), body)
                setReRender(!reRender)
            } else {
                // console.log('dislike')
                updateDislike(getConfig(token), body)
                setReRender(!reRender)
            }

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>{
            (!urlMetadataOBJ.url) ?
                (<PropagateLoader color="#b3b3b3" />)
                :
                (<PostHTML>
                    <ImgWrapper
                        like={like}
                    >
                        <img src={userImg} />
                        <div
                            data-tip data-for="registerTip"
                        >
                            {like ?
                                (
                                    <BsHeartFill
                                        size='20px'
                                        onClick={() => {
                                            setLike(false)                                            
                                            HandleLike(like)
                                        }}
                                    />
                                ) : (
                                    <BsHeart
                                        size='20px'
                                        onClick={() => {
                                            setLike(true)
                                            HandleLike(like)
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


                        <p>
                            {!likesQtd ? (
                                '0 likes'
                            ) : (
                                <>
                                    {(likesQtd > 1) ? (
                                        <p>
                                            {likesQtd} likes
                                        </p>
                                    ) : (
                                        '1 like'
                                    )}
                                </>
                            )}
                        </p>

                    </ImgWrapper>
                    <Main>
                        <Title>
                            {userId !== postUserId ?
                                (<h1 onClick={() => navigate(`/user/${postUserId}`)} >
                                    {username}
                                </h1>)
                                :
                                (<>
                                    <h1 onClick={() => navigate(`/user/${postUserId}`)} >
                                        {username}
                                    </h1>
                                    <IconsWrapper>
                                        <MdModeEdit
                                            onClick={() => {
                                                OnClickEditPost({ text, editPost, setMessage, SetEditPost, postId })
                                            }}
                                            color='white'
                                            style={{
                                                marginLeft: '10px',
                                                cursor: 'pointer'
                                            }}
                                        />
                                        <BsFillTrashFill onClick={() => { setDeleteScreen({ postId: postId, status: true }) }}
                                            color='white'
                                            style={{
                                                marginLeft: '10px',
                                                cursor: 'pointer'
                                            }}
                                            size='15px' />
                                    </IconsWrapper>
                                </>)}
                        </Title>
                        <Description>

                            <ReactTagify colors={"white"}
                                tagClicked={(tag) => { GoToTag(tag) }} >
                                {text}
                            </ReactTagify>
                            {(editPost.status && postId === editPost.postId) ?
                                (<EditInput
                                    postId={postId}
                                    SetEditPost={SetEditPost}
                                    handleChange={handleChange}
                                    message={message}
                                    setMessage={setMessage}
                                    text={text}
                                />)
                                :
                                ('')}
                        </Description>
                        <a href={`${urlMetadataOBJ.url}`}

                            target="_blank"
                            rel="noopener noreferrer">
                            <UrlMetadaSpace>
                                <UrlMetadaDetails>
                                    <TitleUrl> {`${urlMetadataOBJ.title}`} </TitleUrl>
                                    <DescriptionUrl> {`${urlMetadataOBJ.description}`} </DescriptionUrl>
                                    <LinkUrl>{`${urlMetadataOBJ.url}`}</LinkUrl>
                                </UrlMetadaDetails>
                                <ImageUrl>
                                    <img src={urlMetadataOBJ.image?.url}
                                        alt='image not found &#x1F625;' />
                                </ImageUrl>
                            </UrlMetadaSpace>
                        </a>
                    </Main>
                </PostHTML>)
        }</>)
}


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
        color: ${props => props.like? 'red' : 'white'};
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
  /* background-color: red; */
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
    cursor: pointer;
    /* background-color: red; */
    :hover { 
        transition: 0.5s;
        background-color: white ;
        background: rgba(255, 255, 255, 0.2);
    }
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
// const ToolTip = styled.div`
// max-height: 50px;
// display: flex;
// justify-content: center;
// align-items: center;

// `
