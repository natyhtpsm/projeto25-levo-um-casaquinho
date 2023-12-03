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
    width: 39%;
    height: 120px;
    border-radius: 32px;
    box-shadow: 0px 24px 48px 0px #314F7C14;
    background: linear-gradient(117.33deg, #4D4494 22.83%, #4F43AE 90.03%);
    background-color: black;
    margin-right: 20px;
    color: white;
`

const Label = styled.text`
    font-family: Poppins;
    font-size: 12px;
    font-weight: 700;
    text-align: left;
    margin-bottom: 10px;
   
` 
const Data = styled.text`
    font-family: Poppins;
    font-size: 30px;
    font-weight: 600;
    text-align: left;
    margin-bottom: 10px;
    
`
const ContainerText = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    height: 60px;
    margin-left: 30px;
`