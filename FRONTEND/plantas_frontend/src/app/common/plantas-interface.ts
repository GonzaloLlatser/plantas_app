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
}

export type Plantas = PlantasInterface[];
