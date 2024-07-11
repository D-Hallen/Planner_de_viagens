import { useRouteError } from "react-router-dom";

interface RouteError {
    statusText?: string;
    message?: string;
  }

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div id="error-page" className="fixed inset-0 flex items-center justify-center">
      <h1 className="font-semibold">Erro! </h1>
      <span>Algo Inesperado Aconteceu.</span>
      <p> 
        <i>{" - ERROR: " + error.statusText || error.message}</i>
      </p>
    </div>
  );
}