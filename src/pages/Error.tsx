import { Info } from 'lucide-react';
import { Link, useRouteError } from 'react-router-dom';

const ErrorPage = () => {
  const error: any = useRouteError();
  console.error(error);

  return (
    <section id="error-page">
      <div className=" p-4 flex flex-col gap-5 justify-center items-center h-screen">
        <Info width={40} height={40} />
        <h1 className=" text-4xl">Oops!</h1>
        <p>Sorry, an unexpected error has occurred.</p>
        <p>
          {' '}
          <i>{error.statusText || error.message}</i>{' '}
        </p>

        <Link to={'/'}>Go Back Home</Link>
      </div>
    </section>
  );
};

export default ErrorPage;
