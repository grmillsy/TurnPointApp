import {ClientType} from "./types.ts";

export const addClient = async(data: ClientType) => {
    try {
        const response = await fetch('http://localhost:4001/client', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        if (response.ok) {
            return await response.json();
        } else {
            console.error('Failed to add client');
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

export const getData = async() => {
    try {
        const response = await fetch('http://localhost:4001/clients')
        if (response.ok) {
            return await response.json();

        } else {
            console.error('Failed to add client');
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

export const deleteClient = async(id: number) => {
    try {
        const response = await fetch(`http://localhost:4001/client/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        console.log('resonse', response)
        if (response.ok) {
            return await response.json();

        } else {
            console.error('Failed to delete client');
        }
    } catch (error) {
        console.error('Error:', error);
    }
}
