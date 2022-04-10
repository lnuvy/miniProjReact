import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Grid, Input } from "../../elements";
import { imageActions } from "../../redux/modules/image";

const Upload = (props) => {
  const dispatch = useDispatch();
  const isUploading = useSelector((state) => state.image.uploading);
  const fileInput = useRef();

  const [fileName, setFileName] = useState("");

  const selectFile = (e) => {
    const reader = new FileReader();
    const file = fileInput.current.files[0];

    reader.readAsDataURL(file);

    reader.onloadend = () => {
      dispatch(imageActions.setPreview(reader.result));
      setFileName(e.target.value);
    };
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
    </Grid>
  );
};

export default Upload;
