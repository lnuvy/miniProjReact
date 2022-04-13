import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { AuthButton, Grid, Image, Text } from "../../elements";
import {
  actionCreators,
  actionCreators as postActions,
} from "../../redux/modules/post";
import styled from "styled-components";
import { history } from "../../redux/configureStore";
import { changeTime } from "../../shared/ChangeTime";
import LikeIcon from "../LikeIcon";

// Font Awesome Icon
import { MdOutlineModeComment } from "react-icons/md";

// 게시글 하나에 대한 컴포넌트
const Post = (props) => {
  const dispatch = useDispatch();
  // 와이어프레임의 상세페이지에 코멘트를 제외하고는 List 와 똑같이 뿌려주면 될것같아서
  // useParmas 로 아이디 값이 있는지 확인 후 리턴값을 변경해줍니다
  const { category, id } = useParams();
  const { _onClick, ...item } = props;
  const currentUser = useSelector((state) => state.user?.user?.userId);

  useEffect(() => {
    dispatch(postActions.getCommentCount(id));
  }, []);

  // 현재 로그인한 유저가 이 게시글의 작성자인지 확인
  const isMe = currentUser === item.userId ? true : false;

  const cate = {
    chair: "rgba(195,229,174, 0.5)",
    desk: "rgba(195,185,234, .5)",
    elecItem: "rgba(241,225,166, .5)",
    healthCare: "rgba(244,187,187, .5)",
    etc: "rgba(119,228,212, .5)",
  };
  const cateColor = Object.entries(cate).filter((l) => l[0] === category)[0];

  return (
    // 컨테이너
    <Container onClick={_onClick}>
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
        <Grid isFlex_center>
          <Text margin="0" size="27px" weight="600">
            {item.itemName} &nbsp;&nbsp;
          </Text>
          <Text color="#636e72" weight={500} margin="0">
            {item.userNickname} ({item.userAge})
          </Text>
        </Grid>

        {id && (
          <>
            <ContentDiv>
              <Text margin="0" size="14px">
                {item.content}
              </Text>
            </ContentDiv>
            <Grid isFlex>
              <AuthButton
                isMe={isMe}
                bg="#5eaba5"
                padding="5px 0"
                margin="10px"
                onClick={(e) => {
                  e.stopPropagation();
                  history.push(`/write/${category}/${item.postId}`);
                }}
              >
                수정
              </AuthButton>
              <AuthButton
                isMe={isMe}
                bg="#d03333"
                padding="5px 0"
                margin="10px"
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

        <Grid isFlex padding="0 20px">
          <Grid isFlex_start>
            <Grid isFlex_start padding="10px">
              <MdOutlineModeComment size={14} /> &nbsp;
              <Text margin="0" size="16px">
                {item.commentCnt}개
              </Text>
            </Grid>
            <Grid isFlex_center padding="10px">
              <Grid
                isFlex
                _onClick={(e) => {
                  e.stopPropagation();
                  dispatch(
                    actionCreators.toggleLikeDB(item.userId, item.postId)
                  );
                }}
              >
                <LikeIcon post={item} />
              </Grid>
            </Grid>
          </Grid>
          <Grid>
            <Text center margin="0" size="14px" color="#9e9e9e" weight="500">
              {changeTime(item.createdAt)}
            </Text>
          </Grid>
        </Grid>
      </InfoBox>
    </Container>
  );
};

const Container = styled.div`
  cursor: pointer;
  /* background-color: ${(props) => props.category}; */
`;

const InfoBox = styled.div`
  background-color: ${(props) => props.category};
  /* opacity: 0.5; */
  margin: 30px auto;
  text-align: center;
  align-items: center;
  max-width: 350px;
  width: 70%;
  min-width: 300px;
  /* padding: 50px; */
  ${(props) => (props.isDetail ? `padding: 20px;` : `padding: 50px;`)}
  border-radius: 40px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
`;

const ContentDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 70px;
`;

export default Post;
