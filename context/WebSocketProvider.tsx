'use client'

import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { WebSocketContext } from "./WebSocketContext";
import { IncidenciaEmmit } from "@/interfaces/interfaces";

export const WebSocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const socketIo: Socket = io ("http://localhost:3000")
    const [socket, setSocket] = useState<Socket | null>(null);
    const [isConnected, setIsConnected] = useState(false);

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
        setIsConnected(true);
      });
  
      // Maneja la desconexión
      socketInstance.on("disconnect", () => {
        console.log("Desconectado del servidor WebSocket");
        setIsConnected(false);
      });
  
      return () => {
        // Limpia la conexión al desmontar
        socketInstance.disconnect();
      };
    }, []);
    return (
        <WebSocketContext.Provider value={{socket, isConnected, newIncidencia}}>
            { children }
        </WebSocketContext.Provider>
    )
}