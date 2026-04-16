export interface NotaRequest {
    alumnoId: string;
    materiaId: string;
    valor: number;
}

export interface NotaResponse {
    notaId:string,
    valor:number,
    nombreMateria:string,
    codigoMateria:string,
    nombreAlumno:string,
    fechaRegistro:string
}