import Produto from "../entity/Produto";
import ProdutoRepository from "../repository/ProdutoRepository";

export default class SalvarProdutoService{
    produtoRepository: ProdutoRepository;

    constructor(produtoRepository: ProdutoRepository){
        this.produtoRepository = produtoRepository;
    }

    async execute(produto: Produto): Promise<Produto>{
        return this.produtoRepository.criar(produto);
    }
}