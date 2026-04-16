export interface Alumno {
    id:string,
    nombre:string,
    apellido:string,
    email:string,
    fechaNacimiento:string
}

export interface AlumnoRequest {
    nombre:string,
    apellido:string,
    email:string,
    fechaNacimiento:string
}