import styled from "styled-components";

export default function CardInfos({ label, value }) {
    return (
      <>
        <Container>
          <h1>
            {label}: {value}
          </h1>
        </Container>
           
      </>
    )
}

const Container = styled.div`
    display: flex;
    width: 39%;
    height: 120px;
    border-radius: 32px;
    box-shadow: 0px 24px 48px 0px #314F7C14;
    background: linear-gradient(117.33deg, #4D4494 22.83%, #4F43AE 90.03%);
    background-color: black;
    margin-right: 20px;
`