import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { IoMdHeartEmpty } from "react-icons/io";
import { useEffect, useState } from "react";
import { loadList } from "../service/BoardService";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
} from "@mui/material";
const BoardList = () => {
  const navigator = useNavigate();
  const [boardList, setBoardList] = useState([]);

  //===========================================================================================================
  //상세조회,리스트 조회 페이지 서로 이동 시 전달해야할 데이터 5개!!
  const location = useLocation();
  // const cp = state?.cp;
  const [selectedCategory, setSelectedCategory] = useState(
    location.state?.selectedCategory || 0
  ); //필터해서 볼 카테고리(강아지고양이) 0==전체

  // const [orderOpt,setOrderOpt] = useState(location.state?.orderOpt||"choi"); //choi : 최신순, in : 인기순

  const [searchOpt, setSearchOpt] = useState(location.state?.searchOpt || ""); //검색옵션(작성자u,제목t,내용c)
  const [keywordInput, setKeywordInput] = useState(
    location.state?.keyword || ""
  );
  const [keyword, setKeyword] = useState(location.state?.keyword || ""); //검색키워드
  //========
  // // 검색용 상태 (검색 버튼 클릭 시 적용할 값) 이건 없어도 되지 않을까..?
  // const [appliedSearchOpt, setAppliedSearchOpt] = useState("a");
  // const [appliedKeyword, setAppliedKeyword] = useState('');

  //===========================================================================================================
  useEffect(() => {
    loadList(selectedCategory, searchOpt, keyword, setBoardList);
  }, [
    //currentPage,
    selectedCategory,
    searchOpt,
    keyword,
  ]);

  //카테고리 버튼 클릭
  const handleSelectedCategoryClick = (selectedCategory) => {
    setSelectedCategory(selectedCategory);
    setSearchOpt("");
    setKeyword("");
    setCurrentPage(1); //페이지 번호 초기화
  };
  //정렬순서 버튼 클릭

  const formatContent = (content) => {
    // <e>를 줄바꿈, <s>를 공백으로 변환하고 첫 번째 줄만 가져옴
    const singleLineContent = content
      .replace(/<e>/g, " ")
      .replace(/<s>/g, " ")
      .split("\n")[0];

    // 첫 10자만 자르고, 내용이 더 길면 "..." 추가
    return singleLineContent.length > 10
      ? `${singleLineContent.slice(0, 10)}...`
      : singleLineContent;
  };

  //페이징
  const [currentPage, setCurrentPage] = useState(location.state?.cp || 1); // 현재 페이지쪽수 초기값
  const PerPage = 10; // 페이지당 메시지 개수

  // 현재 페이지에 대한 메시지 가져오기
  const indexOfLast = currentPage * PerPage;
  const indexOfFirst = indexOfLast - PerPage;
  const currentBoardList = boardList.slice(indexOfFirst, indexOfLast);

  const totalPages = Math.ceil(boardList.length / PerPage); // 전체 페이지 수

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };
  useEffect(() => {
    scrollTo(0, 0);
  }, []);

  //게시글 상세조회랑 리스트랑 주고받을 정보 : cp, 카테고리 선택 상태, 검색옵션,검색키워드
  return (
    <>
      <Container>
        <BoardHeader>
          <Title>자유게시판</Title>
          <div style={{ marginLeft: "auto" }} className="searchBox">
            <FormControl
              fullWidth
              style={{ width: "100px", height: "3rem", marginRight: "1rem" }}
            >
              <InputLabel id="demo-simple-select-label">검색 종류</InputLabel>
              <Select
                onChange={(e) => setSearchOpt(e.target.value)}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={searchOpt || "작성자"}
                label="선택하세요"
                style={{ width: "100px", height: "3rem" }}
              >
                <MenuItem value={"작성자"}>작성자</MenuItem>
                <MenuItem value={"제목"}>제목</MenuItem>
                <MenuItem value={"내용"}>내용</MenuItem>
              </Select>
            </FormControl>
            <div style={{ alignSelf: "end" }}>
              <Input onChange={() => setKeywordInput(event.target.value)} />
              <Button
                sx={{ height: "3rem" }}
                onClick={() => setKeyword(keywordInput)}
              >
                검색
              </Button>
            </div>
          </div>
        </BoardHeader>
        <Category>
          <div className="div2Con">
            <Div2
              className="category"
              onClick={() => handleSelectedCategoryClick(0)}
              selected={selectedCategory === 0}
            >
              전체
            </Div2>
            <Div2
              className="category"
              onClick={() => handleSelectedCategoryClick(1)}
              selected={selectedCategory === 1}
            >
              강아지
            </Div2>
            <Div2
              className="category"
              onClick={() => handleSelectedCategoryClick(2)}
              selected={selectedCategory === 2}
            >
              고양이
            </Div2>
            <Div2
              className="category"
              onClick={() => handleSelectedCategoryClick(3)}
              selected={selectedCategory === 3}
            >
              기타
            </Div2>
          </div>
          {/* <div className="div2ConBro">
                        <Button variant="contained" sx={{fontSize: '1rem', marginTop: '1rem', marginRight: '1rem', marginBottom: '1rem',height : '2rem'}} 
                        onClick={()=>handleOrderOptClick("choi")}
                                    >
                            최신순
                        </Button>
                        <Button variant="contained" sx={{fontSize: '1rem', marginTop: '1rem', marginBottom: '1rem',height : '2rem'}} 
                        onClick={()=>handleOrderOptClick("in")}            
                                    >
                            인기순
                        </Button>
                    </div> */}

          {/* 최신순 인기순 할 땐 List<MyEntity> findAllByOrderByAAscBDesc(); 이용하기 */}
        </Category>
        <List>
          {currentBoardList.length > 0 ? (
            currentBoardList.map((board, index) => (
              <Card
                key={index}
                onClick={() =>
                  navigator(`/board/${board.boardNo}`, {
                    state: {
                      cp: { currentPage },
                      selectedCategory: { selectedCategory },
                      searchOpt: { searchOpt },
                      keyword: { keyword },
                    },
                  })
                }
              >
                {/*  Card 반복하기 */}
                <CardInfo>
                  <CardCategory>
                    {" "}
                    {board.category === 1
                      ? "강아지"
                      : board.category === 2
                      ? "고양이"
                      : "기타"}
                  </CardCategory>
                  <CardTitle>{board.boardTitle}</CardTitle>
                  {/* <p dangerouslySetInnerHTML={{ __html: boardData.boardContent.replace(/<s>/g, " ").replace(/<e>/g, "<br />") }} /> */}
                  <CardContent
                    className="boardContent"
                    // dangerouslySetInnerHTML={{ __html: board.boardContent.replace(/<s>/g, " ").replace(/<e>/g, "<br />") }}
                  >
                    {" "}
                    {formatContent(board.boardContent)}
                  </CardContent>
                  <div className="boardInfo">
                    <img
                      src={
                        board.boardProfile != null
                          ? `http://localhost:8081${board.boardProfile}`
                          : `http://localhost:8081/file/images/profile/defaultprofile.png`
                      }
                    />
                    <p className="boardNick">{board.boardUsername}</p>
                    <p className="boardComment">댓글 : {board.commentCount}</p>
                    <p className="boardLike">
                      <IoMdHeartEmpty />
                      {board.likeCount}
                    </p>
                  </div>
                </CardInfo>
                {board.imgRename ? (
                    <CardImg
                      src={`http://localhost:8081/images/board/${board.imgRename}`}
                    />
                ) : (
                  <></>
                )}
              </Card>
            ))
          ) : (
            <NoData>게시글이 존재하지 않습니다.</NoData>
          )}
        </List>

        <Pages>
          {totalPages > 1 && (
            <Pagination
              count={totalPages} // 총 페이지 수
              page={currentPage} // 현재 페이지
              onChange={handlePageChange} // 페이지 변경 핸들러
              siblingCount={2} // 현재 페이지 주변에 보이는 페이지 수
              boundaryCount={2} // 처음과 끝에 보이는 페이지 수
              color="primary"
            />
          )}
        </Pages>

        <Four>
          <Button
            variant="contained"
            sx={{ fontSize: "1rem", marginTop: "1rem", marginBottom: "2rem" }}
            onClick={() => navigator("/boardWrite")}
          >
            글 작성하기
          </Button>
        </Four>
      </Container>
    </>
  );
};
export default BoardList;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const BoardHeader = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  margin: 30px 0;
  .searchBox {
    display: flex;
    align-items: center;
  }
