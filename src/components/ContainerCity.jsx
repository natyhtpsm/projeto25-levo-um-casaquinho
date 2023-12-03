import styled from "styled-components";

export default function ContainerCity({dadosClima}){
   
    if (!dadosClima || !dadosClima.name) {
        return null; 
    }
      
    const latitude = dadosClima.coord.lat.toFixed(2);
    const longitude = dadosClima.coord.lon.toFixed(2);
    
    return (
        <Container>
            <City>{dadosClima.name}</City>
            <LatLong>Lat: {latitude} Long: {longitude}</LatLong>
        </Container>
    );
    
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 160px;
    margin-bottom: 20px;

`
const City = styled.text`
    font-family: Poppins;
    font-size: 80px;
    font-family: Poppins;
    color: black;

`
const LatLong = styled.text`
    font-family: Poppins;
    font-size: 15px;
    font-family: Poppins;
    color: black;
`
