import Produto from "../../../domain/entity/Produto";
import ProdutoRepository from "../../../domain/repository/ProdutoRepository";
import Database from "../../database/Database";

export default class ProdutoRepositoryDatabase implements ProdutoRepository{

    database: Database;

    constructor(database:Database){
        this.database = database;
    }
        
    async criar(produto: Produto): Promise<Produto> {
        return await this.database.one('insert into produto (id, nome, valor) values ($1, $2, $3) returning *',[await this.total() + 1, produto.nome, produto.valor]);
    }

    async buscar(id: string): Promise<Produto> {
        const produtoResult = await this.database.one("select * from produto where id = $1", [id]);
        if(!produtoResult) throw new Error("Produto com id " + id + " não encontrado.");
        const produto = new Produto(produtoResult.nome, produtoResult.valor);
        produto.id = produto.id;
        return produto;
    }

    async buscarTodos(): Promise<Produto[]> {
        const produtoResult = await this.database.many("select * from produto",[]);

        const produtos: Produto[] = [];

        for(const produtoItem of produtoResult){
            const produto = new Produto(produtoItem.nome, produtoItem.valor);
            produto.id = produtoItem.id;
            produtos.push(produto);
        }
        
        return produtos;
    }

    async total(): Promise<number> {
        const countData = await this.database.one("select count(*)::int as count from produto", []);
        return countData.count;
    }

}