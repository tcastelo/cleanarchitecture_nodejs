export default class CupomOutput{
    codigo: string;
    data_validade: Date;
    percentual_desconto: number;

    constructor(codigo: string, data_validade: Date, percentual_desconto: number){
        this.codigo = codigo;
        this.data_validade = data_validade;
        this.percentual_desconto = percentual_desconto;
    }
}