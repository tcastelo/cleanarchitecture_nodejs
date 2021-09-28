import Produto from "../../domain/entity/Produto";
import ProdutoRepository from "../../domain/repository/ProdutoRepository";
import SalvarProdutoService from "../../domain/service/SalvarProdutoService";
import ProdutoInput from "./ProdutoInput";
import ProdutoOutput from "./ProdutoOutput";

export default class CriarProduto{
    produtoRepository: ProdutoRepository;

    constructor(produtoRepository: ProdutoRepository){
        this.produtoRepository = produtoRepository;
    }

    async execute(produtoInput: ProdutoInput): Promise<ProdutoOutput>{
        const produto = new Produto(produtoInput.nome, produtoInput.valor);
        const produtoResult = await new SalvarProdutoService(this.produtoRepository).execute(produto);
        return new ProdutoOutput(produtoResult.id, produtoResult.nome, produtoResult.valor);
    }
}