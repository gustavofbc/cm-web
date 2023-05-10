import { ArrowLeft } from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import axios from "axios";
import { signIn } from "next-auth/react";

export default function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    async function registerUserAccount() {
        // use axios
        try {
            const response = await axios.post(
                "https://isac.criptomaniacos.dev/auth/register",
                {
                    name,
                    email,
                    password,
                }
            );
            signIn("credentials", {
                email,
                password,
            });
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="flex w-full h-screen bg-dark max-md:flex-col">
            <div className="flex w-1/2 h-full justify-center items-center max-md:w-full max-md:h-1/5">
                <Image
                    src={"https://static.criptomaniacos.io/logo-cm-preto-branco.png"}
                    height={200}
                    width={200}
                    alt="Criptomaníacos logo"
                    className="max-md:w-28 max-sm:w-20"
                />
            </div>
            <div className="flex w-1/2 bg-slate-200 justify-center items-center max-md:w-full h-full">
                <div className="flex-col w-1/2 max-md:w-3/4 mt-4">
                    <Link href={"/login"}>
                        <ArrowLeft
                            className="text-gray-500 mb-4 hover:text-gray-800"
                            width={36}
                            height={36}
                        />
                    </Link>
                    <h1 className="font-bold text-4xl mb-1 text-slate-900 mb-8">
                        Cadastro
                    </h1>
                    <div className="w-full">
                        <form onSubmit={(e) => e.preventDefault()}>
                            <label className="font-semibold" htmlFor="name">
                                Nome:
                                <input
                                    className="h-14 p-4 w-full rounded-t-md mb-4"
                                    placeholder="Informe seu nome completo"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    type="name"
                                    name="name"
                                    id="name"
                                    required
                                />
                            </label>
                            <label className="font-semibold" htmlFor="email">
                                E-mail:
                                <input
                                    className="h-14 p-4 w-full rounded-md mb-4"
                                    placeholder="Informe seu e-mail"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    type="email"
                                    name="email"
                                    id="email"
                                    required
                                />
                            </label>
                            <label className="font-semibold" htmlFor="password">
                                Senha:
                                <input
                                    className="h-14 p-4 w-full rounded-md mb-4"
                                    placeholder="Informe sua senha"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    type="password"
                                    name="password"
                                    id="password"
                                    required
                                />
                            </label>
                            <label className="font-semibold mt-14" htmlFor="confirmPassword">
                                Confirmar senha:
                                <input
                                    className="h-14 p-4 w-full rounded-b-md mb-4"
                                    placeholder="Confirme sua senha"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    type="password"
                                    name="confirmPassword"
                                    id="confirmPassword"
                                    required
                                />
                            </label>

                            <button
                                className="bg-green-400 text-slate-100 text-xl w-full h-14 px-6 mt-4 font-Sora font-semibold rounded-md mb-4 hover:bg-green-500 transition ease-in-out delay-150"
                                type="submit"
                                onClick={() =>
                                    registerUserAccount()
                                }
                            >
                                Cadastrar
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
