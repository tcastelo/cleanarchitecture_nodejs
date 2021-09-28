export default class PedidoOutput{
    codigo: string;
    total: number;

    constructor(codidgo:string, total: number){
        this.codigo = codidgo;
        this.total = total;
    }
}