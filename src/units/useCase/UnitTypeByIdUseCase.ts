import useCase from "../../utils/infrastructure/useCase";
import OdooClient from "../../utils/odooConnection/createOdooClient";
import OdooCreateRepository from "../../utils/odooConnection/odooCreateRepository";
import UnitTypes from "../domain/entity/UnitTypes";
import UnitTypeByIdRepository from "../domain/repository/UnitTypeByIdRepository";
import xmlrpc from 'xmlrpc';

export default class UnitTypeByIdUseCase implements useCase<number, UnitTypes>{
    protected unitTypeByIdRepository: UnitTypeByIdRepository;
    protected odooClient: OdooClient;
    protected odooCreateRepository: OdooCreateRepository;

    constructor( ) {
        this.unitTypeByIdRepository = new UnitTypeByIdRepository();
        this.odooClient = new OdooClient();
        this.odooCreateRepository = new OdooCreateRepository();
    }
    async execute(id: number): Promise<UnitTypes> {
        const newId =  id +1 ;
        const unitType = await this.unitTypeByIdRepository.execute(newId);   

        
            try{
                        // Create an XML-RPC client instance
            

            const odooUid =  await this.odooClient.execute();
            this.odooCreateRepository.execute({
                uid: odooUid,
                endpoint: "res.partner",
                data: {
                    'name': 'New Product',
                    'description': 'Description of the new product',
                    'list_price': 100.00,  
                    'type': 'product',  
                    
                }
            
            })
           
        

   

        
            }catch(e){
                console.log("🚀 ~ UnitTypeByIdUseCase ~ execute ~ e", e)
            }




        return unitType;
    }
  
    public   getCurrentDate(): string {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).substring(2);
        const day = String(now.getDate()).substring(2);
        const hours = String(now.getHours()).substring(2);
        const minutes = String(now.getMinutes()).substring(2);
        const seconds = String(now.getSeconds()).substring(2);
    
        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    }
}