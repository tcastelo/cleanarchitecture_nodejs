export default class Cupom{
    codigo: string;
    data_validade: Date;
    percentual_desconto: number;

    constructor(codigo: string = "001", data_validade: Date, percentual_desconto: number){
        if(codigo.length < 3) throw new Error("O código do cupom deve possuir no mínimo 3 caracteres.");
        this.codigo = codigo;

        this.data_validade = data_validade;
        
        if(percentual_desconto <= 0) throw new Error("O percentual de desconto deve ser maior que zero.");
        this.percentual_desconto = percentual_desconto;
    }

    isExpirado(){
        const today = new Date();
        return (this.data_validade.getTime() < today.getTime());
    }
}