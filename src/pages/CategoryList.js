import React, { useEffect, useState } from "react";
import axios from "axios";

const BASE_URL =
  "https://virtserver.swaggerhub.com/myteam84866/Api-Example/1.0.0/";

// 카테고리 선택 후의 리스트입니다
const CategoryList = () => {
  const [data, setData] = useState("");

  useEffect(async () => {
    const res = await axios.get(BASE_URL + "artists");
    console.log(res);
    const data = res.data;
    console.log(data);
    setData(data);
  });

  return (
    <>
      <h1>CategoryList</h1>
    </>
  );
};

export default CategoryList;
