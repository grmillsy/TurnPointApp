import {useEffect, useState} from "react";
import {deleteClient, getData} from "../utils/dataHelper.ts";
import {ClientResponse} from "../utils/types.ts";
import {TrashIcon, RefreshIcon} from "../utils/icons.tsx";

const tableHeaders = [
    "Name",
    "Date of Birth",
    "Main Language",
    "Secondary Language",
    "Funding Source",
    "Delete"
];
const ClientList = () => {
    const [clientList, setClientList] = useState<ClientResponse[]>([])

    const refreshData = () => {
        getData().then(res => setClientList(res))
    }
    useEffect(() => {
        refreshData()
    }, []);

    const handleDeleteClient = async (id: number) => {
        try {
            await deleteClient(id);
            refreshData();
        } catch (error) {
            console.error('Error deleting client:', error);
        }
    };


    return (
        <div className="relative overflow-x-auto py-4">
            <div className='flex justify-between mb-3'>
                <h1 className="text-xl"> Client Table </h1>
                <div data-testid='refresh-img' className="cursor-pointer" onClick={refreshData}>
                    <RefreshIcon />
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
                    clientList.map((client: ClientResponse, i) => (
                        <tr key={i} className="bg-white border-b hover:bg-slate-50">
                            <td scope="row"
                                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{client.name}</td>
                            <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{client.dateOfBirth}</td>
                            <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{client.mainLanguage}</td>
                            <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{client.secondaryLanguage || 'N/A'}</td>
                            <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{client.fundingSource}</td>
                            <td>
                                <div className="flex flex-row justify-evenly">
                                    <div className="cursor-pointer" onClick={() => handleDeleteClient(client.id)}>
                                       <TrashIcon />
                                    </div>
                                </div>
                            </td>

                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan={6} className="text-center px-4 py-2 border">
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


