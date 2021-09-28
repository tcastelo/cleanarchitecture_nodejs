import Produto from "../entity/Produto";

export default interface ProdutoRepository{
    criar(produto: Produto) : Promise<Produto>;
    buscar(id: string) : Promise<Produto>;
    buscarTodos() : Promise<Produto[]>;
    total(): Promise<number>;
}