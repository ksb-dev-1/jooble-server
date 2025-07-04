interface NotFoundErrorProps {
  status?: number;
  text: string;
}

export default function NotFoundError({ status, text }: NotFoundErrorProps) {
  return (
    <div>
      {status && <h1 className="text-3xl font-semibold">{status}</h1>}
      <p className="text-xl font-semibold">{text}</p>
    </div>
  );
}
