import styled from "styled-components";
import Piechart from "./PieChart";

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
