import styled from "styled-components";
import CardInfos from "../components/CardInfos";
import Search from "../components/Search";
import React, { useState, useEffect } from 'react';
import LogoImg from "../assets/casaquinho.png";
import InfoImg from "../components/InfoImg";
import ContainerCity from "../components/ContainerCity";
import Switch from '@mui/material/Switch';
import { useClimaContext } from "../context/ClimaContext";
import Chart from "../components/Chart";

export default function Homepage() {
  const { atualizarDadosClima } = useClimaContext();
  const { dadosClima, toggleUnidade, unidade } = useClimaContext();
  const [data, setData] = useState('');
  const [diaSemana, setDiaSemana] = useState('');
  const [hora, setHora] = useState('');
  const [activeButton, setActiveButton] = useState('hoje');

  useEffect(() => {
    const atualizarDataHora = () => {
      const dataAtual = new Date();
      const opcoesData = { year: 'numeric', month: 'numeric', day: 'numeric' };
      const dataFormatada = dataAtual.toLocaleDateString('pt-BR', opcoesData);
      setData(dataFormatada);

      const opcoesDiaSemana = { weekday: 'long' };
      const diaSemanaFormatado = dataAtual.toLocaleDateString('pt-BR', opcoesDiaSemana);
      setDiaSemana(diaSemanaFormatado);

      const opcoesHora = { hour: 'numeric', minute: 'numeric', second: 'numeric', timeZoneName: 'short' };
      const horaFormatada = dataAtual.toLocaleDateString('pt-BR', opcoesHora);
      setHora(horaFormatada);
    };

    const intervalo = setInterval(atualizarDataHora, 1000);

    return () => clearInterval(intervalo);
  }, []);

  const handleButtonClick = (button) => {
    setActiveButton(button);
  };
  const recomendarCasaquinho = (dadosClima) => {
    const { temp_max, temp_min, temp } = dadosClima.main;
    const limiarTemperatura = 17;
  
    return temp_max < limiarTemperatura || temp_min < limiarTemperatura || temp < limiarTemperatura;
  };
    
  return (
    <>
      <Container>
        <Esquerda>
            <Logo src={LogoImg}/>
            <Search atualizarDadosClima={atualizarDadosClima}/>
            {dadosClima ? (
            <>
              <InfoImg
                dadosClima={dadosClima}
                unidadeAtual={unidade} 
              />
              <Divisao/>
              <ContainerDataHora>
                <DataHora>{diaSemana}, {hora}</DataHora>
              </ContainerDataHora>
              <DivSwitch> 
              <Switch
                onChange={toggleUnidade} 
                checked={unidade === 'fahrenheit'}
                inputProps={{ 'aria-label': 'Alternar Unidade' }}
              />
              <UnidadeFahrenheit>°F</UnidadeFahrenheit>
              </DivSwitch>
            </>
            ) : null}
            <Footer>
              <Texto>Todos os direitos reservados, 2023.</Texto>
            </Footer>
        </Esquerda>
        <Direita>
          <ContainerDir>
            <ContainerButton>
                <Button
                  onClick={() => handleButtonClick('hoje')}
                  style={{ color: activeButton === 'hoje' ? 'black' : '#C8C8C8' }}
                  disabled={!dadosClima} 
                >
                  Hoje
                </Button>
                <Button
                  onClick={() => handleButtonClick('proximosDias')}
                  style={{ color: activeButton === 'proximosDias' ? 'black' : '#C8C8C8' }}
                  disabled={!dadosClima} 
                >
                  Próximos dias
                </Button>
            </ContainerButton>
            <ContainerCity dadosClima={dadosClima} />
          </ContainerDir>
          {dadosClima ? (
          <>
            {activeButton === 'hoje' && (
              <>
                <ContainerCards>
                  <ContainerTwo>
                    <CardInfos tipo="Máxima" valor={`${dadosClima.main.temp_max}° C`} />
                    <CardInfos tipo="Mínima" valor={`${dadosClima.main.temp_min}° C`} />
                  </ContainerTwo>
                  <ContainerTwo>
                    <CardInfos tipo="Umidade" valor={`${dadosClima.main.humidity}%`} />
                    <CardInfos tipo="Velocidade do Vento" valor={`${dadosClima.wind.speed} m/s`} />
                  </ContainerTwo>
                  <Recomendacao>
                  {recomendarCasaquinho(dadosClima) ? 
                    "É uma boa ideia levar um casaquinho!" : 
                    "Não, você não deve levar um casaquinho."}
                  </Recomendacao>
                </ContainerCards>

              </>
            )}

            {activeButton === 'proximosDias' && (
              <Chart latitude={dadosClima.coord.lat} longitude={dadosClima.coord.lon}/>
            )}
          </>
        ) : (
          <NoCity>Para começar, pesquise por uma cidade.</NoCity>
        )}
          <Footer>
            <Texto>
              Dados fornecidos pela{" "}  
              <a href="https://openweathermap.org/api" target="_blank" rel="noopener noreferrer">
                Open Weather API
              </a>
            </Texto>
          </Footer>
        </Direita>
      </Container>
    </>
  );
}
  
