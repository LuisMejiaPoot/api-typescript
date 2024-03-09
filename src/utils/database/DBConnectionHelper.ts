import "reflect-metadata";
import { DataSource } from "typeorm";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";
import { MysqlConnectionOptions } from "typeorm/driver/mysql/MysqlConnectionOptions";
import entities from "./Entities";

export default class DBConnectionHelper {

  async connect(): Promise<DataSource> {
    
    const connectionSource= {
      host: "174.136.53.220",
      port: 3306,
      username: "tierran2",
      password: "nZ65.ux9HlW;B9",
      database: "tierran2_pedidos",
  };

    const dataSourceOptions: MysqlConnectionOptions = {
      type: "mysql",
      ...connectionSource,
      namingStrategy: new SnakeNamingStrategy(),
      entities,
      logging: true,
      synchronize: false
    };

    return await new DataSource( dataSourceOptions ).initialize();
  }

}