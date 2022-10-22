import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getHashtagTrending } from "../../Services/api.js";

export default function Trending() {
  const [trendingHashtags, setTrendingHashtags] = useState([]);
  useEffect(() => {
    getHashtagTrending().then((res) => {
      setTrendingHashtags(res.data);
    });

    getHashtagTrending().catch((res) => {
      console.log(res);
    });
  }, []);

  const navigate = useNavigate();

  function goHashtagPage(tag) {
    navigate(`/hashtag/${tag.name}`);
  }
  return (
    <TrendingWrapper>
      <h2>Trending</h2>
      <Line />
      {trendingHashtags.length === 0
        ? ""
        : trendingHashtags.map((tag, index) => (
            <p key={index} onClick={() => goHashtagPage(tag)}>
              {tag.name}
            </p>
          ))}
    </TrendingWrapper>
  );
}

const TrendingWrapper = styled.div`
  width: 300px;
  background-color: #171717;
  border-radius: 16px;
  padding: 15px;
  margin-left: 15px;
  margin-top: 8vh;

  h2 {
    font-size: 27px;
    font-weight: 700;
    color: #fff;
    font-family: "Oswald";
  }

  p {
    font-size: 19px;
    font-weight: 500;
    color: #fff;
    cursor: pointer;
  }
`;

const Line = styled.div`
  width: 100%;
  height: 1px;
  border: 1px solid #484848;
  margin: 5px 0 5px 0;
`;
