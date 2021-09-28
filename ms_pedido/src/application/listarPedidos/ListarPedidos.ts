import RepositoryFactory from "../../domain/factory/RepositoryFactory";
import PedidoRepository from "../../domain/repository/PedidoRepository";
import PedidoItemOutput from "./PedidoItemOutput";
import PedidoOutput from "./PedidoOutput";

export default class ListarPedidos{
    pedidoRepository: PedidoRepository;

    constructor(repositoryFactory: RepositoryFactory){
        this.pedidoRepository = repositoryFactory.createPedidoRepository();
    }

    async listar(): Promise<PedidoOutput[]>{
        const lista = [];

        const pedidos = await this.pedidoRepository.buscarTodos();
        for(const pedidoItem of pedidos){

            const listaItems = [];

            for(const item of pedidoItem.items){
                listaItems.push(new PedidoItemOutput(item.produto_id,item.produto_nome, item.produto_valor, item.quantidade));
            }

            const pedidoOutput = new PedidoOutput(pedidoItem.codigo, pedidoItem.data, pedidoItem.cupom?.codigo, pedidoItem.getTotal(), listaItems);
            lista.push(pedidoOutput);
        }

        return lista;
    }
}