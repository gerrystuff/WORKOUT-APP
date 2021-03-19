import { Exercise } from "./Exercise";

export interface Serie{
    id:number,
    name:string,
    info:string,
    secuence:string,
    difficulty:string,
    recordtime:string,
    exercises:Exercise[]

}