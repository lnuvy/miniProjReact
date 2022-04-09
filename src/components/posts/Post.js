import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Grid, Image, Text } from "../../elements";
import CommentList from "./CommentList";

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
    <Grid width="100%">
      <Grid isFlex_center>
        <Grid width="50%" padding="30px">
          <Image src={item?.imageUrl} />
        </Grid>
        <Grid>
          <Text bold size="24px">
            {item?.itemName}
          </Text>
          <Text size="20px">{item?.writer?.userId}</Text>
          <Text size="15px">댓글 {item.commentCnt}개</Text>
          <Text size="15px">좋아요 {item.likeCnt}개</Text>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Post;
