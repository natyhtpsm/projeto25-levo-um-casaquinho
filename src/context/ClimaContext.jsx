import { createContext, useContext, useState } from 'react';

const ClimaContext = createContext();

export const ClimaProvider = ({ children }) => {
    const [dadosClima, setDadosClima] = useState(null);
    const [unidade, setUnidade] = useState('celsius'); 
  
    const atualizarDadosClima = (novosDados) => {
      setDadosClima(novosDados);
    };
  
    const toggleUnidade = () => { 
      setUnidade(unidade === 'celsius' ? 'fahrenheit' : 'celsius');
    };
  
    return (
      <ClimaContext.Provider value={{ dadosClima, atualizarDadosClima, unidade, toggleUnidade }}>
        {children}
      </ClimaContext.Provider>
    );
  };
  

export const useClimaContext = () => {
  const context = useContext(ClimaContext);
  if (!context) {
    throw new Error('useClimaContext deve ser usado dentro de ClimaProvider');
  }
  return context;
};
