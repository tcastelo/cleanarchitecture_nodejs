import GatewayFactory from "../../domain/factory/GatewayFactory"
import ProdutoGateway from "../../domain/gateway/ProdutoGateway";
import RestProdutoApi from "../gateway/RestProdutoApi"

export default class RestGatewayFactory implements GatewayFactory{

    createProdutoService(): ProdutoGateway {
        return RestProdutoApi.getInstance();
    }

}