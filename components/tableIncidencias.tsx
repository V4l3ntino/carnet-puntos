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
import { Alumno, IncidenciaEmmit, IncidenciaTable, Profesor, TipoIncidencia } from '@/interfaces/interfaces';
// import { deleteIncidencia, saveIncidencia } from '@/api/incidenciasCrud';
import { useWebSocket } from '@/context/WebSocketContext';

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
      { id, descripcion: '', creador: '', alumno: '', tipoIncidencia: '', created_at: new Date(),isNew: true },
    ]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: 'name' },
    }));
  };

  return (
    <GridToolbarContainer>
      <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
        Nueva incidencia
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
  INCIDENCIAS: IncidenciaTable[]
  TIPO_INCIDENCIAS: TipoIncidencia[]
  ALUMNOS: Alumno[]
  PROFESORES: Profesor[]
}

export default function FullFeaturedCrudGridIncidencia({INCIDENCIAS, TIPO_INCIDENCIAS, ALUMNOS, PROFESORES}: Props) {

  const [incidenciasTable, setIncidenciasTable] = React.useState<IncidenciaTable[]>(INCIDENCIAS)
  // const initialRows: GridRowsProp = [
  //   {
  //     id: randomId(),
  //     descripcion: "El alumno se porta mal",
  //     creador: "Paco",
  //     alumno: "Jimenez",
  //     tipoIncidencia: "Mal comportamiento"
  //   }
  // ];
  const {newIncidencia, incidenciaOne, deleteIncidencia, incidenciaId} = useWebSocket()

  React.useEffect(() => {
    // const INCIDENCIAS_TABLE: IncidenciaTable[] | undefined = incidencias?.map((item) => ({
    //   id: item.id.toString(),
    //   alumno: item.alumnoProfile.user.profile.fullName,
    //   creador: item.user.profile?.fullName,
    //   descripcion: item.descripcion,
    //   tipoIncidencia: item.tipoIncidencia?.descripcion,
    //   created_at: new Date(item.created_at)
    // }) )
    // setRows(INCIDENCIAS_TABLE);
    try {
          
      if(typeof incidenciaOne !== "undefined"){
        const incidenciaOneTable = {
          id: incidenciaOne?.id.toString(),
          alumno: incidenciaOne?.alumnoProfile.user.profile.fullName,
          creador: incidenciaOne?.user.profile.fullName,
          descripcion: incidenciaOne?.descripcion,
          tipoIncidencia: incidenciaOne?.tipoIncidencia.descripcion,
          created_at: new Date(incidenciaOne?.created_at)
        }
        const lista = [...rows]
        let isNew = true
        lista.forEach((item) => {
          if(item.id == incidenciaOneTable.id){
            item.alumno = incidenciaOneTable.alumno
            item.creador = incidenciaOneTable.creador
            item.descripcion = incidenciaOneTable.descripcion
            item.tipoIncidencia = incidenciaOneTable.tipoIncidencia
            isNew = false
          }
        })
        if(isNew){
          lista.push(incidenciaOneTable)
        }
        setRows(lista)
      }

    } catch (error) {
      throw error    
    }
  },[incidenciaOne])

  React.useEffect(() => {
    if(incidenciaId !== ""){
      const lista = rows.filter((item) => item.id !== incidenciaId)
      setRows(lista)
    }
  },[incidenciaId])

//   const {incidencias} = useWebSocket()

//   const INCIDENCIAS_TABLE: IncidenciaTable[] | undefined = incidencias?.map((item) => ({
//     id: item.id.toString(),
//     alumno: item.alumnoProfile.user.profile.fullName,
//     creador: item.user.profile?.fullName,
//     descripcion: item.descripcion,
//     tipoIncidencia: item.tipoIncidencia?.descripcion,
//     created_at: new Date(item.created_at)
// }) )
//   console.log(INCIDENCIAS_TABLE)
    

  const initialRows: GridRowsProp = [...incidenciasTable];

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
    deleteIncidencia(id.toString())
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
    
    if(updatedRow.creador != "" && updatedRow.alumno != "" && updatedRow.tipoIncidencia != "" ){
      //   saveIncidencia({
      //     id: updatedRow.id,
      //     descripcion: updatedRow.descripcion,
      //     created_at: updatedRow.created_at,
      //     creador: updatedRow.creador,
      //     alumno: updatedRow.alumno,
      //     tipoIncidencia: updatedRow.tipoIncidencia
      // }, PROFESORES, ALUMNOS, TIPO_INCIDENCIAS)
        try {
            const CREADOR: Profesor | undefined = PROFESORES.find((item) => item.user.profile.fullName == updatedRow.creador)
            const ALUMNO: Alumno | undefined = ALUMNOS.find((item) => item.user.profile.fullName == updatedRow.alumno)
            const TIPO_INCIDENCIA: TipoIncidencia | undefined = TIPO_INCIDENCIAS.find((item) => item.descripcion == updatedRow.tipoIncidencia)
    
            const INCIDENCIA: IncidenciaEmmit = {
                user_id: CREADOR!.user.id,
                id: updatedRow.id,
                alumno_id: ALUMNO!.idea,
                descripcion: updatedRow.descripcion,
                tipoIncidencia: TIPO_INCIDENCIA!.id.toString(),
            }    
            newIncidencia(INCIDENCIA)

        } catch (error) {
            throw Error()
        }
      
      return updatedRow;
    }
    alert("La incidencia no se ha guardado porque falta por completar el creador y el alumno")
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const columns: GridColDef[] = [
    { field: 'descripcion', headerName: 'Descripcion', width: 180, editable: true },
    {
      field: 'creador',
      headerName: 'Creador',
      width: 180,
      align: 'left',
      headerAlign: 'left',
      editable: true,
      renderEditCell: (params) => {
        return (
          <Autocomplete
            value={params.value || ''}
            onChange={(event, newValue: string | null) => {
              const updatedValue = { 
                value: newValue,
                id: params.id,   // id de la fila
                field: params.field // campo editado
              };
              params.api.setEditCellValue(updatedValue);
              
            }}
            options={PROFESORES.map((item) => (item.user.profile.fullName))}
            getOptionLabel={(option) => option} // Mostrar texto de las opciones
            renderInput={(params) => <TextField {...params} style={{width: "180px"}} />}
          />
          )
      }
    },
    {
      field: 'alumno',
      headerName: 'Alumno',
      width: 180,
      editable: true,
      renderEditCell: (params) => {
        return (
          <Autocomplete
            value={params.value || ''}
            onChange={(event, newValue: string | null) => {
              const updatedValue = { 
                value: newValue,
                id: params.id,   // id de la fila
                field: params.field // campo editado
              };
              params.api.setEditCellValue(updatedValue);
              
            }}
            options={ALUMNOS.map((item) => (item.user.profile.fullName))}
            getOptionLabel={(option) => option} // Mostrar texto de las opciones
            renderInput={(params) => <TextField {...params} style={{width: "180px"}} />}
          />
          )
      }
    },
    {
      field: 'tipoIncidencia',
      headerName: 'Tipo Incidencia',
      width: 220,
      editable: true,
      type: 'singleSelect',
      valueOptions: TIPO_INCIDENCIAS.map((item) => (item.descripcion)),
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
        slots={{ toolbar: EditToolbar }}
        slotProps={{
          toolbar: { setRows, setRowModesModel },
        }}
        localeText={localeText}
      />
    </Box>
  );
}
