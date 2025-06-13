import { Link } from "react-router";

type TodoSuccessToastProps = {
  message: string;
  id: string;
};

export function TodoSuccessToast({ message, id }: TodoSuccessToastProps) {
  return (
    <div>
      <p>{message}</p>
      <Link to={`todos/${id}`} className="text-blue-500 underline">
        View Todo
      </Link>
    </div>
  );
}
