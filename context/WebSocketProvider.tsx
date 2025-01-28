'use client'

import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { WebSocketContext } from "./WebSocketContext";
import { Alumno, Incidencia, IncidenciaEmmit, Profesor, TipoIncidencia } from "@/interfaces/interfaces";

export const WebSocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const socketIo: Socket = io ("http://localhost:3000")
    const [socket, setSocket] = useState<Socket | null>(null);
    const [isConnected, setIsConnected] = useState(false);
    const [incidencias, setIncidencias] = useState<Incidencia[]>([])  
    const [tipo_incidencias, setTipo_incidencias] = useState<TipoIncidencia[]>([])  
    const [alumnos, setAlumnos] = useState<Alumno[]>([])
    const [profesores, setProfesores] = useState<Profesor[]>([])
    const [incidenciaOne, setIncidenciaOne] = useState<Incidencia>()

    const newIncidencia = (data: IncidenciaEmmit) => {
        if (socket) {
          socket.emit("newIncidencia", data); // Usa la instancia de `socket` controlada por el estado
        } else {
          console.error("Socket no está conectado. No se puede emitir la incidencia.");
        }
      };
  
    useEffect(() => {
      // Conecta al servidor WebSocket
      const socketInstance = io("http://localhost:3000"); // Cambia por tu URL de WebSocket
  
      setSocket(socketInstance);
  
      // Maneja la conexión
      socketInstance.on("connect", () => {
        console.log("Conectado al servidor WebSocket");
        socketInstance.emit('getIncidencias');
        socketInstance.emit('getProfesores');
        socketInstance.emit('getTipoIncidencias');
        socketInstance.emit('getAlumnos');
        setIsConnected(true);
      });
  
      // Maneja la desconexión
      socketInstance.on("disconnect", () => {
        console.log("Desconectado del servidor WebSocket");
        setIsConnected(false);
      });

      socketInstance.on("incidenciasList", (data:Incidencia[]) => {
        setIncidencias(prevState => [...data])  
      })

      socketInstance.on("profesoresList", (data:Profesor[]) => {
        setProfesores(data)
      })

      socketInstance.on("alumnosList", (data:Alumno[]) => {
        setAlumnos(data)
      })

      socketInstance.on("tipoInciddenciasList", (data:TipoIncidencia[]) => {
        setTipo_incidencias(data)
      })

      socketInstance.on("incidencia", (data:Incidencia) => {
        setIncidenciaOne(data)
      })
  
      return () => {
        // Limpia la conexión al desmontar
        socketInstance.disconnect();
      };
    }, []);
    return (
        <WebSocketContext.Provider value={{socket, isConnected, newIncidencia, incidencias, alumnos, profesores, tipo_incidencias, incidenciaOne}}>
            { children }
        </WebSocketContext.Provider>
    )
}