
"use client"
import { getAllAlumnos } from "@/api/alumnosCrud";
import { getAllIncidencia } from "@/api/incidenciasCrud";
import { getAllProfesores } from "@/api/profesoresCrud";
import { getAllTipoIncidencias } from "@/api/tipoIncidenciasCrud";
import FullFeaturedCrudGridIncidencia from "@/components/tableIncidencias";
import { Alumno, Incidencia, IncidenciaTable, Profesor, TipoIncidencia } from "@/interfaces/interfaces";
import { Typography } from "@mui/material";

const Incidencias = async() => {


    const INCIDENCIAS: Incidencia[] | undefined = await getAllIncidencia()
    const INCIDENCIAS_TABLE: IncidenciaTable[] | undefined = INCIDENCIAS?.map((item) => ({
        id: item.id.toString(),
        alumno: item.alumnoProfile.user.profile.fullName,
        creador: item.user.profile?.fullName,
        descripcion: item.descripcion,
        tipoIncidencia: item.tipoIncidencia?.descripcion,
        created_at: new Date(item.created_at)
    }) )

    const TIPO_INCIDENCIAS: TipoIncidencia[]|undefined = await getAllTipoIncidencias()
    const ALUMNOS: Alumno[] | undefined = await getAllAlumnos()
    const PROFESORES: Profesor[] | undefined = await getAllProfesores()
    
    return ( 
        <>
            <FullFeaturedCrudGridIncidencia  
            INCIDENCIAS={INCIDENCIAS_TABLE ? INCIDENCIAS_TABLE : []} 
            TIPO_INCIDENCIAS={TIPO_INCIDENCIAS ? TIPO_INCIDENCIAS : []}
            ALUMNOS={ALUMNOS ? ALUMNOS : []}
            PROFESORES={PROFESORES ? PROFESORES : []}
            />
        </>
     );
}
 
export default Incidencias;