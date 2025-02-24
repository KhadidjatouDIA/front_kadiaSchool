import { useEffect, useState } from "react"
import { getActions } from "@/actions/actions";

export function useFetch(url : string) {
    const [response , setResponse] = useState<any>(null);
    const [error,  setError] = useState(false);
    const [isLoading,  setIsLoading] = useState(false);
    const [refetch , setRefetch] = useState(0);

    const onRefresh = () => {
        setRefetch(Date.now())
    }

    useEffect(() => {
        if(!url) return;
        setIsLoading(true)
        const fetchData = async (route : string) => {
            await getActions(route)
            .then((response : any)=>{
                setResponse(response);
            })
            .catch((error)=>{
                console.log(error)
                setError(true);
            })
            .finally(()=>{
                setIsLoading(false)
            })
        }

        fetchData(url)
    
    }, [url , refetch])

    return {isLoading , error , response , onRefresh }
    
}

export default useFetch