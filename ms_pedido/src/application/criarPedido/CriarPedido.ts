import GatewayFactory from "../../domain/factory/GatewayFactory";
import RepositoryFactory from "../../domain/factory/RepositoryFactory";
import CriarPedidoService from "../../domain/service/CriarPedidoService";
import PedidoInput from "./PedidoInput";
import PedidoOutput from "./PedidoOutput";

export default class CriarPedido{

    repositoryFactory: RepositoryFactory;
    gatewayFactory: GatewayFactory;

    constructor(repositoryFactory: RepositoryFactory, gatewayFactory: GatewayFactory){
        this.repositoryFactory = repositoryFactory;
        this.gatewayFactory = gatewayFactory;
    }

    async criar(pedidoInput: PedidoInput): Promise<PedidoOutput>{
        const pedidoService = new CriarPedidoService(this.repositoryFactory, this.gatewayFactory);
        const pedido = await pedidoService.criarPedido(pedidoInput);

        return new PedidoOutput(pedido.codigo, pedido.getTotal());
    }
}