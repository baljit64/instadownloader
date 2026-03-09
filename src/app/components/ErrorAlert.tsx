interface ErrorAlertProps {
  message: string;
}

export default function ErrorAlert({ message }: ErrorAlertProps) {
  return <div className="rounded-lg bg-red-100 border border-red-300 text-red-700 px-4 py-3">{message}</div>;
}
