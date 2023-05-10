import { Circle, Coins, Info } from "@phosphor-icons/react";

interface IActives {
  moeda: string;
  total: string;
  valor: number;
}

interface TableProps {
  list: Array<IActives>;
}

export default function TablePortfolio({ list }: TableProps) {
  return (
    <div className="w-full mx-auto">
      <div className="bg-dark rounded-lg shadow-lg overflow-auto mt-6">
        {list.length === 0 ? (
          <div className="flex flex-col w-full h-24 justify-center items-center">
            <Info className="text-gray-600" width={24} height={24} />
            <p className="font-semibold text-center text-slate-600">Você não possui ativos.</p>
          </div>
        ) : (
          <table className="w-full table-auto shadow-md">
            <thead>
              <tr className="text-white shadow-lg">
                <th className="px-6 py-4 hidden sm:table-cell">Moeda</th>
                <th className="px-6 py-4 sm:table-cell">Total</th>
                <th className="px-6 py-4 sm:table-cell">Valor Alocado</th>
              </tr>
            </thead>

            <tbody>
              {list.map((item: IActives, index: number) => (
                <tr key={index} className="border-b border-cinza-700 text-gray-300">
                  <td className="px-6 py-4 text-white sm:table-cell">
                    <span className="flex items-center mr-2 justify-center">{item.moeda}</span>
                  </td>
                  <td className="px-6 py-4 hidden sm:table-cell text-center" id="slug">
                    {item.total}
                  </td>
                  <td className="px-6 py-4 sm:table-cell text-center">R$ {item.valor}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
