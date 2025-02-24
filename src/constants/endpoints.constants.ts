export const endpoints = {
    etudiants : {
        LIST : "/api/v1/etudiants",
        ADD : "/api/v1/etudiant",
        DETAIL : (id : number)=> `/api/v1/etudiant/${id}`,
        UPDATE : (id : number)=>  `/api/v1/etudiant/${id}`,
        DELETE : (id : number)=>  `/api/v1/etudiant/${id}`
    },
    professeurs : {
        LIST : "/professeur_ms/api/v1/professeurs",
        ADD : "/professeur_ms/api/v1/professeur",
        DETAIL : (id : string)=> `/professeur_ms/api/v1/professeur/${id}`,
        UPDATE : (id : string)=> `/professeur_ms/api/v1/professeur/${id}`,
        DELETE : (id : string)=> `/professeur_ms/api/v1/professeur/${id}`
    }
}