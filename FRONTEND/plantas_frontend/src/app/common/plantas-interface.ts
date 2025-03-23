export interface PlantasInterface {
  id: number
  nombre: string
  fechaAdquisicion: number[]
  ultimoRiego: number[]
  proximoRiego: number[]
  fechaPoda: number[]
  ubicacion: string
  tipoPlanta: string
  notas: string
}

export type Plantas = PlantasInterface[];
