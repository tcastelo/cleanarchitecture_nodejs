import ProdutoGateway from "../../domain/gateway/ProdutoGateway";
const axios = require('axios')

export default class RestProdutoApi implements ProdutoGateway{

    static instance: RestProdutoApi;

    private constructor(){}

    static getInstance() {
        if (!RestProdutoApi.instance) {
            RestProdutoApi.instance = new RestProdutoApi();
        }
        return RestProdutoApi.instance;
    }

    async existeProduto(produtoId: string): Promise<boolean> {
        let result = false;

        await axios.get('http://ms_produto:3001/produtos/'+produtoId)
        .then(function (response) {
            result = true;
        })
        .catch(function (error) {
            result = false;
        });
        
        return new Promise(function (resolve, reject) {
            resolve(result);
        });
    }

}   