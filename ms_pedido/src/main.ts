import ExpressHttp from "./infra/http/ExpressHttp";
import DatabaseRepositoryFactory from "./infra/factory/DatabaseRepositoryFactory"
import MemoryRepositoryFactory from "./infra/factory/MemoryRepositoryFactory"
import RestGatewayFactory from "./infra/factory/RestGatewayFactory"

const repositoryFactory = new DatabaseRepositoryFactory();
//const repositoryFactory = new MemoryRepositoryFactory();
const gatewayFactory = new RestGatewayFactory();

const express = new ExpressHttp(repositoryFactory,gatewayFactory);
express.init();