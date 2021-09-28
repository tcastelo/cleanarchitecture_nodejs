import Pedido from "../entity/Pedido";
import RepositoryFactory from "../factory/RepositoryFactory";
import GatewayFactory from "../factory/GatewayFactory";
import ProdutoGateway from "../gateway/ProdutoGateway";
import CupomRepository from "../repository/CupomRepository";
import PedidoRepository from "../repository/PedidoRepository";
import PedidoInput from "../../application/criarPedido/PedidoInput";

export default class CriarPedidoService{
    pedidoRepository: PedidoRepository;
    cupomRepository: CupomRepository;
    produtoGateway: ProdutoGateway;

    constructor(repositoryFactory: RepositoryFactory, gatewayFactory: GatewayFactory){
        this.pedidoRepository = repositoryFactory.createPedidoRepository();
        this.cupomRepository = repositoryFactory.createCupomRepository();
        this.produtoGateway = gatewayFactory.createProdutoService();
    }

    async criarPedido(pedidoInput: PedidoInput){
        const codigoPedido = await this.pedidoRepository.total() + 1;
        const pedido = new Pedido(codigoPedido.toString(), pedidoInput.data);

        for(const itemPedido of pedidoInput.items){
            const existeProduto = await this.produtoGateway.existeProduto(itemPedido.id);
            if(!existeProduto) throw new Error("Produto com código " + itemPedido.id + " inexistente");
            
            pedido.addProduto(itemPedido.id, itemPedido.nome, itemPedido.valor, itemPedido.qtd);
        }

        if(pedidoInput.cupom){
            const cupom =  await this.cupomRepository.buscar(pedidoInput.cupom);
            if(!cupom) throw new Error("Cupom informado inválido.");
            pedido.addCupom(cupom);
        }
        
        await this.pedidoRepository.criar(pedido);
        return pedido;
    }
}