`;

const Title = styled.div`
  padding: 10px;
  font-size: 1.5rem;
  font-weight: bold;
  text-align: center;
`;

const Input = styled.input`
  border-width: 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.3);
  outline: none;
  height: 2rem;
`;

const Category = styled.div`
  width: 50%;
  display: flex;
  margin-top: 20px;
  .div2Con {
    display: flex;
    align-items: center;
  }
  .div2ConBro {
    margin-left: auto;
  }
`;

const List = styled.div`
  width: 50%;
`;

const Card = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 20px;
  padding: 1rem 0;
  border-top: 2px solid rgba(0, 0, 0, 0.3);
  &:last-child{
    border-bottom: 2px solid rgba(0, 0, 0, 0.3);
  }
`;

const CardInfo = styled.div`
  display: flex;
  flex-direction: column;
  .boardInfo {
    display: flex;
    flex-direction: row;
    align-items: center;
    img {
      width: 40px;
      height: 40px;
    }
    .boardNick {
      margin: 0px 10px;
    }
    .boardComment {
      margin: 0px 10px;
    }
    .boardLike {
      margin: 0px 10px;
      color: red;
    }
  }
`;

const CardCategory = styled.div`
  background-color: #eec759;
  margin-right: 10px;
  width: 60px;
  height: 30px;
  font-weight: bold;
  border-radius: 40px;
  text-align: center;
  padding: 5px;
  margin: 1rem 0;
`;

const CardTitle = styled.div`
  font-size: 1.3rem;
  font-weight: bold;
`;

const CardContent = styled.div`
  color: gray;
  margin-bottom: 1rem;
`;

const Four = styled.div`
  width: 50%;
  display: flex;
  justify-content: flex-end;
`;

const Div2 = styled.div`
  background-color: ${({ selected }) =>
    selected ? "#EEC759" : "RGB(240, 240, 243)"};
  margin-right: 10px;
  width: 100px;
  font-weight: bold;
  border-radius: 20px;
  text-align: center;
  padding: 7px;
  &:hover {
    cursor: pointer;
  }
`;

const Pages = styled.div`
  width: 100%;
  margin-top: 3rem;
  display: flex;
  justify-content: center;
`;

const CardImg = styled.img`
  width: 150px;
  height: 150px;
`;

const NoData = styled.div`
  width: 100%;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  margin: 3rem;
`;
