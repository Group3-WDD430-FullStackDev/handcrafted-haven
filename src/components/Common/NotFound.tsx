type NotFoundPageProps = {
  errorMessage: string;
};

const NotFoundPage = ({ errorMessage }: NotFoundPageProps) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-8">
      <div className="bg-white text-center p-8 rounded-md shadow-lg max-w-lg w-full">
        <h1 className="text-3xl font-normal text-blue-600">{errorMessage}</h1>
      </div>
    </div>
  );
};

export default NotFoundPage;
