import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="flex min-h-full flex-col items-center justify-center gap-6 bg-base-100 px-4">
      <h1 className="text-4xl font-bold text-base-content">404</h1>
      <p className="text-center text-base-content/70">
        This page doesn’t exist or has been moved.
      </p>
      <Link
        to="/"
        className="btn btn-primary"
      >
        Back to home
      </Link>
    </div>
  );
}
