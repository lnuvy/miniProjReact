import React from 'react'
import styled from 'styled-components'

const Input = (props) => {
  const {
    label,
    placeholder,
    _onChange,
    type,
    value,
    autoComplete,
    height,
  } = props
  return (
    <>
      <SmallText>{label}</SmallText>
      <InputField
        type={type}
        placeholder={placeholder}
        onChange={_onChange}
        value={value}
        autoComplete={autoComplete}
      />
    </>
  )
}

Input.defaultProps = {
  label: '',
  placeholder: '텍스트를 입력하세용',
  _onChange: () => {},
  type: 'text',
  value: '',
  autoComplete: 'on',
  height: '',
  clickColor: '',
}

const SmallText = styled.small`
  color: #aaa;
  display: flex;
  flex-direction: column;
  float: left;
`

const InputField = styled.input`
  background-color: transparent;
  border: none;
  border-bottom: 1px solid #ccc;
  color: #555;
  margin: 10px 0px;
  box-sizing: border-box
  padding: 10px 0px;
  position: relative;
    ${(props) => (props.width ? `width: ${props.width};` : `width: 100%;`)};
    ${(props) => (props.height ? `height: ${props.height};` : `height: 30px;`)};

  &:focus {
    outline: none;
    color: #98DDCA;
    ${(props) => (props.clickColor ? `color: ${props.clickColor};` : '')};
  }
`
//focus값이나 hover값도 프롭스로 전달 하는 법이 있나......궁금

export default Input
