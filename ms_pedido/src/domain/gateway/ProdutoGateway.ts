export default interface ProdutoGateway{

    existeProduto(produtoId: string): Promise<boolean>;
}