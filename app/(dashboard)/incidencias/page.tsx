
"use client"
import { getAllAlumnos } from "@/api/alumnosCrud";
import { getAllIncidencia } from "@/api/incidenciasCrud";
import { getAllProfesores } from "@/api/profesoresCrud";
import { getAllTipoIncidencias } from "@/api/tipoIncidenciasCrud";
import FullFeaturedCrudGridIncidencia from "@/components/tableIncidencias";
import { useWebSocket } from "@/context/WebSocketContext";
import { Alumno, Incidencia, IncidenciaTable, Profesor, TipoIncidencia } from "@/interfaces/interfaces";
import { Typography } from "@mui/material";

const Incidencias = () => {
    const {incidencias, alumnos, profesores, tipo_incidencias} = useWebSocket()
    

    const INCIDENCIAS_TABLE: IncidenciaTable[] | undefined = incidencias?.map((item) => ({
        id: item.id.toString(),
        alumno: item.alumnoProfile.user.profile.fullName,
        creador: item.user.profile?.fullName,
        descripcion: item.descripcion,
        tipoIncidencia: item.tipoIncidencia?.descripcion,
        created_at: new Date(item.created_at)
    }) )

    const TIPO_INCIDENCIAS: TipoIncidencia[]|undefined = tipo_incidencias
    const ALUMNOS: Alumno[] | undefined = alumnos
    const PROFESORES: Profesor[] | undefined = profesores
    
    return ( 
        <>
            {/* Condición para asegurar que INCIDENCIAS_TABLE tiene datos */}
            {INCIDENCIAS_TABLE.length > 0 && ALUMNOS.length > 0 && TIPO_INCIDENCIAS.length > 0 && PROFESORES.length > 0 || INCIDENCIAS_TABLE.length == 0 ? (
                <FullFeaturedCrudGridIncidencia
                    INCIDENCIAS={INCIDENCIAS_TABLE}
                    TIPO_INCIDENCIAS={TIPO_INCIDENCIAS ? TIPO_INCIDENCIAS : []}
                    ALUMNOS={ALUMNOS ? ALUMNOS : []}
                    PROFESORES={PROFESORES ? PROFESORES : []}
                />
            ) : (
                <Typography>Renderizando...</Typography>
            )}
        </>
     );
}
 
export default Incidencias;