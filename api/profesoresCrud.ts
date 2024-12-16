import { Profesor } from "@/interfaces/interfaces"

export const getAllProfesores = async(): Promise<Profesor[] | undefined> => {

    try {
        const result = await fetch('http://localhost:3000/api/profesor-profile')

        if(result.ok != true){
            throw new Error()
        }

        return result.json()
    
    } catch (error) {
        throw error        
    }

}