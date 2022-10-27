import PropagateLoader from "react-spinners/PropagateLoader";
import { useContext, useEffect, useState } from "react"
import styled from "styled-components";
import GlobalContext from "../../contexts/globalContext.js"
import FormBox from "../../Components/FormBox/FormBox.js";
import Trending from "../../Components/Trending/Trending.js";
import DeleteBox from "../../Components/DeleteScreen/deleteScreen.js";
import getConfig from "../../Services/getConfig.js";
import { getTimeLine } from "../../Services/api.js";
import RenderPosts from "./Functions/renderPosts.js";
import AlertNewPosts from "../../Components/AlertNewPosts/AlertNewPosts.js";

export default function TimeLine() {
  const { reRender, setReRender, setHeader, deleteScreen, setYoungestPost, youngestPost } = useContext(GlobalContext);
  const token = localStorage.getItem("token");
  const [posts, setPosts] = useState({ array: [], size: 0 });
  const [n, setN] = useState(0);
  setHeader(true);

  useEffect(() => {

    // console.log('reRender', reRender)
    getTimeLine(getConfig(token)).then((res) => {
      setPosts({
        array: res.data.slice(0, n + 5),
        size: res.data.length,
      });
    });
  }, [reRender, n]);

  //   function nextPage() {
  //     if (n + 10 > posts.size) {

  //         let add = posts.size - n

  //         if (add > 0) {
  //             setN(n + add)
  //         }
  //         return
  //     }

  //     setN(n + 10)

  //     window.scrollTo(0, 0)
  //     setReRender(!reRender)
  // }

  return (
    (posts.array.length === 0) ?
      (<Wrapper>
        <MainContent>
          <Title> <h1>timeline</h1> </Title>

          {/* <AlertNewPosts /> */}

          <FormBox />
          <PropagateLoader color="#b3b3b3" />
        </MainContent>
      </Wrapper>)
      :
      (<Wrapper>
        {deleteScreen.status ? <DeleteBox /> : <></>}
        <MainContent>
          <Title> <h1>timeline</h1> </Title>

          {/* <AlertNewPosts /> */}

          <FormBox />

          <RenderPosts
            postsList={posts.array}
            n={n}
            setN={setN}
          />

        </MainContent>
        <AsideContent>
          <TrendingWrapper>
            <Trending />
          </TrendingWrapper>
        </AsideContent>
      </Wrapper>))
}

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  min-height: 100vh;
  height: 100%;
  padding-top: 80px;
  background-color: #333333;
`;
const AsideContent = styled.div`
  height: 500px;
  width: 21vw;
`;
const MainContent = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 610px;
    margin-top: 100px;
    p{
        margin-top:30px;
        color:white;
    }
    /* background-color: black; */
`
const Title = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  margin-bottom: 45px;
  h1 {
    font-size: 43px;
    font-weight: 700;
    margin-bottom: 10px;
    color: #fff;
    font-family: "Oswald";
  }
`;
const TrendingWrapper = styled.div`
  height: 100%;
  top: 50px;
`;