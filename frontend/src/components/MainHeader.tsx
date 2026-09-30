import { AvatarCircle } from "./AvatarCircle";
import { Branding } from "./Branding";
import { ConfirmationButton } from "./ConfirmationButton";
import { PlusCircle } from "lucide-react";

export function MainHeader() {
  return (
    <header className="flex justify-between items-center w-full h-13">
      <Branding />
      <div className="flex gap-5  items-center justify-between ">
        <ConfirmationButton
          name="Criar atividade"
          className="w-37.5 h-10"
          onClick={() => {}}
          leftIcon={<PlusCircle size={16} />}
        ></ConfirmationButton>
       <div className="flex items-center justify-center">
         <AvatarCircle src="" />
        <span className="ml-2">Nome do Usuário</span>
       </div>
      </div>
    </header>
  );
}
