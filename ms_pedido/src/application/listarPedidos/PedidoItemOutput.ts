export default class PedidoItemOutput{
    id: string; 
    nome: string;
    valor: number;
    qtd: number;

    constructor(id: string, nome: string, valor: number, qtd: number){
        this.id = id;
        this.nome = nome;
        this.valor = valor;
        this.qtd = qtd;
    }
}