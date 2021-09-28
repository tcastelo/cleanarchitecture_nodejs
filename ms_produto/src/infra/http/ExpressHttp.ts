import express, { response } from "express";
import CriarProduto from "../../application/criarProduto/CriarProduto";
import ProdutoInput from "../../application/criarProduto/ProdutoInput";
import ListarProdutos from "../../application/listarProdutos/ListarProdutos";
import ProdutoRepository from "../../domain/repository/ProdutoRepository";

export default class ExpressHttp{

    app: any;
    port: number;
    
    produtoRepository: ProdutoRepository;

    constructor(produtoRepository: ProdutoRepository, port: number = 3001){
        this.produtoRepository = produtoRepository;

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

        this.app.post("/produtos", (req:any,res) =>{
            console.log("Recebeu requisição");
            console.log(req.body);

            const produtoInput = new ProdutoInput(req.body.nome, req.body.valor);

            new CriarProduto(this.produtoRepository)
            .execute(produtoInput)
            .then(response => {
                res.send(response);
            })
            .catch(error => {
                res.status(500).send({"Exception" : error.message});
            });
        });

        this.app.get("/produtos", (req:any,res:any) =>{
            new ListarProdutos(this.produtoRepository)
            .execute()
            .then(response => {
                res.send(response);
            })
            .catch(error => {
                res.status(500).send({"Exception" : error.message});
            });
        });

        this.app.get("/produtos/:id", (req:any,res:any) =>{
            this.produtoRepository.buscar(req.params.id)
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