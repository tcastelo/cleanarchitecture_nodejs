import Cupom from "./Cupom";
import PedidoItem from "./PedidoItem"

export default class Pedido{
    codigo:string;
    data: Date;
    items: PedidoItem[] = [];
    cupom: Cupom;

    constructor(codigo: string = "001", data: Date = new Date()){
        this.codigo = codigo;
        this.data = data;
    }

    addCupom(cupom: Cupom){
        if(cupom.isExpirado()) throw new Error("Cupom expirado.");
        else this.cupom = cupom;
    }

    addProduto(produto_id:string, produto_nome: string, produto_valor: number, qtd: number){
        const pedidoItem = new PedidoItem(produto_id, produto_nome, produto_valor, qtd);
        this.items.push(pedidoItem);
    }

    getTotal(){
        let total = 0;
        for(const item of this.items){
            total += item.getTotal();
        }

        if(this.cupom) total -= (total*this.cupom.percentual_desconto)/100;

        return total;
    }
}