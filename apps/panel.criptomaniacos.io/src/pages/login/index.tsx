import { useState, useEffect } from "react";
import Google from "../../../public/google.png";
import Link from "next/link";
import Image from "next/image";
import { Eye, EyeClosed, Spinner } from "@phosphor-icons/react";
import { signIn } from "next-auth/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
import { UserCredentialsError } from "@/exceptions/user-credentials-error";
import { SomethingWentWrongError } from "@/exceptions/something-went-wrong-error";

function Login() {
  const [email, setEmail] = useState("isac@criptomaniacos.io");
  const [password, setPassword] = useState("admin");
  const [hide, setHide] = useState(false);
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function hidePassword() {
    const inputPassword = document.getElementById("password") as HTMLInputElement;
    if (inputPassword) {
      if (inputPassword.type === "password") {
        inputPassword.type = "text";
        setHide(true);
      } else {
        inputPassword.type = "password";
        setHide(false);
      }
    }
  }

  function handleSignIn(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    signIn("credentials", {
      email,
      password,
      redirect: false,
    })
      .then((response) => {
        if (response && response.ok) {
          toast.success("Login realizado com sucesso!");
          router.push("/chart");
        } else {
          console.log(response?.error);
          if (response?.error === "UserInvalidCredentials") return setError("Usuário ou senha inválidos");

          if (response?.error === "SomethingWentWrongError") return setError("Ocorreu um erro inesperado");
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <div className="flex w-full h-screen bg-darkImage max-md:flex-col">
      <div className="flex w-1/2 h-full justify-center items-center max-md:w-full max-md:h-1/5">
        <Image
          src={"https://static.criptomaniacos.io/logo-cm-preto-branco.png"}
          height={200}
          width={200}
          alt="Criptomaníacos logo"
          className="max-md:w-28 max-sm:w-20"
        />
      </div>

      <div className="flex w-1/2 bg-slate-200 justify-center items-center max-md:w-full max-md:h-4/5">
        <div className="flex-col w-1/2 max-md:w-2/3">
          <h2 className="">Bem vindo,</h2>
          <h1 className="font-bold text-4xl mb-1 text-slate-900 mb-8">Faça login</h1>
          <div className="w-full">
            <form onSubmit={(e) => handleSignIn(e)}>
              <label htmlFor="email">
                <input
                  className="h-14 p-4 w-full rounded-t-md mb-2"
                  placeholder="Informe seu e-mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setError(null)}
                  type="email"
                  name="email"
                  id="email"
                  required
                />
              </label>
              <label htmlFor="password" className="relative bg-green-800">
                {hide ? (
                  <Eye
                    className="absolute right-0 flex items-center mt-4 mr-4 pl-1 bg-white text-slate-800"
                    width={24}
                    height={24}
                    onClick={() => hidePassword()}
                  />
                ) : (
                  <EyeClosed
                    className="absolute right-0 flex items-center mt-4 mr-4  pl-1 bg-white text-slate-800"
                    width={24}
                    height={24}
                    onClick={() => hidePassword()}
                  />
                )}
                <input
                  className="h-14 p-4 w-full rounded-b-md mb-4"
                  placeholder="Informe sua senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setError(null)}
                  type="password"
                  name="password"
                  id="password"
                  required
                />
              </label>

              {error && (
                <span className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">
                  {error}
                </span>
              )}

              <div className="text-end">
                <Link href={"/recovery"} className="underline text-slate-500 hover:text-slate-800">
                  Esqueci minha senha
                </Link>
              </div>

              <button
                className="flex flex-row items-center justify-center bg-green-400 text-slate-100 text-xl w-full h-14 px-6 mt-4 font-Sora font-semibold rounded-md mb-4 hover:bg-green-500 transition ease-in-out delay-150 disabled:bg-slate-400 disabled:text-slate-800"
                disabled={loading}
              >
                {loading && <Spinner className="animate-spin mr-2" width={24} height={24} />}
                <span>Entrar</span>
              </button>
              <ToastContainer />
            </form>
          </div>

          <div className="flex flex-col w-full items-center">
            <p className="mb-2 text-slate-900">ou</p>
            <button onClick={() => signIn("google")}>
              <Image
                width={50}
                height={50}
                src={Google}
                alt="Criptomaníacos logo"
                className="border-2 border-gray-200 bg-gray-100 p-2 rounded-lg hover:border-gray-100 transition ease-in-out delay-150"
              />
            </button>
          </div>
          <div className="mt-4">
            Não tem conta?
            <Link href="/register" className="ml-2 text-slate-500 underline hover:text-slate-800">
              Cadastre-se
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
