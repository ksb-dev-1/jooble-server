export default function ErrorMessage({ message }: { message: string | null }) {
  if (!message) return null;

  return (
    <p role="alert" className="text-red-600 dark:text-red-400 mt-2">
      {message}
    </p>
  );
}
