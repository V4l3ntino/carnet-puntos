import { getAllGrados } from "@/api/gradosCrud";
import { getAllTipoIncidencias } from "@/api/tipoIncidenciasCrud";
import FullFeaturedCrudGridTipoIncidencia from "@/components/tableIncidenciasTipo";
import { Grado, TipoIncidencia } from "@/interfaces/interfaces";

const IncidenciasTipo = async() => {

    const TIPO_INCIDENCIAS: TipoIncidencia[]|undefined = await getAllTipoIncidencias()
    const GRADOS: Grado[]|undefined = await getAllGrados()

    return ( 
        <>
           <FullFeaturedCrudGridTipoIncidencia GRADOS={GRADOS ? GRADOS : []} TIPO_INCIDENCIAS={TIPO_INCIDENCIAS ? TIPO_INCIDENCIAS : []}/> 
        </>
     );
}
 
export default IncidenciasTipo;