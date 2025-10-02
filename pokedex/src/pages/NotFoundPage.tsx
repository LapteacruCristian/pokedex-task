import ErrorCard from "../components/ErrorCard";

export default function NotFoundPage() {
  return (
    <div className="flex flex-col justify-center items-center h-full">
      <ErrorCard
        title="404 Not Found"
        description="Oops! The page you're looking for doesn't exist."
        message="Please check the URL or return to the homepage."
      />
    </div>
  );
}
