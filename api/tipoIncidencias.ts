import { TipoIncidencia } from "@/interfaces/interfaces"

export const getAllTipoIncidencias = async(): Promise<TipoIncidencia[] | undefined> => {

    try {
        const result = await fetch('http://localhost:3000/api/tipo-incidencia')

        if(result.ok != true){
            throw new Error()
        }

        return result.json()
    
    } catch (error) {
        throw error        
    }

}