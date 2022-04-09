import React from 'react'
import styled from 'styled-components'

const Text = (props) => {
  const { children } = props
  return (
    <>
      <Text>{children}</Text>
    </>
  )
}

Text.defaultProps = {}

export default Text
