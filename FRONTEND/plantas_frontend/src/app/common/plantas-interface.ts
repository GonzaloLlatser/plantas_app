export interface PlantasInterface {
  id: number
  nombre: string
  fechaAdquisicion: { year: number, month: number, day: number };
  fechaUltimoRiego: { year: number, month: number, day: number };
  fechaProximoRiego: { year: number, month: number, day: number };
  fechaPoda: { year: number, month: number, day: number };
  ubicacion: string
  tipoPlanta: string
  notas: string
  usuario?: { id: number }
}

export interface RespuestaInterface {
  success: boolean
  planta: PlantasInterface
}

export interface PlantasInterfaceByBackend {
  id: number;
  nombre: string;
  fechaAdquisicion: number[];
  fechaUltimoRiego: number[];
  fechaProximoRiego: number[];
  fechaPoda: number[];
  ubicacion: string;
  tipoPlanta: string;
  notas: string;
  usuario?: { id: number };
}


