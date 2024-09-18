import {useEffect, useState} from "react";
import {deleteClient, getData} from "../utils/dataHelper.ts";
import {ClientResponse} from "../utils/types.ts";

const tableHeaders = [
    "Name",
    "Date of Birth",
    "Main Language",
    "Secondary Language",
    "Funding Source",
    "Options"
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
                                    <div>
                                        {PencilIcon}
                                    </div>
                                    <div onClick={() => handleDeleteClient(client.id)}>
                                        {TrashIcon}
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


const TrashIcon = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                       stroke="currentColor" className="size-6">
    <path strokeLinecap="round" strokeLinejoin="round"
          d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"/>
</svg>

const PencilIcon = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                        stroke="currentColor" className="size-6">
    <path strokeLinecap="round" strokeLinejoin="round"
          d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"/>
</svg>
