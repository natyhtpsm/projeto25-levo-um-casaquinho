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
`
const Esquerda = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 35%;
  height: 100vh;
` 
const Direita = styled.div` 
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 65%;
  height: 100vh;
  background-color: #EFEFEF;
  padding-left: 3%;
`
const Logo = styled.img`
  width: 80%;
  height: 13%;
  margin-top: 5%;
  margin-bottom: 5%;
`
const Divisao = styled.div`
  width: 65%;
  background-color: #D8D8D8;
  border: 1px solid #EDEDED;
`
const DataHora = styled.div`
  display: flex;
  margin-bottom: 5%;
  font-family: Poppins;
  font-size: 15px;
  font-weight: 500;
  margin-top: 10px;
  text-align: left;
`
const ContainerDataHora = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 60px;
  margin-bottom: 30px;
`     
const UnidadeFahrenheit = styled.text`
  margin-top: 11px;
`
const DivSwitch = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 80px;
`
const Texto = styled.text`
  font-family: Poppins;
  font-size: 15px;
  font-weight: 400;
  text-align: center;
  a{
    text-decoration: none;
    color: #96A7F2;
  }
`
const ContainerButton = styled.div`
  display: flex;
  text-align: left;
  width: 60%;
  height: 40px;
  margin-top: 20px;
  margin-bottom: 40px;
`
const Button = styled.button`
  height: 100%;
  border: none;
  font-family: Poppins;
  font-size: 30px;
  font-weight: 400;
  text-align: left;
  color: black;
  cursor: pointer;
  background-color: transparent;
`
const ContainerCards = styled.div`
  display: block;
  justify-content: wrap;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: transparent;
  margin-top: 250px;
  margin-bottom: 20px;
`
const ContainerTwo  = styled.div`
  display: flex;
  background-color: transparent;
  margin-bottom: 20px;
`
const Footer = styled.footer`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  bottom: 0;
  width: 50%;
  height: 50px;
`
const ContainerDir = styled.div`
  position: fixed;
  top: 0;
  width: 100%;  
  height: 200px; 
`
const NoCity = styled.text`
  font-family: Poppins;
  font-size: 30px;
  font-weight: 400;
  text-align: center;
`   
const Recomendacao = styled.div`
  font-family: Poppins;
  font-style: italic;
  font-weight: 400;
  line-height: 48px;
  letter-spacing: 0em;
  text-align: left;
  font-size: 16px;
  color: #AFADAD;
`;