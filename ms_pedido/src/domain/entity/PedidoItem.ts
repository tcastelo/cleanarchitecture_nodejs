export default class PedidoItem{
    produto_id: string;
    produto_nome: string;
    produto_valor: number;
    quantidade: number;

    constructor(produto_id: string, produto_nome: string, produto_valor:number, quantidade: number){
        if(quantidade <= 0) throw new Error("A quantidade do produto deve ser maior que zero.");
        
        this.produto_id = produto_id;
        this.produto_nome = produto_nome;
        this.produto_valor = produto_valor;
        this.quantidade = quantidade;
    }

    getTotal(){
        return this.produto_valor * this.quantidade;
    }

}