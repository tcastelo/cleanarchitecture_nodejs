import PedidoItemOutput from "./PedidoItemOutput";

export default class PedidoOutput{
    codigo: string;
    data: Date;
    cupom: string;
    total: number;
    items: PedidoItemOutput[];

    constructor(codigo: string, data: Date,cupom:string, total: number, items: PedidoItemOutput[]){
        this.codigo = codigo;
        this.data = data;
        this.cupom = cupom;
        this.total = total;
        this.items = items;
    }
}