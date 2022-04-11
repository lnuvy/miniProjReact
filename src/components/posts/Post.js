import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Grid, Image, Text } from "../../elements";
import { actionCreators as postActions } from "../../redux/modules/post";
import CommentList from "./CommentList";
import styled from "styled-components";

// Font Awesome Icon
import { FaCommentAlt } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { history } from "../../redux/configureStore";

// 게시글 하나에 대한 컴포넌트
const Post = (props) => {
  const dispatch = useDispatch();

  // 와이어프레임의 상세페이지에 코멘트를 제외하고는 List 와 똑같이 뿌려주면 될것같아서
  // useParmas 로 아이디 값이 있는지 확인 후 리턴값을 변경해줍니다
  const { category, id } = useParams();
  const { ...item } = props;

  // 이거 선언해주면 좋은데 아직 뭐가 들어올지 확실치 않아 일단 props.뭐뭐 이렇게 쓰겠습니다
  // const {} = props;

  // user 체크
  // const currentUser = useSelector((state) => state.user?.user?.userId);

  return (
    // 컨테이너
    <Container>
      <Grid width="50%" padding="10px">
        <Image src={item?.imageUrl} />
      </Grid>
      <h2>{item?.itemName}</h2>
      <h4>{item?.writer?.userId}</h4>
      <Grid isFlex_start>
        <Grid isFlex_end padding="10px">
          <FaCommentAlt size={24} /> &nbsp;
          <Text margin="0" size="22px">
            {item.commentCnt}개
          </Text>
        </Grid>
        {/* 여기서 좋아요가 눌렸는지 아닌지 체크해야할듯? */}
        <Grid isFlex_start padding="10px">
          <FaRegHeart size={24} /> &nbsp;
          <Text margin="0" size="22px">
            {item.likeCnt}개
          </Text>
        </Grid>
      </Grid>
      ``
      <button
        onClick={(e) => {
          e.stopPropagation();
          history.push(`/write/${category}/${item.postId}`);
        }}
      >
        수정
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation();
          dispatch(postActions.deletePostDB(item.postId));
        }}
      >
        삭제
      </button>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  border: 1px solid #ddd;
  box-shadow: 2px 2px 2px #ddd;
  padding: 20px;
  margin: 10px auto;
  text-align: center;
  /* min-width: 300px; */
  width: 300px;

  @media only screen and (min-width: 699px) {
    width: calc((100% - 200px) / 2);
  }
  @media only screen and (min-width: 1199px) {
    width: calc((100% - 40px) / 3);
  }
`;

export default Post;
