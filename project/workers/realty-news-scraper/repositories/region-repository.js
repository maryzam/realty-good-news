const dbClient = require('../config/dbconfig');

const RegionStatus = {
    CREATED: 0,
    PROCESSING: 1,
    PROCESSED: 2
};

const getRegionToProcess = async () => {
    const options = {
        table: 'interesting_regions',
        searchAttribute: "status",
        searchValue: '0',
        attributes: ['polyline'],
      };
    
    try {
        const response = await dbClient.searchByValue(options);
        const region = response.data[0].polyline;
        await updateRegionStatus({ 
            region,
            status: RegionStatus.PROCESSING
        });
        return region;
    } catch(err) {
        console.log(err);
    }
}

const markRegionAsProcessed = async ({ region }) => {
    await updateRegionStatus({ 
        region,
        status: RegionStatus.PROCESSED
    });
}

const updateRegionStatus = async ({ region, status }) => {
    const options = {
        table: 'interesting_regions',
        records: [
          {
            polyline: region,
            status: status
          }
        ]
      };

    try {
        const res = await dbClient.update(options)
    } catch(err) {
        console.log(err);
    }
}

module.exports = {
    getRegionToProcess,
    markRegionAsProcessed
};