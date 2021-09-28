import CupomRepository from "../repository/CupomRepository";
import PedidoRepository from "../repository/PedidoRepository";

export default interface RepositoryFactory{
    createPedidoRepository(): PedidoRepository;
    createCupomRepository(): CupomRepository;
}