import { Alumno } from "@/interfaces/interfaces"

export const getAllAlumnos = async(): Promise<Alumno[] | undefined> => {

    try {
        const result = await fetch('http://localhost:3000/api/alumno-profile')

        if(result.ok != true){
            throw new Error()
        }

        return result.json()
    
    } catch (error) {
        throw error        
    }

}