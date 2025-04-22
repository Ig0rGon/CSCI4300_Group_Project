// app/not-found.tsx
export default function NotFound() {
    return (
      <div
        className="flex flex-col items-center justify-center min-h-screen text-center"
        style={{ backgroundColor: "rgb(245, 192, 190)" }}
      >
        <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
        <p className="text-lg text-gray-700 mb-8">
          Sorry, we couldn’t find the page you were looking for.
        </p>
        <a href="/" className="text-blue-600 underline">
          Go back home
        </a>
      </div>
    );
  }
  