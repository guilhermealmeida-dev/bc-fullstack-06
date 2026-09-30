import { Button } from "./ui/button";
import type { ReactNode } from "react";

type ConfirmationButtonProps = {
  name: string;
  className?: string;
  onClick: () => void;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
};

export function ConfirmationButton(props: ConfirmationButtonProps) {
  return (
    <Button
      onClick={props.onClick}
      className={`bg-emerald-500 text-white px-3 py-0 rounderd hover:bg-emerald-600 inline-flex items-center gap-1 ${props.className}`}
    >
      {props.leftIcon}
      {props.name}
      {props.rightIcon}
    </Button>
  );
}
