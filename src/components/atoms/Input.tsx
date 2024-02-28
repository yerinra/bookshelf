type InputProps = {
  type: "text" | "email" | "password";
  name?: "email" | "password";
  required?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  value?: string;
};

export default function Input({
  type,
  name,
  required,
  onChange,
  placeholder,
  value,
}: InputProps) {
  return (
    <input
      type={type}
      name={name}
      required={required}
      onChange={onChange}
      placeholder={placeholder}
      value={value}
      className="placeholder:text-l-text-secondary bg-l-bg-primary dark:bg-d-bg-secondary border border-l-border dark:border-d-border hover:border-l-text-secondary focus:border-l-text-primary focus:dark:border-d-text-primary hover:dark:border-d-text-secondary w-full px-3 py-2 rounded-lg focus:outline-l-text-secondary focus:dark:outline-d-text-secondary;"
    />
  );
}
