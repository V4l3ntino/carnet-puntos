"use client"

import { User } from "@/interfaces/interfaces";
import { Input } from "@mui/material";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

type Props = {
    USUARIOS: User[]
}
const TableUsers: React.FC<Props> = ({USUARIOS}) => {
    const router = useRouter();
    const [listaUsuarios, setListaUsuarios] = useState(USUARIOS)

    const searchFilter = (value: string) => {
        value = value.toLowerCase()
        
        const lista = listaUsuarios.filter((item) => {
            return item.id?.toLowerCase().indexOf(
                value.toString()
            ) !== -1 || item.username?.toLowerCase().indexOf(
                value.toString()
            ) !== -1 || item.profile.fullName?.toLowerCase().indexOf(
                value.toString()
            ) !== -1 || item.profile.email?.toLowerCase().indexOf(
                value.toString()
            ) !== -1 
        })

        lista.length > 0 && value.length > 0 ? setListaUsuarios(lista) : setListaUsuarios(USUARIOS)
    }
    return ( 
        <>
            <Input type="search" placeholder="Buscar..." onChange={(e) => {searchFilter(e.target.value)}}/>
            <div className="w-full  flex flex-wrap xl:flex-col xl:gap-0 gap-3  max-w-[1488px]">
                <div className="w-full xl:flex justify-between border-b-2 p-10  hidden ">
                <strong className="w-[200px] text-center">Id</strong>
                <strong className="w-[300px] text-center">Username</strong>
                <strong className="w-[100px] text-center">FullName</strong>
                <strong className="w-[300px] text-center">Email</strong>
                </div>

                {
                    listaUsuarios?.map((item, key) => (
                        <React.Fragment key={key}>
                            <div
                            className="w-full xl:flex justify-between p-10 hover:bg-slate-100 border  hidden hover:cursor-pointer" onClick={() => {router.push(`${process.env.NEXT_PUBLIC_FRONTEND_URL}/users/${item.id}`)}} >
                                <span className="w-[200px] text-center border-r-orange-200">{item.id}</span>
                                <span className="w-[300px] text-center px-5">{item.username}</span>
                                <span className="w-[100px] text-center">{item.profile.fullName}</span>
                                <span className="w-[300px] text-center">{item.profile.email}</span>
                            </div>
                            <div
                            className="w-full xl:hidden  p-5 hover:bg-slate-100 border rounded-md flex flex-col gap-3 hover:cursor-pointer" onClick={() => {router.push(`${process.env.NEXT_PUBLIC_FRONTEND_URL}/users/${item.id}`)}} >
                                <span className="text-left w-full flex sm:flex-row flex-col sm:gap-2"><strong>Id:</strong>  {item.id}</span>
                                <span className="text-left w-full flex sm:flex-row flex-col sm:gap-2"><strong>Username:</strong>  {item.username}</span>
                                <span className="text-left w-full flex sm:flex-row flex-col sm:gap-2"><strong>FullName:</strong>  {item.profile.fullName}</span>
                                <span className="text-left w-full flex sm:flex-row flex-col sm:gap-2"><strong>Email:</strong>  {item.profile.email}</span>
                            </div>
                        </React.Fragment>
                    ))
                }
                
            </div>

        </>
     );
}
 
export default TableUsers;