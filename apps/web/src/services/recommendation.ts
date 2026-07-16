import api from "./api";


export async function getRecommendations(

studentId:number

){

const response = await api.get(

`/recommendations/${studentId}`

);


return response.data;

}