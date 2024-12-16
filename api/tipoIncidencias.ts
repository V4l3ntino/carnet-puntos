import { TipoIncidencia } from "@/interfaces/interfaces"

export const getAllTipoIncidencias = async(): Promise<TipoIncidencia[] | undefined> => {

    try {
        const result = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/tipo-incidencia`)

        if(result.ok != true){
            throw new Error()
        }

        return result.json()
    
    } catch (error) {
        throw error        
    }

}