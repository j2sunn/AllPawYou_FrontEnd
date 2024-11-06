import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";


const BoardDetail = ()=>{
    // const { state } = useLocation();
    // const boardNo = state?.res;
    // const params = useParams();
    // // const bNo = params?.boardNo;
    // const [boardNo,setBoardNo] = useState(0);
    // const bNo = useRef(params?.boardNo);
    // useEffect(()=>{
    //         bNo.current=params?.boardNo;
    //         setBoardNo(bNo);
    //         console.log("boardNo : "+boardNo);
    // },[bNo]);
    // return(
        
    //     <>
    //         {boardNo}

    //     </>
    // );
    const params = useParams();
    const [boardNo, setBoardNo] = useState(0);
    const bNo = useRef(params?.boardNo);  // 초기값을 params.boardNo로 설정
    const [boardData, setBoardData] = useState({});

    useEffect(() => {
        bNo.current = params?.boardNo;  // params가 변경될 때마다 bNo 업데이트
        setBoardNo(bNo.current);  // boardNo 상태 업데이트
        console.log("boardNo : " + boardNo);

        axios.get(`/board/${boardNo}`)
            .then(response => {
                setBoardData(response.data);
            })
            /*
            const token = localStorage.getItem('accessToken');  // 로컬 스토리지에서 토큰을 가져옵니다.
            axios.get('http://localhost:8080/some-api-endpoint', {
                headers: {
                    'Authorization': `Bearer ${token}`  // Bearer 타입으로 토큰을 Authorization 헤더에 추가
                    }
})      
                    백엔드 API 호출에서는 인증이 필요한 요청(예: 로그인, 게시글 작성, 사용자 정보 조회 등)을 할 때 토큰이 필요합니다. 
                    이 토큰은 Authorization 헤더에 포함시켜서 요청을 보내야 합니다.
                    라우터를 사용하여 다른 페이지로 이동하는 것은 브라우저에서 페이지를 전환하는 것으로, 서버와의 HTTP 요청과는 다릅니다. 
                    즉, 클라이언트에서 페이지를 이동할 때는 **useNavigate**나 **<Link>**를 사용하여 이동할 수 있으며, 이때는 토큰을 요청 헤더에 담을 필요가 없습니다.
            */
            .catch(error => {
                console.error('게시글 상세 정보를 가져오는 데 실패했습니다.', error);
            });

    }, [params?.boardNo]);  // params.boardNo가 변경될 때마다 실행

    return (
        <>
            <p>Board No: {boardNo}</p>
            <div>
            {boardData ? (
                <>
                    <h1>{boardData.title}</h1>
                    <p>{boardData.content}</p>
                    {/* 기타 게시글 정보 */}
                </>
            ) : (
                <p>게시글을 로딩 중...</p>
            )}
        </div>
        </>
    );
}
export default BoardDetail;