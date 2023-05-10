import { ArrowLeft } from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";

export default function Recovery() {
    return (
        <div className="flex w-full h-screen bg-dark max-md:flex-col">
            <div className="flex w-1/2 h-full justify-center items-center  max-md:w-full max-md:h-1/5">
                <Image
                    src={'https://static.criptomaniacos.io/logo-cm-preto-branco.png'}
                    height={200}
                    width={200}
                    alt="Criptomaníacos logo"
                    className="max-md:w-28 max-sm:w-20"
                />
            </div>
            <div className="flex w-1/2 bg-slate-200 justify-center items-center max-md:w-full h-full">
                <div className="flex-col w-1/2  max-md:w-3/4">
                    <Link href={'/login'}>
                        <ArrowLeft
                            className="text-gray-500 mb-8 hover:text-gray-800"
                            width={36}
                            height={36}
                        />
                    </Link>
                    <h1 className="font-bold text-4xl text-slate-900 mb-2">Recuperar senha</h1>
                    <div className="w-full">
                        <p className="text-gray-400 mb-8">Preencha o campo abaixo para solicitar a recuperação da senha.</p>
                        <form action="">
                            <label className="font-semibold" htmlFor="email">E-mail:
                                <input
                                    className="h-14 p-4 w-full rounded-md mb-2"
                                    placeholder="Informe seu e-mail"
                                    type="email"
                                    name="email"
                                    id="email"
                                    required
                                />
                            </label>

                            <button
                                className="bg-white text-gray-800 text-xl w-full h-14 px-6 mt-4 font-Sora font-semibold rounded-md mb-4 hover:bg-gray-300 transition ease-in-out delay-150"
                                type="submit"
                            >
                                Enviar
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}