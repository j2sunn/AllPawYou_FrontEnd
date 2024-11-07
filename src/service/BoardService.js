import axios from "axios";

// import { AuthApi } from "./Auth";

const REST_API_BASE_URL =  'http://localhost:8081/board';
//글 작성
export const uploadBoard = (formData,navigator)=>{

        axios.post(REST_API_BASE_URL+"/insert",formData,{
        headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
        }
        // AuthApi.get
    })
    .then((resp)=>{
        console.log("resp : "+resp.data);
        let res = resp.data;

        //navigator('/findEmailResult', {state: {email}});
        navigator("/board/"+res);
    })
}

//게시글 상세조회
// export const selectOne = (boardNo,setBoardData)=>{
//     axios.get(`/board/${boardNo}`,{
//         headers: {
//             'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
//             }
//     })
//         .then(response => {
//             console.log("글 정보 : "+response.data);
//             setBoardData(response.data);
//         })
//         /*
//         const token = localStorage.getItem('accessToken');  // 로컬 스토리지에서 토큰을 가져옵니다.
//         axios.get('http://localhost:8080/some-api-endpoint', {
//             headers: {
//                 'Authorization': `Bearer ${token}`  // Bearer 타입으로 토큰을 Authorization 헤더에 추가
//                 }
// })      
//                 백엔드 API 호출에서는 인증이 필요한 요청(예: 로그인, 게시글 작성, 사용자 정보 조회 등)을 할 때 토큰이 필요합니다. 
//                 이 토큰은 Authorization 헤더에 포함시켜서 요청을 보내야 합니다.
//                 라우터를 사용하여 다른 페이지로 이동하는 것은 브라우저에서 페이지를 전환하는 것으로, 서버와의 HTTP 요청과는 다릅니다. 
//                 즉, 클라이언트에서 페이지를 이동할 때는 **useNavigate**나 **<Link>**를 사용하여 이동할 수 있으며, 이때는 토큰을 요청 헤더에 담을 필요가 없습니다.
//         */
//         .catch(error => {
//             console.error('게시글 상세 정보를 가져오는 데 실패했습니다.', error);
//         });
// }
//글 상세조회
export const loadData = async (boardNo,setBoardData,setCommentData) => {
    console.log("heyhey");
    const response = await axios.get('http://localhost:8081/board/' + boardNo);
    console.log("클라이언트 보드 : "+response.data);
    setBoardData(response.data);
    setCommentData(response.data.commentList);
};

//글 목록 전체조회
export const loadList = async (setBoardList)=>{
    const response = await axios.get('http://localhost:8081/board');
    setBoardList(response.data);
}

//댓글 작성
export const addCommentService = (boardNo,result,loginEmail,setCommentData)=>{
    console.log("nnnnnnnn");
    axios.post('http://localhost:8081/board/comment/insert', {
        boardNo: boardNo,
        commentContent: result,
        email: loginEmail
    })
    .then(response => {
        console.log("삽입된 댓글 수 : "+response.data);
        if(response.data >0){
            // setCommentData(response.data);
            updateCommentList(boardNo,setCommentData);
        }
        
    })
}
//전체 댓글 다시 업데이트
const updateCommentList = async (boardNo,setCommentData)=>{
    const resp = await axios.get('http://localhost:8081/board/comment/' + boardNo);
    setCommentData(resp.data);
}