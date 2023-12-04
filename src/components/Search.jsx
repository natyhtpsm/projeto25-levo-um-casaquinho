import styled from "styled-components";
import SearchImg from "../assets/search.png";
import React, { useState } from 'react';
import { useClimaContext } from "../context/ClimaContext";
import axios from "axios";

export default function Search() {

  const { atualizarDadosClima } = useClimaContext();
  const [cidade, setCidade] = useState('');
  const handleInputChange = (event) => {
    setCidade(event.target.value);
  };
  const obterDadosClima = async () => {
    try {
      const apiKey = import.meta.env.VITE_API_KEY;
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${apiKey}&lang=pt&units=metric`;

      const resposta = await axios.get(url);
      atualizarDadosClima(resposta.data);
    } catch (erro) {
      console.error('Erro na requisição:', erro);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    obterDadosClima();
  };

    return(
        <>
            <Container>
                <Icone onClick={handleSubmit}/>
                <Texto>
                    <Input placeholder="Procure por uma cidade"
                        type="text"
                        value={cidade}
                        onChange={handleInputChange}
                    />
                </Texto>
            </Container>
        </>
    )
}

const Container = styled.div`
  display: flex;
  align-items: center;
  width: 75%;
  height: 50px;
  border-radius: 10px;
  background-color: #D8D8D8;
  margin-bottom: 20px;
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