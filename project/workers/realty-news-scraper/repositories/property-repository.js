const dbClient = require('../config/dbconfig');

const updatePropertyInfo = async ({ info }) => {
    console.debug(`Saving data for property ${info.id}.`);
    const options = {
        table: 'property_details',
        records: [ info ]
      };

    try {
        const res = await dbClient.insert(options)
        console.debug(`Data for property ${info.id} is saved successfully.`, res);
    } catch(err) {
        console.error(`Failed to update property details for ${info.id}`, err);
    }
};

const saveProblemProperty = async ({ home }) => {
    const options = {
        table: 'missing_data_property',
        records: [ {
            id: home.id,
            property_id: home.item_id,
            url: home.url
        }]
    };

    try {
        await dbClient.insert(options);
    } catch(error) {
        console.log(error);
    }
};

module.exports = { 
    updatePropertyInfo,
    saveProblemProperty
};