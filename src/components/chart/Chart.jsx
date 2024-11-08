import styled from "styled-components";
import Piechart from "./Piechart";

const Chart = () => {
  return (
    <>
      <Container>
        <Piechart />
      </Container>
    </>
  );
};

export default Chart;

const Container = styled.div`
  display: flex;
`;
