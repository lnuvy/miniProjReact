import React from 'react'
import styled from 'styled-components'

const Text = (props) => {
  const { children, ...styles } = props
  return <Ptag {...styles}>{children}</Ptag>
}

Text.defaultProps = {
  children: null,
  bold: false,
  color: '#222831',
  size: '16px',
  margin: false,
  center: false,
  weight: false,
  align: false,
}

const Ptag = styled.p`
  color: ${(props) => props.color};
  /* font-size: ${(props) => props.size}; */
  ${(props) => (props.size ? `font-size: ${props.size};` : null)}
  font-weight: ${(props) => (props.bold ? '600' : '400')};
  ${(props) => (props.weight ? `font-weight:${props.weight};` : '400')};

  ${(props) => (props.margin ? `margin:${props.margin};` : '')}
  ${(props) => (props.center ? `text-align: center;` : '')}
  ${(props) => (props.align ? `text-align: ${props.align};` : '')}
`

export default Text