const Container = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  flex-direction: column;

  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const Esquerda = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: auto;

  @media (min-width: 768px) {
    width: 35%;
    height: 100vh;
  }
`;

const Direita = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  height: auto;
  background-color: #EFEFEF;
  padding: 3%;

  @media (min-width: 768px) {
    width: 65%;
    height: 100vh;
    padding-left: 3%;
  }
`;
const Logo = styled.img`
  width: 60%; 
  height: auto; 
  margin-top: 5%;
  margin-bottom: 5%;

  @media (min-width: 768px) {
    width: 80%; 
  }
`;

const Divisao = styled.div`
  width: 100%; 
  background-color: #D8D8D8;
  border: 1px solid #EDEDED;
  margin: 20px 0;

  @media (min-width: 768px) {
    width: 65%; 
  }
`;

const DataHora = styled.div`
  font-family: Poppins;
  font-size: 14px; 
  font-weight: 500;
  margin: 10px 0;
  text-align: center;

  @media (min-width: 768px) {
    font-size: 15px; 
    text-align: left;
  }
`;

const ContainerDataHora = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin: 20px 0;
`;

const UnidadeFahrenheit = styled.span` 
  margin-top: 11px;
`;

const DivSwitch = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin: 20px 0;
`;

const Texto = styled.span` 
  font-family: Poppins;
  font-size: 14px; 
  font-weight: 400;
  text-align: center;
  a {
    text-decoration: none;
    color: #96A7F2;
  }

  @media (min-width: 768px) {
    font-size: 15px; 
  }
`;

const ContainerButton = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column; 
  align-items: center;
  width: 100%;
  margin: 20px 0;

  @media (min-width: 768px) {
    flex-direction: row; 
    justify-content: flex-start; 
    width: 60%;
  }
`;

const Button = styled.button`
  width: 100%; 
  height: 40px;
  margin: 5px 0; 
  border: none;
  font-family: Poppins;
  font-size: 20px; 
  font-weight: 400;
  color: black;
  cursor: pointer;
  background-color: transparent;

  @media (min-width: 768px) {
    font-size: 30px; 
    width: auto;
  }
`;
const ContainerCards = styled.div`
  display: block;
  justify-content: center;
  align-items: center;
  width: 100%;
  background-color: transparent;
  margin-top: 20px; 
  @media (min-width: 768px) {
    margin-top: 200px; 
  }
`;

const ContainerTwo = styled.div`
  display: flex;
  flex-direction: column; 
  background-color: transparent;
  margin-bottom: 20px;
  align-items: center;
  justify-content: center;

  @media (min-width: 768px) {
    flex-direction: row; 
    justify-content: flex-start;
   
  }
`;

const Footer = styled.footer`
  display: none;
  justify-content: center;
  align-items: center;
  width: 100%; 
  height: 50px;
  position: absolute; 
  bottom: 0;

  @media (min-width: 768px) {
    display: flex;
    position: fixed; 
    width: 65%; 
  
  }
`;

const ContainerDir = styled.div`
  @media (max-width: 768px) {
   position: static; 
  }

  @media (min-width: 769px) {
    position: fixed;
    top: 0;
    width: 100%;  
    height: 200px;
  }

`;

const NoCity = styled.div` 
  font-family: Poppins;
  font-size: 20px; 
  font-weight: 400;
  text-align: center;

  @media (min-width: 768px) {
    font-size: 30px; 
  }
`;

const Recomendacao = styled.div`
  font-family: Poppins;
  font-style: italic;
  font-weight: 400;
  line-height: normal; 
  letter-spacing: 0em;
  text-align: center; 
  font-size: 14px; 
  color: #AFADAD;

  @media (min-width: 768px) {
    text-align: left; 
    font-size: 16px; 
    margin-bottom: 20px;
  }
`;
