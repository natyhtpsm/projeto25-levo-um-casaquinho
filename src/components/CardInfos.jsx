import styled from "styled-components";

export default function CardInfos({ tipo, valor}) {
    return (
      <>
        <Container>
            <ContainerText>
                <Label>{tipo}</Label>
                <Data>{valor}</Data>
            </ContainerText>
        </Container>
           
      </>
    )
}
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 50%; 
  height: 120px; 
  border-radius: 32px;
  box-shadow: 0px 24px 48px 0px #314F7C14;
  background: linear-gradient(117.33deg, #4D4494 22.83%, #4F43AE 90.03%);
  margin-bottom: 20px; 
  color: white;

  @media (min-width: 768px) {
    width: 39%;
    height: 120px; 
    margin-right: 20px; 
  }
`;

const Label = styled.span` 
  font-family: Poppins, sans-serif;
  font-size: 10px; 
  font-weight: 700;
  text-align: left;
  margin-bottom: 5px;

  @media (min-width: 768px) {
    font-size: 12px; 
    margin-bottom: 10px;
  }
`;

const Data = styled.span` 
  font-family: Poppins, sans-serif;
  font-size: 20px; 
  font-weight: 600;
  text-align: left;

  @media (min-width: 768px) {
    font-size: 30px; 
    margin-bottom: 10px;
  }
`;

const ContainerText = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  margin-left: 30px;
`;