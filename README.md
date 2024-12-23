## AllPawYou (FrontEnd)

‘**올포유(All Paw You)**’는 반려동물(**Paw**)에게 필요한 모든 것(**All**)을 당신에게(**You**) 제공한다는 의미로 사용자인 반려동물 양육자들이 커뮤니티 기능을 통해 정보를 공유하고, 필요한 용품을 손쉽게 구매할 수 있도록 돕는 웹 애플리케이션입니다. 나아가 판매자에게는 반려동물 관련 고객 확보 및 상품 판매 관리 효율성 향상을 통해 비즈니스 확장의 기회를 제공합니다.
<br><br>

### 🛠 기술 스택  
- **프론트엔드** : HTML, CSS, JavaScript, React
- **백엔드** : Java, Spring Boot
- **데이터베이스** : MariaDB
- **외부 API** : 카카오 로그인 API, 카카오페이 API, 다음 지도 API, COOL SMS API, Java Mail API
- **라이브러리** : Axios, MUI, Styled-Components
- **개발 도구** : IntelliJ IDEA, Visual Studio Code, Figma
- **서버** : Apache Tomcat 8.5
- **협업 도구** : GitHub, Notion 

### ⚙️ 기능
1. 회원가입 및 로그인
   - 휴대전화 인증,  jwt 토큰 인증을 통한 계정 생성 및 로그인
3. 쇼핑 및 결제 
    - 상품 관리(등록, 수정, 삭제, 조회, 검색)
    - 장바구니
    - 카카오페이 API 사용 결제
4. 커뮤니티 
    - 자유 게시판, 좋아요, 쪽지 기능
5. 리뷰 및 평점 
    - 후기를 통해 구매에 실질적인 가이드라인 제공
6. 부가 서비스 
    - 공지 사항 게시판, 마이페이지, 대시보드를 통한 통계 제공   

### 📌학습 및 경험
이번 프로젝트에서는 React 프론트엔드와 Spring Boot 백엔드 간의 효율적인 데이터 연동을 통해 동적인 사용자 인터페이스를 구현하는 것을 목표로 하여 개발을 시작하였습니다.

특히 중요하게 생각한 부분은 React에서 Spring Boot으로부터 데이터를 받아와 사용자에게 실시간으로 표시하는 것이었습니다. 이를 위해 Spring Boot에서 `RESTful API`를 설계하고, React에서는 해당 API를 호출하여 데이터를 받아오는 방식을 사용했습니다.

- Spring Boot에서는 `@RestController`를 사용하여 필요한 데이터를 `JSON` 형식으로 제공하는 API를 작성하였습니다.
- React에서는 `fetch API` 또는 `axios` 라이브러리를 사용하여 Spring Boot에서 제공하는 `REST API`를 호출하였고, 비동기 방식으로 호출 처리하여 사용자가 페이지를 요청할 때마다 최신 데이터를 실시간으로 받아올 수 있도록 했습니다.
