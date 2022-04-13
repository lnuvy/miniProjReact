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
            <Text weight="900" size="30px" marign="0px">
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
            내가 쓴 글
          </Text>
          {postList ? (
            postList.map((l) => {
              return (
                <MyPostBox
                  key={l.postId}
                  onClick={() => {
                    history.push(`/list/${l.category}/${l.postId}`);
                  }}
                >
                  <Grid>
                    <Image src={l.imageUrl} />
                    <Text size="20px;">{l.content}</Text>
                  </Grid>
                </MyPostBox>
              );
            })
          ) : (
            <Text margin="20px" size="30px">
              텅텅...아직 쓴 글이 없어요!
            </Text>
          )}
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
  margin: 30px auto;
  text-align: center;
  align-items: center;
  width: 350px;
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

const MyPostBox = styled.div`
  max-width: 300px;
  width: 100%;
  margin: 0 auto;
  text-align: center;
  align-items: center;
  padding: 20px;
  border: 1px solid #eee;
  border-radius: 20px;
  flex-direction: row;
`;
export default Profile;
