import { useSession } from "next-auth/react";
import Theme from "../../components/Theme";
import Image from "next/image";
import { UserCircle } from "@phosphor-icons/react";
import { authMiddleware } from "@/components/WithAuth";

export default function Profile() {
  const { data: session } = useSession();

  return (
    <Theme>
      <div>
        <h1 className="text-3xl text-white font-bold">Perfil do usuário</h1>
        <div className="flex gap-4 mt-4">
          <div className="w-1/3  bg-dark rounded-md text-white shadow-sm shadow-cinza-700">
            <div className="flex flex-col items-center justify-center shadow-md p-8 text-white">
              {session?.user?.image ? (
                <Image src={session.user.image} width={75} height={75} alt="photo user" />
              ) : (
                <UserCircle weight="fill" className="w-16 h-16" />
              )}
              <h2 className="mt-2 font-semibold">{session?.user?.name}</h2>
            </div>
            <div className="">
              <ul>
                <li className="p-4 w-full hover:cursor-pointer hover:bg-cinza-900">Editar usuário</li>
                <li className="p-4 w-full hover:cursor-pointer hover:bg-cinza-900">Configurações</li>
                <li className="p-4 w-full hover:cursor-pointer hover:bg-cinza-900">Notificações</li>
                <li className="p-4 w-full hover:cursor-pointer hover:bg-cinza-900">Credênciais</li>
              </ul>
            </div>
          </div>
          <div className="w-2/3 bg-dark shadow-md rounded-md p-4 text-white">
            <div>
              <h2 className="font-semibold">Nome:</h2>
              <p className="border-2 border-cinza-700 p-2 rounded">{session?.user?.name}</p>
              <br />
              <h2 className="font-semibold">Email:</h2>
              <p className="border-2 border-cinza-700 p-2 rounded">{session?.user?.email}</p>
              <br />
            </div>
          </div>
        </div>
      </div>
    </Theme>
  );
}

export async function getServerSideProps(context: any) {
  return authMiddleware(context);
}
