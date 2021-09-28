import Pedido from "../entity/Pedido"

export default interface PedidoRepository{
    criar(pedido: Pedido) : Promise<void>;
    buscar(codigo: string) : Promise<Pedido>;
    buscarTodos() : Promise<Pedido[]>;
    total(): Promise<number>;
}