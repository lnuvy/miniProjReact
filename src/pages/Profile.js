import React from "react";
import { Grid, Input, Text, Button, Image } from "../elements/index";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { actionCreators as postActions } from "../redux/modules/post";
import { history } from "../redux/configureStore";
import CateBox from "../components/CateBox";
import LikeIcon from "../components/LikeIcon";

const Profile = (props) => {
  const dispatch = useDispatch();
  let params = useParams();
  const user = useSelector((state) => state.user.user || []);
  const postList = useSelector((state) => state.post.list);

  const userId = params.id;

  React.useEffect(() => {
    dispatch(postActions.getMyPostDB(userId));
  }, []);

  const handleClick = (e) => {
    e.stopPropagation();
    const categoryValue = e.target.id;
    console.log(categoryValue);
    history.push(`/list/${categoryValue}`);
  };

  return (
    <>
      <Container>
        <InfoBox>
          <Grid>
            <Text weight="900" size="30px" margin="0px">
              My Profile
            </Text>
            <Grid>
              <Text weight="700" size="24px">
                {user.userId}
              </Text>
              <Grid isFlex_center>
                <Text weight="600" size="22px">
                  {user.userNickname}
                </Text>
                <Text weight="500" size="20px" color="#aaa">
                  &nbsp; ({user.userAge})
                </Text>
              </Grid>
            </Grid>
            <Text width="100px" bg="#C3B9EA"></Text>
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
                    key={post.postId}
                    onClick={(e) => {
                      e.stopPropagation();
                      history.push(`/list/${post.category}/${post.postId}`);
                    }}
                  >
                    <Grid>
                      <Image src={post.imageUrl} />
                      <Grid>
                        <Text margin="20px 0 0" size="20px" weight="500">
                          {post.itemName}
                        </Text>
                        <CateBox
                          nowCategory={post.category}
                          _onClick={handleClick}
                        />

                        <LikeIcon post={post} />
                      </Grid>
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
  padding: 30px;
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
  cursor: pointer;
  text-align: center;
  align-items: center;
  padding: 20px;
  box-shadow: rgba(0, 0, 0, 0.09) 0px 3px 12px;
  border-radius: 20px;
  min-height: 170px;
  max-width: 500px;
  flex-direction: column;
`;
export default Profile;
