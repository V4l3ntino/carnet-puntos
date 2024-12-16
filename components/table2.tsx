import * as React from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';

// Definir el tipo de incidencia
interface Incidencia {
  id: string;
  user_id: string;
  alumno_id: string;
  descripcion: string;
  tipoIncidencia: string;
}

const VISIBLE_FIELDS = ['user_id', 'id', 'alumno_id', 'descripcion', 'tipoIncidencia'];

// Generación de datos de incidencias
const generateIncidencias = (num = 100): Incidencia[] => {
  return Array.from({ length: num }, (_, index) => ({
    id: (index + 1).toString(),
    user_id: `user-${index + 1}`,
    alumno_id: `alumno-${Math.floor(Math.random() * 1000)}`,
    descripcion: `Descripción de la incidencia ${index + 1}`,
    tipoIncidencia: Math.random() > 0.5 ? '1' : '2',
  }));
};

export default function IncidenciasDataGrid() {
  // Especificamos el tipo de estado como un arreglo de Incidencia
  const [data, setData] = React.useState<Incidencia[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);

  // Simula la carga de datos
  React.useEffect(() => {
    setTimeout(() => {
      setData(generateIncidencias(100)); // Genera 100 incidencias
      setLoading(false); // Actualiza el estado de carga
    }, 2000); // Simula un tiempo de carga de 2 segundos
  }, []);

  // Función para agregar una nueva fila (incidencia)
  const addRow = () => {
    const newIncidencia: Incidencia = {
      id: (data.length + 1).toString(),
      user_id: `user-${data.length + 1}`,
      alumno_id: `alumno-${Math.floor(Math.random() * 1000)}`,
      descripcion: 'Nueva incidencia',
      tipoIncidencia: Math.random() > 0.5 ? '1' : '2',
    };
    setData([...data, newIncidencia]); // Agrega la nueva incidencia al arreglo
  };

  // Función para actualizar un registro de la tabla
  const handleProcessRowUpdate = (newRow: Incidencia) => {
    const updatedRows = data.map(row =>
      row.id === newRow.id ? { ...row, ...newRow } : row
    );
    setData(updatedRows); // Actualiza el estado con los registros modificados
    return newRow; // Devuelve el nuevo registro actualizado
  };

  return (
    <div style={{ height: 400, width: '100%' }}>
      <button onClick={addRow} style={{ marginBottom: 20 }}>
        Add Row
      </button>
      <DataGrid
        rows={data}
        columns={VISIBLE_FIELDS.map(field => ({
          field,
          headerName: field.replace(/_/g, ' ').toUpperCase(),
          width: 200,
          editable: true, // Hace que las celdas sean editables
        }))}
        loading={loading}
        processRowUpdate={handleProcessRowUpdate} // Permite la actualización de filas
        slots={{ toolbar: GridToolbar }}
      />
    </div>
  );
}
