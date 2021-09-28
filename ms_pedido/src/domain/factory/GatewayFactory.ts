import ProdutoGateway from "../gateway/ProdutoGateway";

export default interface GatewayFactory{
    createProdutoService(): ProdutoGateway;
}