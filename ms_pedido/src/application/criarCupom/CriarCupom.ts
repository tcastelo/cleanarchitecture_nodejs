import Cupom from "../../domain/entity/Cupom";
import RepositoryFactory from "../../domain/factory/RepositoryFactory";
import CupomRepository from "../../domain/repository/CupomRepository";
import CupomInput from "./CupomInput";

export default class CriarCupom{

    cupomRepository: CupomRepository;

    constructor(repositoryFactory: RepositoryFactory){
        this.cupomRepository = repositoryFactory.createCupomRepository();
    }
    
    async criar(cupomInput: CupomInput): Promise<void>{
        const cupom = new Cupom(cupomInput.codigo, cupomInput.dataValidade, cupomInput.percentual_desconto);
        return await this.cupomRepository.criar(cupom);
    }
}