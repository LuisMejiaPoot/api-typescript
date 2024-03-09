import "reflect-metadata";
import { DataSource } from "typeorm";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";
import { MysqlConnectionOptions } from "typeorm/driver/mysql/MysqlConnectionOptions";
import entities from "./Entities";

export default class DBConnectionHelper {

  async connect(): Promise<DataSource> {
    
    const connectionSource= {
      host: "",
      port: 3306,
      username: "",
      password: "",
      database: "",
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