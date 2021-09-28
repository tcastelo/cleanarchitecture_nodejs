export default class ProdutoOutput{
    id: string;
    nome: string;
    valor: number;

    constructor(id: string, nome: string, valor:number){
        this.id = id;
        this.nome = nome;
        this.valor = valor;
    }
}