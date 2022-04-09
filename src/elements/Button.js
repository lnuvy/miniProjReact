import React from 'react'
import styled from 'styled-components'

const Button = (props) => {
  const { children, _id, _onClick, ...styles } = props

  return (
    <ElButton id={_id} {...styles}>
      {children}
    </ElButton>
  )
}

Button.defaultProps = {
  _id: '',
  children: null,
  _onClick: () => {},
  isFloat: false,
  margin: false,
  width: '100%',
  padding: '12px 0px',
  _color: false,
}

const ElButton = styled.button`
  cursor: pointer;
  font-size: 18px;
  width: ${(props) => props.width};
  ${(props) =>
    props._color ? `background: ${props._color};` : `background: #212121;`}
  color: #fff;
  box-sizing: border-box;
  padding: ${(props) => props.padding};
  border: none;
  border-radius: 30px;
  ${(props) => (props.margin ? `margin: ${props.margin};` : '')}
`

export default Button

//브랜치 체크
