import styled from "styled-components";
import CardInfos from "../components/CardInfos";
import Search from "../components/Search";
import React, { useState, useEffect } from 'react';
import LogoImg from "../assets/casaquinho.png";
import InfoImg from "../components/InfoImg";
import Switch from '@mui/material/Switch';

export default function Homepage() {
  const [data, setData] = useState('');
  const [diaSemana, setDiaSemana] = useState('');
  const [hora, setHora] = useState('');

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
    const [dadosClima, setDadosClima] = useState(null);
    const [toggleUnidade, setToggleUnidade] = useState('celsius');
  
    const atualizarDadosClima = (novosDados) => {
      setDadosClima(novosDados);
    };
  
    const toggleUnidadeGlobal = () => {
      setToggleUnidade((prevUnidade) => (prevUnidade === 'celsius' ? 'fahrenheit' : 'celsius'));
    };
  
    return (
      <>
        <Container>
          <Esquerda>
            <Logo src={LogoImg}/>
            <Search atualizarDadosClima={atualizarDadosClima}/>
            <InfoImg dadosClima={dadosClima} toggleUnidade={toggleUnidade}/>
            <Divisao/>
            <ContainerDataHora>
                <DataHora>{data}</DataHora>
                <DataHora>{diaSemana}, {hora}</DataHora>
            </ContainerDataHora>
          
            <Switch
              onChange={toggleUnidadeGlobal}
              checked={toggleUnidade === 'celsius'}
              inputProps={{ 'aria-label': 'Alternar Unidade' }}
            />
          </Esquerda>
          <Direita>
            <CardInfos dadosClima={dadosClima}/>
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
    display: flex;
    width: 65%;
    height: 100vh;
    background-color: #D8D8D8;
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
`
const ContainerDataHora = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 100%;
`     