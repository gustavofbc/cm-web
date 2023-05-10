import { ArrowDownRight, ArrowUpRight, Scales, Wallet } from "@phosphor-icons/react";
import { useState } from "react";
import Modal from "react-modal";

interface CardWalletProps {
  wallet: {
    id: number;
    title: string;
    amount: number;
  };
}

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

export default function WalletCard({ wallet }: CardWalletProps) {
  const [modalIsOpen, setIsOpen] = useState(false);
  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }
  return (
    <div className="bg-dark rounded-lg p-6 text-white shadow-sm shadow-cinza-700">
      <div className="flex items-center justify-between border-b-cinza-700 border-b-2">
        <h3 className="font-semibold text-xl">{wallet.title}</h3>
        <Wallet width={24} height={24} />
      </div>

      <div className="py-4 rounded-md my-2">
        <p className="text-2xl font-bold">R$ {wallet.amount}</p>
      </div>

      <div className="flex justify-around gap-4 text-white text-[14px] ">
        <button className="flex flex-col flex-1 items-center hover:scale-105 hover:animate-spin">
          <ArrowDownRight size={28} className="rounded-full bg-darkImage p-1" weight="bold" />
          Alocar
        </button>

        <button className="flex flex-col flex-1  items-center hover:scale-105 hover:animate-spin">
          <ArrowUpRight size={28} className="rounded-full bg-darkImage p-1" weight="bold" />
          Desalocar
        </button>

        <button className="flex flex-col flex-1  items-center hover:scale-105 hover:animate-spin">
          <Scales size={28} className="rounded-full bg-darkImage p-1" weight="bold" />
          Rebalancear
        </button>
      </div>
    </div>
  );
}
