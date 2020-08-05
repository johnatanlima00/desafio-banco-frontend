import { Endereco } from './endereco.model'
import { Conta } from './conta.model'

export interface Cliente {
    id: number,
    email: string,
    nome: string,
    cpf: string,
    enderecos: Endereco[]
    contas: Conta[]
}