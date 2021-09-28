export default class Produto{
    id: string;
    nome: string;
    valor: number;

    constructor(nome:string, valor: number){
        this.nome = nome;
        this.valor = valor;

        if(valor <= 0) throw new Error("O valor do produto deve ser maior que zero");
    }
}