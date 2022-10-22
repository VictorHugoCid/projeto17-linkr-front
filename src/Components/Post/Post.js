import styled from "styled-components";
import React from "react";
import { ReactTagify } from "react-tagify";
import { BsFillTrashFill, BsHeart, BsHeartFill } from "react-icons/bs";
import { MdModeEdit } from "react-icons/md";
import { useEffect, useState } from "react";
import mql from '@microlink/mql'

export default function Post(
    { username,
        img,
        text,
        link,
        likesQtd,
        liked }
) {
    const [like, setLike] = useState(liked)
    const [props, setProps] = useState('false')
    const [isShown, setIsShown] = useState(false)
    const [urlMetadataOBJ, setUrlMetadataOBJ] = useState({})

    useEffect(async () => {
        if (like) { setProps('true') }
        const { data } = await mql('https://www.youtube.com/watch?v=rSL3LX8YYOw', {
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
    return (
        <>
            {(!urlMetadataOBJ.url) ? (<p>LOADING</p>)
                : (
                    <PostHTML>
                        <ImgWrapper props={props}>
                            <img src='https://uploads.jovemnerd.com.br/wp-content/uploads/2021/09/jujutsu-kaisen-0-gojo-nova-imagem.jpg' />
                            <div>
                                {props === 'true' ? (
                                    <BsHeartFill
                                        size='20px'
                                        onClick={() => {
                                            setLike(!like)
                                            setProps('false')
                                        }}
                                        onMouseEnter={() => setIsShown(true)}
                                        onMouseLeave={() => setIsShown(false)}
                                    />
                                ) : (
                                    <BsHeart
                                        size='20px'
                                        onClick={() => {
                                            setLike(!like)
                                            setProps('true')
                                        }}
                                        onMouseEnter={() => setIsShown(true)}
                                        onMouseLeave={() => setIsShown(false)}
                                    />
                                )}

                            </div>

                            <p>{likesQtd}</p>


                            <Likes
                                onMouseEnter={() => setIsShown(true)}
                                onMouseLeave={() => setIsShown(false)}
                                isShown={isShown}
                            >
                                <p>vários likes pra tu ficá feliz</p>

                            </Likes>

                        </ImgWrapper>
                        <Main>
                            <Title>
                                <h1>{username}</h1>
                                <IconsWrapper>
                                    <MdModeEdit
                                        color='white'
                                        style={{
                                            cursor: 'pointer'
                                        }}
                                    />
                                    <BsFillTrashFill
                                        color='white'
                                        style={{
                                            marginLeft: '10px',
                                            cursor: 'pointer'
                                        }}
                                        size='15px'
                                    />
                                </IconsWrapper>
                            </Title>
                            <Description>
                                <ReactTagify
                                    colors={"white"}
                                    tagClicked={(tag) => {
                                        console.log(tag)
                                        console.log(typeof(text))
                                    }}
                                >
                                     {text}
                                </ReactTagify>
                            </Description>

                            <UrlMetadaSpace>
                                <UrlMetadaDetails>
                                    <TitleUrl> {`${urlMetadataOBJ.title}`} </TitleUrl>
                                    <DescriptionUrl> {`${urlMetadataOBJ.description}`} </DescriptionUrl>
                                    <LinkUrl>{`${urlMetadataOBJ.url}`}</LinkUrl>
                                </UrlMetadaDetails>
                                <ImageUrl>
                                    {console.log(urlMetadataOBJ)}
                                    <img src={urlMetadataOBJ.image.url}
                                        alt="description of image" />
                                </ImageUrl>
                            </UrlMetadaSpace>
                        </Main>
                    </PostHTML>
                )
            }
        </>
    )
}

const TitleUrl = styled.h1`
    font-family: Lato;
    font-size: 16px;
    font-weight: 400;
    line-height: 19px;
    letter-spacing: 0em;
    text-align: left;
    color: #CECECE;
    margin-bottom: 10px;
`
const DescriptionUrl = styled.p`
    font-family: Lato;
    font-size: 11px;
    font-weight: 400;
    line-height: 13px;
    letter-spacing: 0em;
    text-align: left;
    color: #9B9595;

`
const LinkUrl = styled.p`
    font-family: Lato;
    font-size: 11px;
    font-weight: 400;
    line-height: 13px;
    letter-spacing: 0em;
    text-align: left;
    color: #9B9595;
    position: absolute;
    bottom: 10px;

`
const UrlMetadaDetails = styled.div`
    display: flex;
    flex-direction: column;
    position: relative;
    padding: 24px 27px 5px 19px ;
`
const ImageUrl = styled.div`
    img {
        width: 154px;
        height: 153px;
        border-radius:  0 16px 16px 0 ;
        object-fit: cover 
    }
`
const PostHTML = styled.div`
    display: flex;
    width: 610px;
    border-radius:16px;
    margin-bottom: 16px;
    background-color:  black;
`
const ImgWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    div{
        color: ${props => props.props === 'true' ? 'red' : 'white'};
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
`
const Title = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding: 5px 0 7px 0;
    margin-top: 16px;
    /* background-color: blue; */
    h1{
        font-size: 19px;
        font-weight: 400;
        line-height: 22.8px;
        color: #FFF;
        cursor: pointer;
    }
`
const IconsWrapper = styled.div`
    color: blue;
`
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
`
const Likes = styled.div`
    width: auto;
    height: auto;
    padding: 5px;
    background-color: #FFF;
    opacity:${props => props.isShown ? '1' : '0'};
    z-index: ${props => props.isShown ? '1' : '-1'};;
    transition: all 0.5s ease-out;

    p{
        color: #505050;
        font-size: 13px;
        font-weight: 700;
    }
    position: absolute;
    top:50%;
`