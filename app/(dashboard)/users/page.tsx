import Typography from '@mui/material/Typography';
import FullFeaturedCrudGrid from '@/components/tableIncidencias';
import { getAllUser } from '@/api/userCrud';
import React from 'react';
import TableUsers from '@/components/tableUsers';


export default async function Users() {

  const USUARIOS = await getAllUser()

  return (
    <>
      <TableUsers USUARIOS={USUARIOS ? USUARIOS : []}/>
    </>

  );
}
