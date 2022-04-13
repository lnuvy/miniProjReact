import React from "react";
import { Grid, Input, Text, Button, Image } from "../elements/index";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { actionCreators as postActions } from "../redux/modules/post";
import { history } from "../redux/configureStore";

const Profile = (props) => {
  const dispatch = useDispatch();
  let params = useParams();
  const user = useSelector((state) => state.user.user || []);
  const postList = useSelector((state) => state.post.list);

  const userId = params.id;

  React.useEffect(() => {
    dispatch(postActions.getMyPostDB(userId));
  }, []);

  return (
    <>
      <Container>
        <InfoBox>
          <Grid>
            <Text weight="900" size="30px" margin="0px">
              My Profile
            </Text>
            <Grid isFlex_center>
              <Text weight="700" size="24px">
                {user.userNickname}
              </Text>
            </Grid>
            <Button width="100px" bg="#C3B9EA">
              {user.userAge}
            </Button>
          </Grid>
        </InfoBox>

        <PostBox>
          <Text weight="900" size="30px" marign="0">
            내가 쓴 글 📝
          </Text>
          <PostList>
            {postList?.length !== 0 ? (
              postList.map((post, i) => {
                return (
                  <MyPostBox
                    onClick={() => {
                      history.push(`/list/${post.category}/${post.postId}`);
                    }}
                  >
                    <Grid>
                      <Image src={post.imageUrl} />
                      <Text size="20px;">{post.content}</Text>
                    </Grid>
                  </MyPostBox>
                );
              })
            ) : (
              <Text margin="20px" size="30px">
                텅텅 🥺...아직 쓴 글이 없어요!
              </Text>
            )}
          </PostList>
        </PostBox>
      </Container>
    </>
  );
};

const Container = styled.div`
  margin: 0 auto;
  width: 80%;
  text-align: center;
  align-items: center;
`;

const InfoBox = styled.div`
  margin: 100px auto 20px;
  text-align: center;
  align-items: center;
  max-width: 350px;
  padding: 50px;
  border-radius: 40px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
`;
const PostBox = styled.div`
  margin: 10px auto;
  text-align: center;
  align-items: center;
  padding: 50px;
`;

const PostList = styled.div`
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
`;

const MyPostBox = styled.div`
  text-align: center;
  align-items: center;
  padding: 20px;
  border: 1px solid #eee;
  border-radius: 20px;
  min-height: 170px;
  flex-direction: column;
`;
export default Profile;
