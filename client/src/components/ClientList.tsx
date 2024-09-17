import {useEffect, useState} from "react";
import {getData} from "../utils/dataHelper.ts";
import {ClientType} from "../utils/types.ts";

const tableHeaders = [
    "Name",
    "Date of Birth",
    "Main Language",
    "Secondary Language",
    "Funding Source",
];
const ClientList = () => {
    const [clientList, setClientList] = useState([])

    const refreshData = () => {
        getData().then(res => setClientList(res))
    }
    useEffect(() => {
        refreshData()
    }, []);

    return (
        <div className="relative overflow-x-auto py-4">
            <div className='flex justify-between mb-3'>
                <h1 className="text-xl"> Client Table </h1>
                <div data-testid='refresh-img' className="cursor-pointer" onClick={refreshData}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                         stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round"
                              d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"/>
                    </svg>
                </div>
            </div>
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
                <thead className="text-xs text-gray-700 uppercase bg-slate-200 border-b">
                <tr>
                    {tableHeaders.map(h => {
                        return <th key={h} scope="col" className="px-6 py-3">
                        {h}
                        </th>
                    })}
                </tr>
            </thead>
            <tbody>
            {clientList.length > 0 ? (
                clientList.map((client: ClientType, i) => (
                    <tr key={i} className="bg-white border-b hover:bg-slate-50">
                            <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{client.name}</td>
                            <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{client.dateOfBirth}</td>
                            <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{client.mainLanguage}</td>
                            <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{client.secondaryLanguage || 'N/A'}</td>
                            <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{client.fundingSource}</td>
                        </tr>
                        ))
                        ) : (
                        <tr>
                            <td colSpan={5} className="text-center px-4 py-2 border">
                                No clients found.
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
        </div>

    )
}
export default ClientList