const { MongoClient } = require('mongodb');


async function listDatabases(client) {
    const database = await client.db('Schedule')

    let results = database.collection('Schedule-Frontend').find();
    await results.forEach(r => {
        console.log(r)
    })

    // console.log("Databases:");
    //databasesList.databases.forEach(db => {
    //    console.log('-${db.name}');
    //})
}

async function main() {

    const url = "mongodb+srv://lidiya:dvpMXNSQWFAp2UGb@ltu-rest-ws.mwzyn.mongodb.net/test?authSource=admin&replicaSet=atlas-i5ooth-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true";

    const client = new MongoClient(url);

    try {
        await client.connect();
        await listDatabases(client);
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}
main().catch(console.error);