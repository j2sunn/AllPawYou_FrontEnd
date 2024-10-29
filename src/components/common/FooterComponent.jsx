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
const Content = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 2rem;
`;
const Board = styled.div`
  text-align : left;
  font-size: 12px;
`;
const Info = styled.div`
  text-align : right;
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
            <img src="/src/logo.png" style={{ width: '250px' }}></img>
          </Logo>
          <Content>
            <Board>
              <p><StyledLink href="/signup">공지사항 </StyledLink> | <StyledLink href=""> FAQ</StyledLink></p>
              <span>주식회사 올포유 | 대표 홍길동</span><br/>
              <p>
                Copyright 2024. AllPawYou All rights reserved.
              </p>
            </Board>
            <Info>
              
              {/* <span>
                <StyledLink href="https://github.com/j2sunn/AllPawYou_FrontEnd">https://github.com/j2sunn/AllPawYou_FrontEnd</StyledLink><br />
                <StyledLink href="https://github.com/j2sunn/AllPawYou_BackEnd">https://github.com/j2sunn/AllPawYou_BackEnd</StyledLink>
              </span> */}
            </Info>
          </Content>
        </FooterContainer>
  );
};

export default FooterComponent;
