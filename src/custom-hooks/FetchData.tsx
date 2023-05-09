import { useEffect, useState } from 'react'
import { server_calls } from '../api/server'

export const useGetData = (privacy: boolean, token: string) => {
    const [ reviewData, setData ] = useState<[]>([])
    
    async function handleDataFetch(){
        const result = await server_calls.get(privacy, token);
        setData(result)
    }
    useEffect( () => {
        handleDataFetch();
    }, [privacy])
    return { reviewData, getData:handleDataFetch }
}
