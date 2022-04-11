import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Grid, Input } from "../../elements";
import { imageActions } from "../../redux/modules/image";

import axios from "axios";

const Upload = (props) => {
  const dispatch = useDispatch();
  // const isUploading = useSelector((state) => state.image.uploading);
  const fileInput = useRef();

  const { propsfile } = props;

  const [fileName, setFileName] = useState(propsfile ? propsfile : " ");

  const [selectedFile, setSelectedFile] = useState(null);

  const selectFile = (e) => {
    const uploadFile = e.target.files[0];
    console.log(uploadFile);

    // FileReader 프리뷰
    const reader = new FileReader();
    const preview = fileInput.current.files[0];

    reader.readAsDataURL(preview);
    console.log(preview);

    reader.onloadend = () => {
      dispatch(imageActions.setPreview(reader.result));
      setFileName(preview.name);
      setSelectedFile(uploadFile);
    };
  };

  const handleSubmit = async (e) => {
    const formData = new FormData();
    formData.append("selectedFile", selectedFile);

    // 테스트코드
    const response = await axios({
      method: "post",
      url: "http://127.0.0.1:5000/upload",
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    }).catch((err) => {
      console.log(err);
    });
  };

  return (
    <Grid isFlex>
      <Input
        width="100%"
        label="사진 선택"
        value={fileName}
        margin="0"
        _disabled
      />
      <Button width="200px" margin="0 20px">
        <label htmlFor="file">파일 찾기</label>
      </Button>
      <input
        style={{ display: "none" }}
        id="file"
        type="file"
        onChange={selectFile}
        ref={fileInput}
        // disabled={isUploading}
      />
      <button onClick={handleSubmit}>테스트</button>
    </Grid>
  );
};

export default Upload;