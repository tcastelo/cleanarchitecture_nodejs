import RepositoryFactory from "../../domain/factory/RepositoryFactory";
import CupomRepository from "../../domain/repository/CupomRepository";
import PedidoRepository from "../../domain/repository/PedidoRepository";
import PedidoRepositoryDatabase from "../repository/database/PedidoRepositoryDatabase"
import CupomRepositoryDatabase from "../repository/database/CupomRepositoryDatabase"
import PostgreDatabase from "../database/PostgreDatabase"

export default class DatabaseRepositoryFactory implements RepositoryFactory{
    
    createPedidoRepository(): PedidoRepository {
        return new PedidoRepositoryDatabase(PostgreDatabase.getInstance());
    }
    createCupomRepository(): CupomRepository {
        return new CupomRepositoryDatabase(PostgreDatabase.getInstance());
    }

}