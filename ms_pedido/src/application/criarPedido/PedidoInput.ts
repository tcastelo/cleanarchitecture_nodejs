import PedidoItemInput from "./PedidoItemInput";

export default class PedidoInput{
    data: Date;
    items: PedidoItemInput[];
    cupom: string; 

    constructor(items: PedidoItemInput[], cupom: string, data: Date){
        this.data = data;
        this.items = items;
        this.cupom = cupom;
    }
}