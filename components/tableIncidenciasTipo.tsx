"use client"
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import {
  GridRowsProp,
  GridRowModesModel,
  GridRowModes,
  DataGrid,
  GridColDef,
  GridToolbarContainer,
  GridActionsCellItem,
  GridEventListener,
  GridRowId,
  GridRowModel,
  GridRowEditStopReasons,
  GridSlotProps,
  GridLocaleText,
} from '@mui/x-data-grid';
import {
  randomCreatedDate,
  randomTraderName,
  randomId,
  randomArrayItem,
} from '@mui/x-data-grid-generator';
import { Autocomplete, TextField } from '@mui/material';
import { Alumno, Grado, IncidenciaTable, Profesor, TipoIncidencia, TipoIncidenciaTable } from '@/interfaces/interfaces';
import { deleteIncidencia, saveIncidencia } from '@/api/incidenciasCrud';
import { deleteTipoIncidencia, saveTipoIncidencia } from '@/api/tipoIncidenciasCrud';

const roles = ['Market', 'Finance', 'Development'];
const randomRole = () => {
  return randomArrayItem(roles);
};



declare module '@mui/x-data-grid' {
  interface ToolbarPropsOverrides {
    setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
    setRowModesModel: (
      newModel: (oldModel: GridRowModesModel) => GridRowModesModel,
    ) => void;
  }
}

function EditToolbar(props: GridSlotProps['toolbar']) {
  const { setRows, setRowModesModel } = props;

  const handleClick = () => {
    const id = randomId();
    setRows((oldRows) => [
      ...oldRows,
      { id, descripcion: '', grado: '',created_at: new Date(),isNew: true },
    ]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: 'name' },
    }));
  };

  return (
    <GridToolbarContainer>
      <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
        Nueva Opción
      </Button>
    </GridToolbarContainer>
  );
}



// Traducción personalizada para los operadores de filtro
const localeText: Partial<GridLocaleText> = {
  // Traducciones de los filtros
  filterOperatorContains: 'contiene',
  filterOperatorEquals: 'igual a',
  filterOperatorStartsWith: 'empieza con',
  filterOperatorEndsWith: 'termina con',
  filterOperatorIsEmpty: 'está vacío',
  filterOperatorIsNotEmpty: 'no está vacío',
  filterOperatorIsAnyOf: 'es cualquiera de',
  filterOperatorDoesNotContain: 'no contiene',
  filterOperatorDoesNotEqual: 'no es igual a',
  
  // Ordenación
  columnMenuSortAsc: 'Ordenar ASC',
  columnMenuSortDesc: 'Ordenar DESC',
  columnMenuFilter: 'Filtrar',
  columnMenuHideColumn: 'Ocultar columna',
  columnMenuManageColumns: 'Administrar columnas',
  columnMenuUnsort: "Desordenar",

  // Otros textos opcionales
  toolbarColumns: 'Columnas',
  toolbarFilters: 'Filtros',
  toolbarExport: 'Exportar',
  filterPanelInputPlaceholder: 'Introduce un valor',
  filterPanelColumns: 'Columna',
  filterPanelOperator: 'Operador',
  // filterPanelInput: 'Valor',
};

type Props = {
  TIPO_INCIDENCIAS: TipoIncidencia[]
  GRADOS: Grado[]
}

export default function FullFeaturedCrudGridTipoIncidencia({TIPO_INCIDENCIAS, GRADOS}: Props) {

  // const initialRows: GridRowsProp = [
  //   {
  //     id: randomId(),
  //     descripcion: "Mal comportamiento",
  //     grado: "Leve",
  //     created_at: new Date("2024-03-03T00:00")
  //   }
  // ];
  const initialRows: GridRowsProp = TIPO_INCIDENCIAS.map((item) => ({
    id: item.id,
    descripcion: item.descripcion,
    grado: item.grado.nombre,
    created_at: new Date(item.created_at)
  }));

  const [rows, setRows] = React.useState(initialRows);
  const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>({});
  const [loading, setLoading] = React.useState(false); 
  
  


  const handleRowEditStop: GridEventListener<'rowEditStop'> = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };
  
  const handleDeleteClick = (id: GridRowId) => () => {
    setRows(rows.filter((row) => row.id !== id));
    deleteTipoIncidencia(id.toString())
  };

  const handleCancelClick = (id: GridRowId) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow!.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const processRowUpdate = (newRow: GridRowModel) => {
    const updatedRow: GridRowModel = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    
    if(updatedRow.descripcion != "" && updatedRow.grado != ""){
      
      const TIPO_INCIDENCIA:TipoIncidenciaTable = {
        created_at: updatedRow.created_at,
        descripcion: updatedRow.descripcion,
        grado: updatedRow.grado,
        id: updatedRow.id
      }  
      saveTipoIncidencia(TIPO_INCIDENCIA, GRADOS)
      return updatedRow;
    }
    alert("Ponle un nombre al tipo de incidencia y asignale un grado")
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const columns: GridColDef[] = [
    { field: 'descripcion', headerName: 'Descripcion', width: 180, editable: true },
    {
      field: 'grado',
      headerName: 'Grado',
      width: 180,
      editable: true,
      type: 'singleSelect',
      valueOptions: GRADOS.map((item) => item.nombre)
    },
    {
      field: 'created_at',
      headerName: 'Fecha',
      type: 'date',
      width: 180,
      editable: false,
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 100,
      cellClassName: 'actions',
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              sx={{
                color: 'primary.main',
              }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  return (
    <Box
      sx={{
        height: 500,
        width: '100%',
        '& .actions': {
          color: 'text.secondary',
        },
        '& .textPrimary': {
          color: 'text.primary',
        },
      }}
    >
      <DataGrid
        rows={rows}
        columns={columns}
        editMode="row"
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        onProcessRowUpdateError={(error) => {
          console.error("Error al actualizar la fila:", error.message);
        }}
        slots={{ toolbar: EditToolbar }}
        slotProps={{
          toolbar: { setRows, setRowModesModel },
        }}
        localeText={localeText}
      />
    </Box>
  );
}
