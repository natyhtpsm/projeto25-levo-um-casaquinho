import { createContext, useContext, useState } from 'react';

const ClimaContext = createContext();

export const ClimaProvider = ({ children }) => {
  const [dadosClima, setDadosClima] = useState(null);

  const atualizarDadosClima = (novosDados) => {
    setDadosClima(novosDados);
  };

  return (
    <ClimaContext.Provider value={{ dadosClima, atualizarDadosClima }}>
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
