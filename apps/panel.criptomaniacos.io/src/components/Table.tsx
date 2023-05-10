import { Circle, Info } from "@phosphor-icons/react";

interface IProduct {
    productTitle: string;
    monthPrice: string;
    status: boolean;
}

interface TableProps {
    list: Array<IProduct>
}

export default function Table({ list }: TableProps) {
    return (
        <div className="w-full max-w-5xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg overflow-auto mt-6">
                {list.length === 0 ?
                    <div className="flex flex-col w-full h-24 justify-center items-center">
                        <Info
                            className="text-gray-600"
                            width={24}
                            height={24}
                        />
                        <p className="font-semibold text-center text-slate-600">
                            Você não possui serviços.
                        </p>
                    </div>
                    :
                    <table className="w-full table-auto shadow-md">
                        <thead>
                            <tr className=" text-slate-900 shadow-lg">
                                <th className="px-6 py-4 hidden sm:table-cell">Produto</th>
                                <th className="px-6 py-4 sm:table-cell">Preço mensal</th>
                                <th className="px-6 py-4 sm:table-cell">Status</th>
                            </tr>
                        </thead>

                        <tbody>
                            {list.map((item: IProduct, index: number) => (
                                <tr
                                    key={index}
                                    className="border-b border-gray-200">
                                    <td className="px-6 py-4 text-gray-500 sm:table-cell  text-center">
                                        {item.productTitle}
                                    </td>
                                    <td
                                        className="px-6 py-4 text-gray-500 hidden sm:table-cell text-center"
                                        id="slug"
                                    >
                                        R$ {item.monthPrice}
                                    </td>
                                    <td className="px-6 py-4 sm:table-cell">
                                        <span className="flex items-center mr-2 text-gray-500 justify-center">
                                            {item.status ?
                                                <Circle
                                                    className="bg-green-400 text-green-400 rounded-full mr-1"
                                                    width={16}
                                                    height={16}
                                                />
                                                :
                                                <Circle className="bg-red-400 text-red-400 rounded-full mr-1"
                                                    width={16}
                                                    height={16}
                                                />
                                            }
                                            {item.status ? "Ativo" : 'Inativo'}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                }
            </div>

            {/* <ReactPaginate
                breakLabel="..."
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={pageCount}
                pageClassName='p-2 text-gray-500'
                nextLabel=">"
                nextClassName='text-2xl p-2 hover:text-gray-600'
                nextLinkClassName={pageCount === endOffset ? 'cursor-no-drop text-gray-400' : ''}
                previousLabel="<"
                previousClassName='text-2xl p-2 hover:text-gray-600'
                previousLinkClassName={itemOffset === 0 ? 'cursor-no-drop text-gray-400' : ''}
                renderOnZeroPageCount={null}
                className='flex justify-center font-semibold text-xl p-2'
                activeClassName='bg-white text-gray-800 border-2 border-gray-800 p-1 rounded'
            /> */}
        </div>
    )
}