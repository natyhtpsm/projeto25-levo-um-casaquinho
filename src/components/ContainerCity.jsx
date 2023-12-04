import styled from "styled-components";

export default function ContainerCity({ dadosClima }) {
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
    height: auto; 
    margin-bottom: 20px;
`;

const City = styled.div` 
    font-family: Poppins, sans-serif; 
    font-size: 40px;
    color: black;
    text-align: center;
    @media (min-width: 768px) {
        font-size: 80px; 
        text-align: left;
    }
`;

const LatLong = styled.div` 
    font-family: Poppins, sans-serif; 
    font-size: 15px;
    color: black;
    text-align: center;
    @media (min-width: 768px) {
        text-align: left;
    }
`;
