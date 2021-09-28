import Cupom from "../../../domain/entity/Cupom";
import CupomRepository from "../../../domain/repository/CupomRepository";
import Database from "../../database/Database";

export default class CupomRepositoryDatabase implements CupomRepository{

    database: Database;

    constructor(database:Database){
        this.database = database;
    }
        
    async criar(cupom: Cupom): Promise<void> {
        const pedidoResult = await this.database.one('insert into cupom (codigo, data_validade, percentual_desconto) values ($1, $2, $3) returning *',[cupom.codigo, cupom.data_validade, cupom.percentual_desconto]);
        return null;
    }

    async buscar(codigo: string): Promise<Cupom> {
        const cupomResult = await this.database.one("select * from cupom where codigo = $1", [codigo]);
        if(!cupomResult) throw new Error("Cupom com codigo " + codigo + " não encontrado.");
        const cupom = new Cupom(cupomResult.codigo, new Date(cupomResult.data_validade), cupomResult.percentual_desconto);
        return cupom;
    }

    async buscarTodos(): Promise<Cupom[]> {
        const cupomResult = await this.database.many("select * from cupom",[]);

        const cupoms: Cupom[] = [];

        for(const cupomItem of cupomResult){
            const pedido = new Cupom(cupomItem.codigo, cupomItem.data_validade, cupomItem.percentual_desconto);
            cupoms.push(pedido)
        }
        
        return cupoms;
    }

    async total(): Promise<number> {
        const countData = await this.database.one("select count(*)::int as count from cupom", []);
        return countData.count;
    }

}