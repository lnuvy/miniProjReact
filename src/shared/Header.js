import React from 'react'
import { Text, Grid, Button } from '../elements/index'
import { useDispatch } from 'react-redux'
import { history } from '../redux/configureStore'
import { actionCreators as userActions } from '../redux/modules/user'
import { MdLogout } from 'react-icons/md'
import styled from 'styled-components'

const Header = (props) => {
  const dispatch = useDispatch()
  return (
    <Container>
      <Grid isFlex>
        <Text size="50px" margin="0" onClick={() => history.push('/')}>
          🐶🍯
        </Text>
        <Grid isFlex>
          <Grid padding="15px">
            <Text weight="400" onClick={() => history.push('/list/:category')}>
              Category
            </Text>
          </Grid>
          <Grid padding="15px">
            <Text weight="400" onClick={() => history.push('/profile/:id')}>
              My info
            </Text>
          </Grid>
          <Grid
            isFlex
            padding="15px"
            onClick={() => {
              dispatch(userActions.logoutAction({}))
            }}
          >
            <MdLogout size="20" />
            <Text weight="400">LogOut</Text>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  )
}

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`

export default Header
