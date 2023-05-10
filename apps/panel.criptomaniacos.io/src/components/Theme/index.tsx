import {
  ChartPieSlice,
  UserCircle,
  Wallet,
  House,
  ChartBar,
  ChartDonut,
  X,
  List,
  SignOut,
} from "@phosphor-icons/react";
import { HomeIcon } from "@radix-ui/react-icons";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { ReactNode, useState } from "react";
import { useRouter } from "next/router";

interface ThemeProps {
  children: ReactNode;
}

export default function Theme({ children }: ThemeProps) {
  const { data: session } = useSession();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const router = useRouter();

  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const userName = session?.user?.name?.split(" ")[0];
  const activeBackground = "bg-green-500";

  return (
    <div className="w-screen h-screen flex overflow-hidden">
      <nav
        id="nav"
        className={`${
          isSidebarOpen ? "w-1/6 max-md:w-full max-md:absolute" : "w-0"
        } h-full flex-col bg-darkImage items-center justify-between transition-all duration-300 ease-in-out border-r-2 border-r-slate-800 `}
      >
        <div className="flex-col h-4/5">
          <div className="flex items-center justify-between">
            <Link href={"/profile"} className="flex w-full items-center px-10 py-6">
              <UserCircle weight="fill" className="text-slate-200 rounded-ful mr-3" size={28} />
              <div className="flex-col">
                <p className="text-white font-semibold text-sm">{userName}</p>
              </div>
            </Link>
            <button
              className="h-10 w-10 mr-6 flex items-center justify-center text-white border-2  border-white rounded min-[768px]:hidden"
              onClick={handleSidebarToggle}
            >
              <X size={16} weight="bold" />
            </button>
          </div>
          {/* <hr /> */}
          <ul className="flex-col text-white text-sm mt-10">
            <li
              className={`flex w-full hover:bg-green-500 mr-4 transition-all duration-300 ease-in-out ${
                router.pathname === "/" && activeBackground
              }`}
            >
              <Link href="/" className="flex  items-center px-10 py-4 ">
                <House className="mr-3" size={18} weight="fill" />
                Home
              </Link>
            </li>

            <li className={`flex hover:bg-green-500 ${router.pathname === "/chart" && activeBackground}`}>
              <Link href="/chart" className="flex w-full items-center px-10 py-4">
                <ChartBar className="mr-3" size={18} weight="fill" />
                Chart
              </Link>
            </li>

            <li className={`flex hover:bg-green-500 ${router.pathname === "/portfolio" && activeBackground}`}>
              <Link href="/portfolio" className="flex w-full items-center px-10 py-4">
                <ChartDonut className="mr-3" size={18} weight="fill" />
                Portfólio
              </Link>
            </li>

            <li className={`flex hover:bg-green-500 ${router.pathname === "/wallets" && activeBackground}`}>
              <Link href="/wallets" className="flex w-full items-center px-10 py-4">
                <Wallet className="mr-3" size={18} weight="fill" />
                Carteiras
              </Link>
            </li>
          </ul>
        </div>
        <div className="flex flex-row w-full h-1/5 items-end p-6 text-white">
          <button
            className="flex w-full items-center justify-center py-4 hover:text-green-500"
            onClick={() => signOut({ callbackUrl: "/login" })}
          >
            <SignOut weight="bold" size={18} className="mr-2" />
            Sair
          </button>
        </div>
      </nav>
      <div className="bg-darkImage">
        <button
          className="mt-4 h-10 w-10 flex items-center justify-center rounded-r-lg bg-darkImage text-white transition ease-in-out delay-150 border-2 border-y-slate-800 border-r-slate-800 border-l-0"
          onClick={handleSidebarToggle}
        >
          {isSidebarOpen ? <X size={16} weight="bold" /> : <List size={16} weight="bold" />}
        </button>
      </div>
      <div className="w-screen h-full bg-darkImage p-10 overflow-y-scroll">{children}</div>
    </div>
  );
}
