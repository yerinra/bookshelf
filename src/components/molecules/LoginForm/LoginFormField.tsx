import React from "react";
import Input from "../../atoms/Input";
import Button from "../../atoms/Button";

type LoginFormFieldProps = {
  email: string;
  password: string;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
};

export default function LoginFormField({
  email,
  password,
  onInputChange,
  onSubmit,
}: LoginFormFieldProps) {
  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-2 w-[320px]">
      <Input
        name="email"
        type="email"
        placeholder="Email"
        value={email}
        required
        onChange={onInputChange}
      />
      <Input
        name="password"
        type="password"
        placeholder="Password"
        value={password}
        required
        onChange={onInputChange}
      />
      <Button type="submit">로그인</Button>
    </form>
  );
}
