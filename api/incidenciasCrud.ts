import { Alumno, Incidencia, IncidenciaTable, Profesor, TipoIncidencia, User } from "@/interfaces/interfaces"

export const saveIncidencia = async(incidencia: IncidenciaTable, creadores: Profesor[], alumnos: Alumno[], tipoIncidencias: TipoIncidencia[]):Promise<void> => {
    try {
        const CREADOR: Profesor | undefined = creadores.find((item) => item.user.profile.fullName == incidencia.creador)
    const ALUMNO: Alumno | undefined = alumnos.find((item) => item.user.profile.fullName == incidencia.alumno)
    const TIPO_INCIDENCIA: TipoIncidencia | undefined = tipoIncidencias.find((item) => item.descripcion == incidencia.tipoIncidencia)

    const INCIDENCIA = {
        user_id: CREADOR!.user.id,
        id: incidencia.id,
        alumno_id: ALUMNO!.idea,
        descripcion: incidencia.descripcion,
        tipoIncidencia: TIPO_INCIDENCIA!.id.toString(),
    }

    const result = await fetch('http://localhost:3000/api/incidencia', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(INCIDENCIA)
    })

    if(!result.ok){
        const response = await result.json()
     alert(`${response.message}`)
    }

    
    } catch (error) {
        
    }
}

export const deleteIncidencia = ():void => {

}

export const getAllIncidencia = async(): Promise<Incidencia[] | undefined> => {

    try {
        const result = await fetch('http://localhost:3000/api/incidencia')

        if(result.ok != true){
            throw new Error()
        }

        return result.json()
    
    } catch (error) {
        throw error        
    }

}
