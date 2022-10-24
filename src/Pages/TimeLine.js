import styled from "styled-components"
import Post from "../Components/Post/Post.js";
import FormBox from "../Components/FormBox/FormBox.js"
import Trending from "../Components/Trending/Trending.js"
import getConfig from '../Services/getConfig.js'
import { deletePost, getTimeLine } from '../Services/api.js'
import { useContext, useEffect, useState } from "react"
import GlobalContext from "../contexts/globalContext.js"
import { MdYoutubeSearchedFor } from "react-icons/md";


export default function TimeLine() {
    // 0 - 4;5 - 9; 10-14

    const { reRender, setReRender } = useContext(GlobalContext)
    const [posts, setPosts] = useState({
        array: [],
        size:0
    })

    const [n, setN] = useState(0)
    const {deleteScreen, setDeleteScreen} = useContext(GlobalContext)
    const token = localStorage.getItem("token")

    useEffect(() => {
        getTimeLine(getConfig)
            .then((res) => {
                setPosts({
                    array:res.data.slice(n, n + 50),
                    Size: res.data.length
                })

                // console.log('arraySize',arraySize)

                console.log(posts)
                console.log(posts.array)

                // MUDAR 4 PARA 20
            })

    }, [reRender])

    function nextPage() {
        if (n + 50 > 1000000) {
            let add = 1000000 - n
            if (add > 0) setN(n + add)
            return
        }
        setN(n + 50)
        setReRender(!reRender)
    }

    function DeleteBox(){
        return(
            <FullScreen>
                <Box> 
                    <h1> Are you sure you want to delete this post? </h1>
                    <DeleteOpcions>
                        <NoGoBack onClick={() => setDeleteScreen({postId: '', status: false})}>
                            <span>No, go back</span>
                        </NoGoBack>
                        <YesDeleteIt onClick={() => {   deletePost(deleteScreen.postId, getConfig(token))
                                                        setDeleteScreen({postId: '', status: false})  }}>
                            <span>Yes, delete it</span>
                        </YesDeleteIt>
                    </DeleteOpcions>  
                </Box>
            </FullScreen>
        )
    }
    
    if(posts.array.length === 0){
        return (
            <div> LOADING </div>
        )
    }

    console.log('screenDelete :', deleteScreen)
    return ( 
        <Wrapper>
            {(deleteScreen.status) ? ( <DeleteBox/> ) : ( <></> )}
            <MainContent>
                <Title> <h1>timeline</h1> </Title>
                <FormBox />
                {posts.array.map((value, index) => 
                    {
                    return <Post
                        postId={value.postId}
                        key={index}
                        username={value.username}
                        img={value.img}
                        text={value.text}
                        link={value.link}
                        likesQtd={value.likesQtd}
                        liked={value.liked}
                        postUserId={value.userId}
                    />}
                )}
                <NextPage onClick={() => { nextPage() }} >
                    Carregar mais
                </NextPage>
            </MainContent>

            <AsideContent>
                <TrendingWrapper>
                    <Trending />
                </TrendingWrapper>
            </AsideContent>
        </Wrapper>
    )
}

const DeleteOpcions = styled.div`
    display: flex;
    margin-top: 40px;
    justify-content: space-around;
`
const NoGoBack = styled.button`
    display: flex;
    width: 134px;
    height: 37px;
    border-radius: 5px;
    justify-content: center;
    align-items: center;
    span{
        font-family: Lato;
        font-size: 20px;
        font-weight: 700;
        line-height: 22px;
        letter-spacing: 0em;
        text-align: center;
        color: #1877F2;
    }
    background-color: #FFFFFF;
`
const YesDeleteIt = styled.button`
    display: flex;
    width: 134px;
    height: 37px;
    border-radius: 5px;
    justify-content: center;
    align-items: center;
    span{
        font-family: Lato;
        font-size: 20px;
        font-weight: 700;
        line-height: 22px;
        letter-spacing: 0em;
        text-align: center;
        color: #FFF;
    }
    background-color: #1877F2;
`
const FullScreen = styled.div`
    display: flex;
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    justify-content: center;
    align-items: center;
    z-index: 2;
    align-items: center;
    background: rgba(255, 255, 255, 0.9);
`
const Box = styled.div`
    height: 262px;
    width: 597px;
    border-radius: 50px;
    background-color: #333333;
    padding: 35px 110px 30px 110px ;
    h1 {
        font-family: Lato;
        font-size: 34px;
        font-weight: 700;
        line-height: 41px;
        letter-spacing: 0em;
        text-align: center;
        color: #FFF;
    }
`
const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    min-height: 100vh;
    height: 100%;
    padding-top: 80px;
    background-color: #333333 ;
`
const AsideContent = styled.div`
    height: 500px;
    width: 21vw;
`
const MainContent = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 610px;
`
const Title = styled.div`
    width:100%;
    display: flex;
    justify-content: flex-start;
    margin-bottom: 45px;
    h1{
        font-size: 43px;
        font-weight: 700;
        margin-bottom: 10px;
        color: #fff;
        font-family: 'Oswald';
    }
`
const TrendingWrapper = styled.div`
    height: 100%;
    top:50px;
`
const NextPage = styled.div`
    width: 200px;
    height: 70px;
    margin-top: 20px;
    margin-bottom:20px;
    background-color: black;
    border-radius: 10px;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
`