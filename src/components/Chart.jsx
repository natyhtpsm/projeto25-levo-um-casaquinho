import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import styled, { keyframes } from 'styled-components';

export default function Chart({ latitude, longitude }) {
  const [dadosGrafico, setDadosGrafico] = useState([]);

  useEffect(() => {
    if (latitude && longitude) {
      obterPrevisaoProximosDias();
    }
  }, [latitude, longitude]);

  const obterPrevisaoProximosDias = async () => {
    try {
      const apiKey = import.meta.env.VITE_API_KEY;
      const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric&lang=pt`;
      const resposta = await axios.get(url);
      const dadosFormatados = formatarDadosParaGrafico(resposta.data.list);
      setDadosGrafico(dadosFormatados);
    } catch (erro) {
      console.error('Erro na requisição de previsão:', erro);
    }
  };

  const formatarDadosParaGrafico = (dados) => {
    const agrupadosPorDia = dados.reduce((acc, item) => {
      const data = new Date(item.dt * 1000).toLocaleDateString();
      if (!acc[data]) {
        acc[data] = [];
      }
      acc[data].push(item.main.temp);
      return acc;
    }, {});

    return Object.keys(agrupadosPorDia).map(dia => {
      const temps = agrupadosPorDia[dia];
      const mediaTemp = temps.reduce((a, b) => a + b, 0) / temps.length;
      return { dia, temp: mediaTemp.toFixed(2) };
    });
  };

  return (
    <Container>
      {dadosGrafico.length > 0 ? (
        <LineChart width={600} height={300} data={dadosGrafico} style={{ backgroundColor: '#ffffff' }}>
          <XAxis dataKey="dia" />
          <YAxis />
          <Tooltip />
          <CartesianGrid stroke="#efefef" />
          <Line type="monotone" dataKey="temp" stroke="#4d4494" yAxisId={0} />
        </LineChart>
      ) : (
        <Texto> Carregando... </Texto>
      )}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 160px;
  text-align: center;  
  margin-top: 20px;
`
const blinkAnimation = keyframes`
  0% { opacity: 0; }
  50% { opacity: 1; }
  100% { opacity: 0; }
`;

const Texto = styled.div`
  font-family: Poppins, sans-serif;
  text-align: center;
  font-size: 100px;
  color: #C8C8C8;
  animation: ${blinkAnimation} 0.2s linear infinite;
`;