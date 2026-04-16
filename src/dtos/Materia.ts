export interface Materia {
    id:string,
    nombre:string,
    codigo:string,
    creditos:number
}

export interface MateriaRequest {
    nombre:string,
    codigo:string,
    creditos:number
}