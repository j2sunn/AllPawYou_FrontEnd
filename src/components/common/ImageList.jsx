import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import axios from 'axios';
import { useEffect, useState } from 'react';
import {  useNavigate } from "react-router-dom";
function srcset(image, size, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${size * cols}&h=${
      size * rows
    }&fit=crop&auto=format&dpr=2 2x`,
  };
}

const BoardImageList = () => {
  const navigator = useNavigate();
  const [itemData,setItemData] = useState([]);
  let no=0; //로그인 회원 번호
  useEffect(()=>{
    let arr = [];
    if(localStorage.getItem('no')!=null){
      no=Number(localStorage.getItem('no'));
  }
    axios.get("http://localhost:8081/board/mainTop")
    .then(response=>{
      const arr = [];
      arr.push({...response.data[0], rows: 2, cols: 2});
      arr.push(response.data[1]);
      arr.push(response.data[2]);
      arr.push({...response.data[3], cols: 2});
      arr.push({...response.data[4], cols: 2});
      arr.push({...response.data[5], rows: 2, cols: 2});
      arr.push(response.data[6]);
      arr.push(response.data[7]);
      arr.push({...response.data[8], rows: 2, cols: 2});
      arr.push(response.data[9]);
      arr.push(response.data[10]);
      arr.push({...response.data[11], cols: 2});
      setItemData(arr);
      })


    },[]);
  return (
    <ImageList
      sx={{ width: '100%', height: 650 }}
      variant="quilted"
      rows={4}
      cols={8}
    >
      {itemData.map((item) => (
        <ImageListItem key={item.boardNo} cols={item.cols || 1} rows={item.rows || 1}
        onClick = {()=>navigator("/board/"+item.boardNo+"/"+no)}>
          
          <img
            {...srcset(item.img, 121, item.rows, item.cols)}
            alt={item.boardNo}
            loading="lazy"
          />

        </ImageListItem>
      ))}
    </ImageList>
  );
}

export default BoardImageList;