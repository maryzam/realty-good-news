const dbClient = require('../config/dbconfig');

const updatePropertyInfo = async ({ info }) => {
    console.log(`Saving data for property ${info.id}.`);
    
    const options = {
        table: 'property_details',
        records: [ info ]
      };

    try {
        const res = await dbClient.update(options)
        console.log(`Data for property ${info.id} is saved successfully.`);
    } catch(err) {
        console.log(`Failed to update property details for ${info.id}`, err);
    }

};

module.exports = { updatePropertyInfo };