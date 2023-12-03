import Homepage from './pages/Homepage'
import { ClimaProvider } from './context/ClimaContext'

function App() {
  return (
    <>
      <ClimaProvider>
        <Homepage/>
      </ClimaProvider>
    </>
  )
}

export default App
