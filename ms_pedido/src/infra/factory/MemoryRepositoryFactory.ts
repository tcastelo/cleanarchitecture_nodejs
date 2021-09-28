import RepositoryFactory from "../../domain/factory/RepositoryFactory";
import CupomRepository from "../../domain/repository/CupomRepository";
import PedidoRepository from "../../domain/repository/PedidoRepository";
import PedidoRepositoryMemory from "../repository/memory/PedidoRepositoryMemory"
import CupomRepositoryMemory from "../repository/memory/CupomRepositoryMemory"

export default class MemoryRepositoryFactory implements RepositoryFactory{
    
    createPedidoRepository(): PedidoRepository {
        return PedidoRepositoryMemory.getInstance();
    }
    createCupomRepository(): CupomRepository {
        return CupomRepositoryMemory.getInstance();
    }

}