import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { EyeIcon } from "@phosphor-icons/react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import { EyeOffIcon, Loader2 } from "lucide-react";
import { useState } from "react";
import { Branding } from "@/components/Branding";
import { AuthHeader } from "@/components/AuthHeader";
import { Alert } from "@/components/Alert";
import { Link } from "react-router";
import { MessageType } from "@/types/message.type";

const RegisterSchema = z.object({
  name: z.string(),
  cpf: z.string().length(11, "Cpf inválido"),
  email: z.email("Digite um email válido."),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres."),
});

type RegisterForm = z.infer<typeof RegisterSchema>;

export function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [messageType, setMessagetype] = useState<MessageType | null>(null);
  const [loading, setLoading] = useState(false);

  const form = useForm<RegisterForm>({
    resolver: zodResolver(RegisterSchema),

    defaultValues: {
      name: "",
      cpf: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: RegisterForm) {
    setMessagetype(null);
    setLoading(true);
    try {
      const response = await fetch("http://localhost:3000/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const message = await response.json();
        setMessagetype({ message: message.error, isSucesses: false });
        return;
      }

      const message = await response.json();
      setMessagetype({ message: message, isSucesses: true });
    } catch (error) {
      setMessagetype({ message: "Erro na riquisição", isSucesses: false });
      console.log("Erro na riquisição;", error);
      return;
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className=" flex flex-col items-center gap-12 flex-">
      <Branding />
      {/* Authentication */}
      <main className="flex flex-col gap-6">
        {/* Alert */}
        {messageType && (
          <Alert
            message={messageType.message}
            onClose={() => setMessagetype(null)}
            isSuccess={messageType.isSucesses}
          />
        )}
        <AuthHeader
          title="Crie sua conta"
          description="Cadastre-se para encontrar parceiros de treino e começar a se exercitar ao ar livre."
          tagline="Vamos juntos! 💪"
        />
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full max-w-md"
        >
          <FieldGroup className="flex flex-col gap-5 border-gray-300 text-base placeholder:text-gray-400">
            <div id="inputs" className="flex flex-col gap-4">
              <Field>
                <FieldLabel
                  htmlFor="name"
                  className="text-[DM_Sans] font-semibold text-base leading-5"
                >
                  Nome <span className="text-red-500">*</span>
                </FieldLabel>
                <Input
                  id="name"
                  type="text"
                  required
                  placeholder="Ex: João Silva"
                  title="Informe o seu nome!"
                  className="h-12"
                  {...form.register("name")}
                />

                {form.formState.errors.name && (
                  <FieldError>{form.formState.errors.name.message}</FieldError>
                )}
              </Field>
              <Field>
                <FieldLabel
                  htmlFor="cpf"
                  className="text-[DM_Sans] font-semibold text-base leading-5"
                >
                  CPF <span className="text-red-500">*</span>
                </FieldLabel>
                <Input
                  id="cpf"
                  type="text"
                  required
                  placeholder="Ex.: 123.456.789-01"
                  title="Informe o seu cpf!"
                  className="h-12"
                  {...form.register("cpf")}
                />

                {form.formState.errors.cpf && (
                  <FieldError>{form.formState.errors.cpf.message}</FieldError>
                )}
              </Field>
              <Field>
                <FieldLabel
                  htmlFor="email"
                  className="text-[DM_Sans] font-semibold text-base leading-5"
                >
                  Email <span className="text-red-500">*</span>
                </FieldLabel>
                <Input
                  id="email"
                  type="email"
                  required
                  placeholder="Ex: joao@email.com"
                  title="Informe seu email!"
                  className="h-12"
                  {...form.register("email")}
                />

                {form.formState.errors.email && (
                  <FieldError>{form.formState.errors.email.message}</FieldError>
                )}
              </Field>
              <Field>
                <FieldLabel
                  htmlFor="password"
                  className="text-[DM_Sans] font-semibold text-base leading-5"
                >
                  Senha <span className="text-red-500">*</span>
                </FieldLabel>
                <InputGroup className="h-12">
                  <InputGroupInput
                    id="password"
                    type={showPassword ? "text" : "password"}
                    required
                    placeholder="Ex; joao123"
                    title="Informe sua senha!"
                    className="text-base"
                    {...form.register("password")}
                  />

                  <InputGroupAddon align="inline-end">
                    <InputGroupButton
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label={
                        showPassword ? "Ocultar senha" : "Mostrar senha"
                      }
                    >
                      {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                    </InputGroupButton>
                  </InputGroupAddon>
                </InputGroup>

                {form.formState.errors.password && (
                  <FieldError>
                    {form.formState.errors.password.message}
                  </FieldError>
                )}
              </Field>
            </div>
            <Button type="submit" className="bg-[#00BC7D] h-12">
              <span className="flex items-center gap-3 leading-6 font-bold font-[DM_Sans] text-base text-white">
                {loading && <Loader2 className="animate-spin" />}
                {loading ? "Cadastrando..." : "Cadastrar"}
              </span>
            </Button>
          </FieldGroup>
        </form>
        <div className="text-cente">
          <p className="font-[DM_Sans] text-[12px] leading-5 font-m text-center">
            Já tem uma conta?{" "}
            <Link to="/">
              <span className="font-bold">Faça login</span>
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}
