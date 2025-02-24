import { endpoints } from '@/constants/endpoints.constants';
import { Professeur } from '@/interfaces/interfaces';
import useFetch from '@/utils/hooks/useFetch';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'

function ProfesseurDetails() {
    const params = useParams();
    const {response , isLoading } = useFetch(endpoints.professeurs.DETAIL(params.id as string));
    const [record , setRecord] = useState<Professeur>();
    useEffect(() => {
      if (response) {
        setRecord(response.data);
      }
    }, [response])
    
    return (
      <div className='bg-white rounded-lg  dark:bg-sideBarBgColorDark dark:text-white p-4' >
        {isLoading ? "Loading" : 
          <div className='space-y-2' >
            <p>ID : {record?.id}</p>
            <p>Nom de famille : {record?.lastName}</p>
            <p>Prénoms : {record?.firstName}</p>
            <p>Email : {record?.email}</p>
            <p> Genre : {record?.phone}</p>
          </div>
        }
      </div>
    )
}

export default ProfesseurDetails