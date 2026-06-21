interface InputProps {
  placeholder: string;
  type?: string;
}

export default function Input({
  placeholder,
  type = "text",
}: InputProps) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className="border p-2 rounded w-full"
    />
  );
}