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
    .then(resp=>{
      resp.data.map((item)=>{
        // if(localStorage.getItem("no"));
        
        //item으로 하나씩 꺼내서 
        //객체 만들어서 arr에 넣기
        console.log(item.boardNo);
        let obj = {img:'http://localhost:8081/images/board/'+item.imgRename, title:item.boardNo, rows:2, cols:2};
        arr.push(obj);
      })
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

// const itemData = [
//   {
//     img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
//     title: 'Breakfast',
//     rows: 2,
//     cols: 2,
//   },
//   {
//     img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
//     title: 'Burger',
//   },
//   {
//     img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
//     title: 'Camera',
//   },
//   {
//     img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
//     title: 'Coffee',
//     cols: 2,
//   },
//   {
//     img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
//     title: 'Hats',
//     cols: 2,
//   },
//   {
//     img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
//     title: 'Honey',
//     author: '@arwinneil',
//     rows: 2,
//     cols: 2,
//   },
//   {
//     img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
//     title: 'Basketball',
//   },
//   {
//     img: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
//     title: 'Fern',
//   },
//   {
//     img: 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25',
//     title: 'Mushrooms',
//     rows: 2,
//     cols: 2,
//   },
//   {
//     img: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af',
//     title: 'Tomato basil',
//   },
//   {
//     img: 'https://images.unsplash.com/photo-1471357674240-e1a485acb3e1',
//     title: 'Sea star',
//   },
//   {
//     img: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6',
//     title: 'Bike',
//     cols: 2,
//   },
// ];