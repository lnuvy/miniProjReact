import axios from 'axios'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Grid, Text, Image } from '../../elements/index'
import { actionCreators as postActions } from '../../redux/modules/post'

const MyPost = (props) => {
  const dispatch = useDispatch()
  const userId = useSelector((state) => state.user)

  //   React.useEffect(() => {
  //     dispatch(postActions.getMyPostFB(userId))
  //   }, [])

  return (
    <>
      <Grid>
        <Image />
        <Text></Text>
      </Grid>
    </>
  )
}

export default MyPost
