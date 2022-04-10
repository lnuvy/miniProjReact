import React from 'react'
import { Button } from '../elements/index'
import { useDispatch } from 'react-redux'
import { actionCreators as userActions } from '../redux/modules/user'

const Header = (props) => {
  const dispatch = useDispatch()
  return (
    <div>
      <h1>logo</h1>
      <Button
        _onClick={() => {
          dispatch(userActions.logoutAction({}))
        }}
      >
        로그아웃
      </Button>
    </div>
  )
}

export default Header
