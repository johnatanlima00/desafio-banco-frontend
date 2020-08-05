import { Cidade } from './cidade.model'

export interface Endereco {
    id: number,
    logradouro: string,
    numero: number,
    bairro: string,
    cep: string,
    cidade: Cidade
}