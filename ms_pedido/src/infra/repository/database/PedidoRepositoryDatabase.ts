import Cupom from "../../../domain/entity/Cupom";
import Pedido from "../../../domain/entity/Pedido";
import PedidoRepository from "../../../domain/repository/PedidoRepository";
import Database from "../../database/Database";

export default class PedidoRepositoryDatabase implements PedidoRepository{

    database: Database;

    constructor(database:Database){
        this.database = database;
    }
        
    async criar(pedido: Pedido): Promise<void> {
        const pedidoResult = await this.database.one('insert into pedido (codigo, data, cupom) values ($1, $2, $3) returning *',[pedido.codigo, pedido.data, pedido.cupom?.codigo]);
        for(const item of pedido.items){
            await this.database.one('insert into pedidoItem (pedido_id, produto_id, produto_nome, produto_valor, quantidade) values ($1, $2, $3, $4, $5) returning *',[pedido.codigo, item.produto_id, item.produto_nome, item.produto_valor, item.quantidade]);
        }
        return;
    }

    async buscar(codigo: string): Promise<Pedido> {
        const pedidoResult = await this.database.one("select * from pedido where codigo = $1", [codigo]);
        if(!pedidoResult) throw new Error("Pedido com codigo " + codigo + " não encontrado.");
        const pedido = new Pedido(pedidoResult.codigo, new Date(pedidoResult.data));
        
        const pedidoItensResult = await this.database.many("select * from pedidoItem where pedido_id = $1", [pedidoResult.id]);
        for(const pedidoItem of pedidoItensResult){
            pedido.addProduto(pedidoItem.produto_id, pedidoItem.produto_nome, pedidoItem.produto_valor, pedidoItem.quantidade);
        }

        if(pedido.cupom){
            const cupomResult = await this.database.one("select * from cupom where codigo = $1",[pedido.cupom]);
            pedido.addCupom(new Cupom(cupomResult.codigo, new Date(cupomResult.validade), cupomResult.percentual_desconto));
        }

        return pedido;
    }

    async buscarTodos(): Promise<Pedido[]> {
        const pedidoResult = await this.database.many("select * from pedido",[]);

        const pedidos: Pedido[] = [];

        for(const pedidoItem of pedidoResult){
            const pedido = new Pedido(pedidoItem.codigo, new Date(pedidoItem.data));

            const pedidoItensResult = await this.database.many("select * from pedidoItem where pedido_id = $1", [pedidoItem.codigo]);
            for(const item of pedidoItensResult){
                pedido.addProduto(item.produto_id, item.produto_nome, item.produto_valor, item.quantidade);
            }

            if(pedidoItem.cupom){
                const cupom = await this.database.one("select * from cupom where cupom.codigo = $1",[pedidoItem.cupom]);

                pedido.addCupom(new Cupom(cupom.codigo, cupom.data_validade, cupom.percentual_desconto));
            }

            pedidos.push(pedido)
        }
        
        return pedidos;
    }

    async total(): Promise<number> {
        const countData = await this.database.one("select count(*)::int as count from pedido", []);
        return countData.count;
    }

}