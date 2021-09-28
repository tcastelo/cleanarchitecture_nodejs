import ProdutoRepository from "../../domain/repository/ProdutoRepository";
import ProdutoOutput from "./ProdutoOutput";

export default class ListarProdutos{
    produtoRepository: ProdutoRepository;

    constructor(produtoRepository: ProdutoRepository){
        this.produtoRepository = produtoRepository;
    }

    async execute(): Promise<ProdutoOutput[]>{
        const produtoResult = await this.produtoRepository.buscarTodos();

        return produtoResult.map(produtoItem => {
            return new ProdutoOutput(produtoItem.id, produtoItem.nome, produtoItem.valor)
        });
    }
}