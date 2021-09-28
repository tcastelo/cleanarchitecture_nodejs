import ExpressHttp from "./infra/http/ExpressHttp";
import ProdutoRepositoryDatabase from "./infra/repository/database/ProdutoRepositoryDatabase"
import PostgreDatabase from "./infra/database/PostgreDatabase"
import ProdutoRepositoryMemory from "./infra/repository/memory/ProdutoRepositoryMemory"

//const produtoRepository = new ProdutoRepositoryDatabase(PostgreDatabase.getInstance());
const produtoRepository = ProdutoRepositoryMemory.getInstance();

const express = new ExpressHttp(produtoRepository);
express.init();