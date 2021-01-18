let mongoose = require('mongoose'),
    express = require('express'),
    router = express.Router();
let PointDraws = require('../models/PointsModel');
let PolygonDraws = require('../models/PolygonsModel')

// REST API Requests ...
router.route('/').get((req, res) => {
    user.find((error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
})

router.route('/store').post((req, res, next) => {
    let point = req.body.geometry.type;
    let polygon = req.body.geometry.type;

    if (point === "Point") 
    {
        PointDraws.create(req.body, (error, data) => {
            if (error) {
                return next(error)
            } else {
                console.log(data)
                console.log(req.body);
                res.json(data)
            }
        })
    }
    if (polygon === "Polygon")
    {
        PolygonDraws.create(req.body, (error, data) => {
            if (error) {
                return next(error)
            } else {
                console.log(data)
                console.log(req.body);
                res.json(data)
            }
        })
    }
});


module.exports = router;