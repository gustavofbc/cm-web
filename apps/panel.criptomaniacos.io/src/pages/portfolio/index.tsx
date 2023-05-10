import { useState } from "react";
import { useSession } from "next-auth/react";
import Theme from "../../components/Theme";
import TablePortfolio from "../../components/TablePortfolio";
import { authMiddleware } from "@/components/WithAuth";
import { Alert } from "antd";

export default function Portfolio() {
  const { data: session } = useSession();

  const [products, setProducts] = useState([
    {
      moeda: "USDT",
      total: "20.00",
      valor: 100.0,
    },
    {
      moeda: "BTC",
      total: "0.00246",
      valor: 2.801,
    },
    {
      moeda: "ETH",
      total: "0.793",
      valor: 2.784,
    },
  ]);

  return (
    <Theme>
      <Alert message="Esta página está em desenvolvimento" type="warning" showIcon closable />

      <div className="bg-darkImage w-full h-screen flex flex-col">
        <TablePortfolio list={products} />
      </div>
    </Theme>
  );
}

export async function getServerSideProps(context: any) {
  return authMiddleware(context);
}
