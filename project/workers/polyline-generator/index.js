const polyline = require('@mapbox/polyline');
const db = require('./config/dbconfig');

const polylines = [];

const offset = 0.02;
for (let lat = -36.92218; lat < -36.79052; lat = lat + offset) {
    for (let lng = 174.66483; lng < 174.91011; lng = lng + offset) {
        const encodedPolyline = polyline.encode([
            [lat, lng],
            [lat, (lng + offset)], 
            [(lat + offset), (lng + offset)],
            [(lat + offset), lng]
        ]);
        polylines.push(encodedPolyline);
    }
}

const options = {
    table: 'interesting_regions',
    records: polylines.map((polyline) => ({
        polyline: polyline,
        status: 0,
    }))
};

db.insert(options)
    .then((res) => {
        console.log('Generated polylines saved for futher processing.');
        console.log(res);
    })
    .catch((err) => {
        console.error("Failed to save polylines.");
        console.error(err);
    });