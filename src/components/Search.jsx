import styled from "styled-components";
import SearchImg from "../assets/search.png";

export default function Search(){
    return(
        <>
            <Container>
                <Icone/>
                <Texto>
                    <Input placeholder="Procure por uma cidade"/>
                </Texto>
            </Container>
        </>
    )
}

const Container = styled.div`
    display: flex;
    align-items: center;
    width: 75%;
    height: 7%;
    border-radius: 10px;
    background-color: #D8D8D8;
`
const Texto = styled.div`

`
const Icone = styled.div`
    background-image: url(${SearchImg});
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    width: 10%;
    height: 50%;
`
const Input = styled.input`
    width: 100%;
    height: 100%;
    border: none;
    background-color: transparent;
    outline: none;
    font-family: Montserrat;
    font-size: 15px;
    font-weight: 500;
    letter-spacing: 0em;
    text-align: left;
    color: #424243;
`