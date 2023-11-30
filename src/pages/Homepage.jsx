import styled from "styled-components";
import CardInfos from "../components/CardInfos";
import Search from "../components/Search";

export default function Homepage(){
    return(
        <>
            <Container>
                <Esquerda>
                    <Search/>
                </Esquerda>
                <Direita>
                    <CardInfos/>
                </Direita>
            </Container>
     
        </>
    )
}

const Container = styled.div`
    display: flex;
    top: 0;
    width: 100vw;
    height: 100vh;
`
const Esquerda = styled.div`
    display: flex;
    width: 35%;
    height: 100vh;
` 
const Direita = styled.div` 
    display: flex;
    width: 65%;
    height: 100vh;
    background-color: #D8D8D8;
`