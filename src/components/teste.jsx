import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';


function ErrorTitle() {
  return (<p>Ocorreu um Erro!</p>);
}


function ErrorMessage({ errorCode }) {
  return (<p>Desculpe, encontramos um problema. Erro: {errorCode}</p>);
}

const MySwal = withReactContent(Swal);

export default function loadInfo() {
  const URL = import.meta.env.VITE_API_URL;
  axios
    .get(URL)
    .then((response) => {
      
    })
    .catch((error) => {

      let errorCode = error.response ? error.response.status : 'Desconhecido';

    
      MySwal.fire({
        title: <ErrorTitle />,
        html: <ErrorMessage errorCode={errorCode} />,
        icon: "error",
        confirmButtonText: "Entendi"
      });
    });
}
