import { type buttonProps } from "./button.types";
import { buttonVariants } from "./button.styles";
import { cn } from "@shared/lib/cn";
import { Spinner } from "@shared/ui/spinner";

export const Button = ({
  className,
  variant,
  size,
  isLoading,
  children,
  ref,
  onClick,
  ...props
}: buttonProps) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (isLoading || props.disabled) {
      e.preventDefault();
      return;
    }
    onClick?.(e);
  };

  return (
    <button
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      disabled={isLoading || props.disabled}
      onClick={handleClick}
      {...props}
    >
      {isLoading && <Spinner />}
      {children}
    </button>
  );
};

Button.displayName = "Button";
