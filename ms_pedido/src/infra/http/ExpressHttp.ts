import RepositoryFactory from "../../domain/factory/RepositoryFactory"
import GatewayFactory from "../../domain/factory/GatewayFactory"
import express, { response } from "express";
import CriarPedido from "../../application/criarPedido/CriarPedido";
import PedidoInput from "../../application/criarPedido/PedidoInput";
import ListarPedidos from "../../application/listarPedidos/ListarPedidos";
import CupomInput from "../../application/criarCupom/CupomInput";
import CriarCupom from "../../application/criarCupom/CriarCupom";
import ListarCupoms from "../../application/listarCupoms/ListarCupom";

export default class ExpressHttp{

    app: any;
    port: number;
    
    repositoryFactory: RepositoryFactory;
    gatewayFactory: GatewayFactory;

    constructor(repositoryFactory: RepositoryFactory, gatewayFactory: GatewayFactory, port: number = 3000){
        this.repositoryFactory = repositoryFactory;
        this.gatewayFactory = gatewayFactory;

        this.app= express();
        this.app.use(express.json());
        this.app.all('*', function (req: any, res: any, next: any) {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
            res.header('Access-Control-Allow-Headers', 'Content-Type,authentication');
            next();
        });
        this.app.options("*", function (req: any, res: any) {
            res.end();
        });

        this.port = port;
    }

    init(){

        this.app.post("/pedidos", (req:any,res) =>{
            console.log("Recebeu requisição");
            console.log(req.body)

            const pedidoInput = new PedidoInput(req.body.items, req.body.cupom, req.body.data);

            new CriarPedido(this.repositoryFactory,this.gatewayFactory)
            .criar(pedidoInput)
            .then(response => {
                res.send(response);
            })
            .catch(error => {
                res.status(500).send({"Exception" : error.message});
            });
        });

        this.app.get("/pedidos", (req:any,res:any) =>{
            new ListarPedidos(this.repositoryFactory)
            .listar()
            .then(response => {
                res.send(response);
            })
            .catch(error => {
                res.status(500).send({"Exception" : error.message});
            });
        });

        this.app.post("/cupoms", (req:any,res) =>{
            console.log("Recebeu requisição");
            console.log(req.body)

            const cupomInput = new CupomInput(req.body.codigo, new Date(req.body.data_validade), req.body.percentual_desconto);

            new CriarCupom(this.repositoryFactory)
            .criar(cupomInput)
            .then(response => {
                res.send(response);
            })
            .catch(error => {
                res.status(500).send({"Exception" : error.message});
            });
        });

        this.app.get("/cupoms", (req:any,res:any) =>{
            new ListarCupoms(this.repositoryFactory)
            .execute()
            .then(response => {
                res.send(response);
            })
            .catch(error => {
                res.status(500).send({"Exception" : error.message});
            });
        });

        this.app.listen(this.port, () => {
            console.log(`App listening at http://localhost:${this.port}`)
        })
    }
}