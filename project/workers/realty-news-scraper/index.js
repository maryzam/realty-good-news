const fetch = require("node-fetch");

const { getRegionProperties } = require('./services/region-property-scraper');
const { getPropertyInfo } = require('./services/property-info-scraper');

const RegionRepository = require('./repositories/region-repository');
const PropertyRepository = require('./repositories/property-repository');

const delay = (time) => new Promise(res => setTimeout(res,time));

const numToProcessInParallel = 10;

const scrapRegion = async () => {
    const region = await RegionRepository.getRegionToProcess();
    console.log(`Start scraping data for region ${ region} ...`);
    const properties = await getRegionProperties({ region });
    let savedProperties = 0;
    for (let i = 0; i < properties.length; i = i + numToProcessInParallel) {
        const homesToProcess = properties.slice(i, (i + numToProcessInParallel));
        await Promise.all(
            homesToProcess.map(async (home) => {
                try {
                    const info = await getPropertyInfo({ home });
                    await PropertyRepository.updatePropertyInfo({ info });
                    savedProperties++;
                } catch (err) {
                    console.log(`Failed to get or persist details for property ${home.id} / ${home.url}.`, err)
                    PropertyRepository.saveProblemProperty({ home });
                }
            })
        );
    };

    await RegionRepository.markRegionAsProcessed({ region });
    console.log(`Saved ${savedProperties} of ${properties.length} properties for region ${ region }`);
};

(async () => {
    while (true) {
        try { 
            await scrapRegion();
        } catch (error) {
            console.error(error);
            break;
        }
    }
})();
