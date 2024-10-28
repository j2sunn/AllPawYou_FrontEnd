import styled from "styled-components";

const FooterContainer = styled.footer`
  display: flex;
  flex-direction: column;
  background-color : #FFF7D4;
  `;
const StyledLink = styled.a`
  text-decoration : none;
  color: inherit;
`;
const Info = styled.p`
  text-align : right;
  margin-right : 30px;
  font-size: 13px;
  display:absolute;
`;
const Board = styled.p`
  text-align : left;
  margin-left : 30px;
  font-size: 12px;
`;
const Logo = styled.div`
  float : left;
  margin-left : 30px;
  margin-bottom: 20px;
  display:flex;
`;

const FooterComponent = () => {


  return (
        <FooterContainer>
          <Logo>
            <img src="/src/logo.png" style={{ height: '150px', width: '150px' }}></img>
          </Logo>
          <Info>
            <p>
              <span>주식회사 올포유 | 대표 홍길동</span><br />
              <span>
                <StyledLink href="https://github.com/j2sunn/AllPawYou_FrontEnd">https://github.com/j2sunn/AllPawYou_FrontEnd</StyledLink><br />
                <StyledLink href="https://github.com/j2sunn/AllPawYou_BackEnd">https://github.com/j2sunn/AllPawYou_BackEnd</StyledLink>
              </span>
            </p>
          </Info>
          <Board>
            <p><StyledLink href="/signup">공지사항 </StyledLink> | <StyledLink href=""> FAQ</StyledLink></p>
            <p>
              Copyright 2024. AllPawYou All rights reserved.
            </p>
          </Board>
        </FooterContainer>
  );
};

export default FooterComponent;
