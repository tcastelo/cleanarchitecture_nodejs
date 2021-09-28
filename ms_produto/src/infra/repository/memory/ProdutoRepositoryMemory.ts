import Produto from "../../../domain/entity/Produto";
import ProdutoRepository from "../../../domain/repository/ProdutoRepository";

export default class ProdutoRepositoryMemory implements ProdutoRepository{

    lista: Produto[];
    static instance: ProdutoRepositoryMemory;
    
    private constructor () {
        this.lista = [];
    }

    static getInstance () {
        if (!ProdutoRepositoryMemory.instance) {
            ProdutoRepositoryMemory.instance = new ProdutoRepositoryMemory();
        }
        return ProdutoRepositoryMemory.instance;
    }

    async buscar(id: string): Promise<Produto> {
        const produto = this.lista.find(produto => produto.id === id);
        if (!produto) throw new Error("Produto não encontrado com o código informado");
        return Promise.resolve(produto);
    }

    buscarTodos(): Promise<Produto[]> {
        return Promise.resolve(this.lista);
    }

    async criar(produto: Produto): Promise<Produto> {
        produto.id = String(this.lista.length + 1);
        this.lista.push(produto);
        return produto;
    }

    async total(): Promise<number> {
        return Promise.resolve(this.lista.length);
    }

}