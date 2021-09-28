import Cupom from "../../domain/entity/Cupom";
import RepositoryFactory from "../../domain/factory/RepositoryFactory";
import CupomRepository from "../../domain/repository/CupomRepository";
import CupomOutput from "./CupomOtput";

export default class ListarCupoms{

    cupomRepository: CupomRepository;

    constructor(repositoryFactory: RepositoryFactory){
        this.cupomRepository = repositoryFactory.createCupomRepository();
    }
    
    async execute(): Promise<CupomOutput[]>{
        const cupomResult = await this.cupomRepository.buscarTodos();
        const lista = [];
        
        for(const item of cupomResult){
            lista.push(new CupomOutput(item.codigo, item.data_validade, item.percentual_desconto));
        }
        
        return lista;
    }
}