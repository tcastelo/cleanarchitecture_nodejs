import Cupom from "../entity/Cupom"

export default interface CupomRepository{
    criar(cupom: Cupom) : Promise<void>;
    buscar(code: string) : Promise<Cupom>;
    buscarTodos() : Promise<Cupom[]>;
    total(): Promise<number>;
}