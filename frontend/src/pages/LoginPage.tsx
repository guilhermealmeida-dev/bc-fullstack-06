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
import { AuthLayout } from "../layouts/AuthLayout";
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

const LoginSchema = z.object({
  email: z.email("Digite um email válido."),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres."),
});

type LoginForm = z.infer<typeof LoginSchema>;

export function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const form = useForm<LoginForm>({
    resolver: zodResolver(LoginSchema),

    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: LoginForm) {
    setError(null);
    setLoading(true);
    try {
      const response = await fetch("http://localhost:3000/auth/sign-in", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const message = await response.json();
        setError(message.error);
        return;
      }

      const user = await response.json();

      console.log(user);
    } catch (error) {
      setError("Erro na riquisição");
      console.log("Erro na riquisição;", error);
      return;
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthLayout>
      <div className=" flex flex-col items-center gap-12 flex-">
        <Branding />
        {/* Authentication */}
        <main className="flex flex-col gap-6">
          {/* Alert */}
          {error && <Alert message={error} onClose={() => setError(null)} />}
          <AuthHeader
            title=" Bem-vindo de volta!"
            description=" Encontre parceiros para treinar ao ar livre."
            tagline=" Conecte-se e comece agora!💪"
          />
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full max-w-md"
          >
            <FieldGroup className="flex flex-col gap-5 border-gray-300 text-base placeholder:text-gray-400">
              <div id="inputs" className="flex flex-col gap-4">
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
                    <FieldError>
                      {form.formState.errors.email.message}
                    </FieldError>
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
                  {loading ? "Entrando..." : "Entrar"}
                </span>
              </Button>
            </FieldGroup>
          </form>
          <div className="text-cente">
            <p className="font-[DM_Sans] text-[12px] leading-5 font-m text-center">
              Ainda não tem uma conta?{" "}
              <a href="/auth/register">
                <span className="font-bold">Cadastre-se</span>
              </a>
            </p>
          </div>
        </main>
      </div>
    </AuthLayout>
  );
}
