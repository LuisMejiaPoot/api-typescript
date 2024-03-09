import xmlrpc from "xmlrpc";
import Odoo from "../enum/odoo";

export default class OdooClient {

    async  execute():Promise<number> {
        const client = xmlrpc.createClient({ url: Odoo.odooUrl + '/xmlrpc/2/common' });
            

        // Authenticate with Odoo and get user ID
        return new Promise((resolve, reject) => {
            client.methodCall('authenticate', [Odoo.odooDb, Odoo.odooUsername, Odoo.odooPassword, {}], (_error, uid) => {
                if (_error) {
                    reject(_error);
                } else {
                    resolve(uid);
                }
            });
        });

        
    }
}