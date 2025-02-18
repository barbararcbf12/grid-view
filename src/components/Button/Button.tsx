import { ComponentPropsWithoutRef } from "react";

type ButtonProps = ComponentPropsWithoutRef<"button"> & {
  children: React.ReactNode;
  className?: string;
};

function Button(props: ButtonProps) {
  const { children, className, ...rest } = props;
  return (
    <button
      className={`px-4 py-2 border rounded-lg disabled:opacity-50 ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}

export default Button;
