"use client"
import { Alumno, Incidencia, IncidenciaEmmit, Profesor, TipoIncidencia } from '@/interfaces/interfaces';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { io, Socket } from "socket.io-client";

// Define el tipo del contexto
interface WebSocketContextType {
  socket: Socket | null;
  isConnected: boolean;
  newIncidencia: (data:IncidenciaEmmit) => void;
  deleteIncidencia: (id: string) => void;
  incidencias: Incidencia[]
  tipo_incidencias: TipoIncidencia[]
  alumnos: Alumno[]
  profesores: Profesor[]
  incidenciaOne: Incidencia | undefined
  incidenciaId: string
}

export const WebSocketContext = createContext<WebSocketContextType | undefined>(undefined);

export const useWebSocket = () => {
    const context = useContext(WebSocketContext);
    if (!context) {
      throw new Error("useWebSocket debe usarse dentro de un WebSocketProvider");
    }
    return context;
  };
  