import React, { useCallback, useEffect, useState } from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Grid, Input, Text } from '../elements'
import { FixedButton, Post } from '../components/posts'
import { actionCreators as postActions } from '../redux/modules/post'
import { useParams } from 'react-router-dom'
import { history } from '../redux/configureStore'
import _ from 'lodash'
import styled from 'styled-components'

// 카테고리 선택 후의 리스트입니다
const CategoryList = () => {
  const dispatch = useDispatch()
  const { category } = useParams()
  const categoryList = useSelector((state) => state.post.list)

  // 카테고리별 이동
  const handleClick = (e) => {
    const categoryValue = e.target.id
    console.log(categoryValue)
    history.push(`/list/${categoryValue}`)
  }

  // useEffect(() => {
  //   dispatch(postActions.getCategoryList(category));
  // }, [category]);

  // 정렬
  const [mostLike, setMostLike] = useState(true)
  const [sorted, SetSorted] = useState(false)

  // 검색
  const [query, setQuery] = useState('')

  const debounce = _.debounce((k) => k, 300)
  const keyPress = useCallback(debounce, [])

  const queryChange = (e) => {
    const { value } = e.target
    keyPress(value)
    setQuery(value)
  }

  // query 로 필터링 한 후의 리스트
  const searchList = categoryList.filter((item) => {
    const { itemName } = item
    const q = query

    return itemName.includes(q)
  })

  return (
    <>
      <FixedButton _onClick={() => history.push(`/write/${category}`)} />
      <Grid>
        {/* <ResDiv> */}
        {/* <Text bold size="24px" margin="0"> */}
        <CateBox>
          <Text weight="900" size="40px">
            Category
          </Text>
          <Text>다른 개발자들의 꿀템들이 궁금하다면?👇</Text>
          <Grid>
            <Grid>
              <Button
                _id="chair"
                width="150px"
                _color="#C3E5AE"
                shadow
                margin="10px"
                onClick={handleClick}
              >
                # 의자
              </Button>
              <Button
                _id="desk"
                width="150px"
                _color="#C3B9EA"
                shadow
                margin="10px"
                onClick={handleClick}
              >
                # 책상
              </Button>
              <Button
                _id="elecItem"
                width="150px"
                _color="#F1E1A6"
                shadow
                margin="10px"
                onClick={handleClick}
              >
                # 전자기기
              </Button>
            </Grid>
            <Grid>
              <Button
                _id="healthCare"
                width="150px"
                shadow
                margin="10px"
                _color="#F4BBBB"
                onClick={handleClick}
              >
                # 건강용품
              </Button>
              <Button
                _id="etc"
                shadow
                width="150px"
                margin="10px"
                _color="#77E4D4"
                B590CA
                onClick={handleClick}
              >
                # 기타
              </Button>
            </Grid>
          </Grid>
        </CateBox>
        {/* </Text> */}
        <Grid isFlex>
          <Input
            id="search"
            placeholder={`#${category} 의 제목을 검색하세요...`}
            value={query}
            _onChange={queryChange}
          />
        </Grid>
        {/* </ResDiv> */}

        <Grid>
          {query !== ''
            ? searchList.map((l, i) => {
                return (
                  <Grid
                    key={l.postId}
                    padding="16px"
                    bg="green"
                    _onClick={() =>
                      history.push(`/list/${category}/${l.postId}`)
                    }
                  >
                    <Post {...l} />
                  </Grid>
                )
              })
            : categoryList.map((l, i) => {
                return (
                  <Grid
                    key={l.postId}
                    padding="16px"
                    _onClick={() =>
                      history.push(`/list/${category}/${l.postId}`)
                    }
                  >
                    <Text bold>{i}</Text>
                    <Post {...l} />
                  </Grid>
                )
              })}
        </Grid>
      </Grid>
    </>
  )
}

// 최상단 카테고리, 필터, 검색어 화면에 따라 flex-column 으로 변경되게
const ResDiv = styled.div`
  height: 20vh;
  flex-wrap: wrap;
  /* padding: 30px; */
  gap: 20px;
  width: 100%;
  margin: 10px auto;

  @media only screen and (min-width: 699px) {
    width: 699px;
  }
  @media only screen and (min-width: 1199px) {
    width: 1199px;
  }
`

const CateBox = styled.div`
  margin: 0 auto;
  width: 50%;
  text-align: center;
  align-items: center;
`

export default CategoryList
