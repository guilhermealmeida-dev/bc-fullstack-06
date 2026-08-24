import { Button } from "./ui/button";
import { X } from "lucide-react";

type AlertProps = {
  message: string;
  onClose: () => void;
};

export function Alert({ message, onClose }: AlertProps) {
  return (
    <div className="relative rounded-md border border-red-500 bg-red-50 p-4 pr-12 text-red-700">
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
