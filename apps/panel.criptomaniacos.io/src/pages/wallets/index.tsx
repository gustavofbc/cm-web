import { useSession } from "next-auth/react";
import { useState } from "react";
import Theme from "../../components/Theme";
import Table from "../../components/Table";
import Image from "next/image";
import { ArrowDownRight, ArrowUpLeft, ArrowUpRight, Scales, Wallet } from "@phosphor-icons/react";
import WalletCard from "../../components/WalletCard";
import { authMiddleware } from "@/components/WithAuth";
import { Alert } from "antd";

export default function Wallets() {
  const { data: session } = useSession();

  const [wallets, setWallets] = useState([
    {
      id: 1,
      title: "Carteira hodl",
      amount: 236.0,
    },
    {
      id: 2,
      title: "Carteira altseason",
      amount: 52.67,
    },
    {
      id: 3,
      title: "Carteira alt factor",
      amount: 97.8,
    },
    {
      id: 4,
      title: "Carteira trading",
      amount: 100.0,
    },
  ]);

  return (
    <Theme>
      <Alert message="Esta página está em desenvolvimento" type="warning" showIcon closable />
      <div className="bg-darkImage h-screen flex flex-col mt-4">
        <div className="w-full bg-dark rounded shadow-sm shadow-cinza-700 text-white mb-4">
          <h2 className="text-lg font-bold p-4">Total na carteiras</h2>
          <div className="text-2xl font-bold p-4">R$ 111,00</div>
        </div>

        <div className="grid grid-cols-3 gap-4 md:grid-cols-2">
          {wallets.map((wallet) => (
            <WalletCard key={wallet.id} wallet={wallet} />
          ))}
        </div>
      </div>
    </Theme>
  );
}

export async function getServerSideProps(context: any) {
  return authMiddleware(context);
}
