export default class CupomInput{
    codigo: string;
    dataValidade: Date;
    percentual_desconto: number;

    constructor(codigo: string, validade: Date, percentual_desconto: number){
        this.codigo = codigo;
        this.dataValidade = validade;
        this.percentual_desconto = percentual_desconto;
    }
}