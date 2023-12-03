import styled from "styled-components";
import React, { useState, useEffect } from 'react';

export default function InfoImg({ dadosClima, toggleUnidade }) {

    if (!dadosClima || !dadosClima.weather || dadosClima.weather.length === 0) {
      return null;
    }
  
    const iconCode = dadosClima.weather[0].icon;
  
    const temperaturaCelsius = dadosClima.main.temp;
    const temperaturaFahrenheit = (temperaturaCelsius * 9) / 5 + 32;
  
    const temperaturaExibida = toggleUnidade === 'celsius'
    ? Math.round(temperaturaCelsius) 
    : Math.round(temperaturaFahrenheit);
    const unidadeExibida = toggleUnidade === 'celsius' ? '°C' : '°F';
  
    return (
      <>
        <Container>
          <ContainerTop>           
            <Img src={`http://openweathermap.org/img/w/${iconCode}.png`} alt="Condição do tempo" />
            <ContainerTemp>
                <Temperatura>{temperaturaExibida}</Temperatura> 
              <Unidade>{unidadeExibida}</Unidade>
            </ContainerTemp>
          </ContainerTop>
          <ContainerBottom>
            <Texto>{dadosClima.weather[0].description}</Texto>
          </ContainerBottom>
        </Container>
      </>
    );
  }
  
const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 75%;
    height: 200px;
    
`
const Img = styled.img`
    width: 100px;
    height: 100px;
`

const Texto = styled.div` 
`
const Temperatura = styled.div`
    font-family: Poppins;
    font-size: 75px;
    letter-spacing: 0em;
    text-align: left;
    font-family: Poppins;
    font-weight: 300;
    color: #EC6E4C;
`
const ContainerTop = styled.div`
    display: flex;
    align-items: center;   
    justify-content: center; 
    width: 100%;
    height: 60%;
`
const ContainerBottom = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    height: 35px;
    font-family: Poppins;
    font-size: 20px;
    font-weight: 400;
`

const Unidade = styled.text`
    font-family: Poppins;
    font-size: 60px;
    letter-spacing: 0em;
    font-family: Poppins;
    margin-bottom: 20px;
    color: #EC6E4C;

`
const ContainerTemp = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: flex-start;
    `