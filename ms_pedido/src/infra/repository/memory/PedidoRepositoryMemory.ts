import Pedido from "../../../domain/entity/Pedido";
import PedidoRepository from "../../../domain/repository/PedidoRepository";

export default class PedidoRepositoryMemory implements PedidoRepository {
    pedidos: Pedido[];
    static instance: PedidoRepositoryMemory;
    
    private constructor () {
        this.pedidos = [];
    }

    static getInstance () {
        if (!PedidoRepositoryMemory.instance) {
            PedidoRepositoryMemory.instance = new PedidoRepositoryMemory();
        }
        return PedidoRepositoryMemory.instance;
    }

    async buscar(codigo: string): Promise<Pedido> {
        const pedido = this.pedidos.find(pedido => pedido.codigo === codigo);
        if (!pedido) throw new Error("Pedido não encontrado com o código informado");
        return Promise.resolve(pedido);
    }

    buscarTodos(): Promise<Pedido[]> {
        return Promise.resolve(this.pedidos);
    }

    async criar(pedido: Pedido): Promise<void> {
        this.pedidos.push(pedido);
    }

    async total(): Promise<number> {
        return Promise.resolve(this.pedidos.length);
    }
}