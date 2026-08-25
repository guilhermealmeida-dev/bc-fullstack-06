import { Button } from "./ui/button";
import { X } from "lucide-react";

type AlertProps = {
  message: string;
  onClose: () => void;
  isSuccess: boolean;
};

export function Alert({ message, onClose, isSuccess }: AlertProps) {
  return (
    <div
      className={`relative rounded-md border p-4 pr-12 ${
        isSuccess
          ? "border-green-500 bg-green-50 text-green-700"
          : "border-red-500 bg-red-50 text-red-700"
      }`}
    >
      <span>{message}</span>

      <Button
        type="button"
        variant="ghost"
        size="icon"
        aria-label="Fechar alerta"
        onClick={onClose}
        className="absolute right-2 top-2"
      >
        <X className="size-4" />
      </Button>
    </div>
  );
}
