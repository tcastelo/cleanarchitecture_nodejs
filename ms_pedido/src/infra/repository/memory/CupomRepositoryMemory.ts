import Cupom from "../../../domain/entity/Cupom";
import CupomRepository from "../../../domain/repository/CupomRepository";

export default class CupomRepositoryMemory implements CupomRepository {
    cupons: Cupom[] = [
        new Cupom("001", new Date("2022-9-12"), 5),
        new Cupom("002", new Date("2021-9-1"), 15),
        new Cupom("003", new Date("2021-9-18"),25)
    ];
    static instance: CupomRepositoryMemory;
    
    private constructor () {}

    static getInstance () {
        if (!CupomRepositoryMemory.instance) {
            CupomRepositoryMemory.instance = new CupomRepositoryMemory();
        }
        return CupomRepositoryMemory.instance;
    }

    async buscar(codigo: string): Promise<Cupom> {
        const cupom = this.cupons.find(cupom => cupom.codigo === codigo);
        return Promise.resolve(cupom);
    }

    async buscarTodos(): Promise<Cupom[]> {
        return Promise.resolve(this.cupons);
    }

    async criar(cupom: Cupom): Promise<void> {
        this.cupons.push(cupom);
    }

    async total(): Promise<number> {
        return Promise.resolve(this.cupons.length);
    }
}