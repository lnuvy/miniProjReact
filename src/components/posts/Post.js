import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { AuthButton, Grid, Image, Text } from "../../elements";
import { actionCreators as postActions } from "../../redux/modules/post";
import CommentList from "./CommentList";
import styled from "styled-components";
import { history } from "../../redux/configureStore";

// Font Awesome Icon
import { FaCommentAlt } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";

// 게시글 하나에 대한 컴포넌트
const Post = (props) => {
  const dispatch = useDispatch();
  // 와이어프레임의 상세페이지에 코멘트를 제외하고는 List 와 똑같이 뿌려주면 될것같아서
  // useParmas 로 아이디 값이 있는지 확인 후 리턴값을 변경해줍니다
  const { category, id } = useParams();
  const { ...item } = props;
  const currentUser = useSelector((state) => state.user?.user?.userId);

  // 현재 로그인한 유저가 이 게시글의 작성자인지 확인
  const isMe = currentUser === item.userId ? true : false;

  const cate = {
    chair: "#C3E5AE",
    desk: "#C3B9EA",
    elecItem: "#F1E1A6",
    healthCare: "#F4BBBB",
    etc: "#77E4D4",
  };
  const cateColor = Object.entries(cate).filter((l) => l[0] === category)[0];
  console.log(cateColor[1]);

  return (
    // 컨테이너
    <Container>
      <InfoBox isDetail={id || null} category={cateColor[1]}>
        <Grid padding="10px">
          <Image
            src={
              item?.imageUrl === "imageUrl"
                ? "https://hanghae-react1.s3.ap-northeast-2.amazonaws.com/%EA%B3%A0%EC%96%91%EC%9D%B4+%EC%82%AC%EC%A7%84+%EB%AA%A8%EC%9D%8C+-+(2).jpg"
                : item?.imageUrl
            }
          />
        </Grid>
        <h2>{item?.itemName}</h2>
        {id && (
          <>
            <Grid>
              <Text margin="0" size="14px">
                {item.content}
              </Text>
            </Grid>
            <Grid isFlex>
              <AuthButton
                isMe={isMe}
                onClick={(e) => {
                  e.stopPropagation();
                  history.push(`/write/${category}/${item.postId}`);
                }}
              >
                수정
              </AuthButton>
              <AuthButton
                isMe={isMe}
                onClick={(e) => {
                  e.stopPropagation();
                  dispatch(postActions.deletePostDB(item.postId, category));
                }}
              >
                삭제
              </AuthButton>
            </Grid>
          </>
        )}
        <h4>{item?.writer?.userId}</h4>
        <Grid isFlex_start>
          <Grid isFlex_end padding="10px">
            <FaCommentAlt size={14} /> &nbsp;
            <Text margin="0" size="16px">
              {item.commentCnt}개
            </Text>
          </Grid>
          {/* 여기서 좋아요가 눌렸는지 아닌지 체크해야할듯? */}
          <Grid isFlex_start padding="10px">
            <FaRegHeart size={14} /> &nbsp;
            <Text margin="0" size="16px">
              {item.likeCnt}개
            </Text>
          </Grid>
        </Grid>
      </InfoBox>
    </Container>
  );
};

const Container = styled.div`
  /* background-color: ${(props) => props.category}; */
`;

const InfoBox = styled.div`
  background-color: ${(props) => props.category};
  margin: 30px auto;
  text-align: center;
  align-items: center;
  max-width: 350px;
  width: 70%;
  min-width: 300px;
  /* padding: 50px; */
  ${(props) => (props.isDetail ? `padding: 20px;` : `padding: 50px;`)}
  border-radius: 40px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 16px;
`;

export default Post;
