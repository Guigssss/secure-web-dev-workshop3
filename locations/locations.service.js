// This file holds the Business-Logic layer, interacting with Data Layer

const Location = require('./locations.model')

function findAll () {
	return Location.find()
}

function findOne(idInMongo){
	return Location.findById(idInMongo)
}
function addLocation(locationData){
	const location = new Location(locationData)
	return location.save();
}
function deleteOne(idInMongo) {
	return Location.findOneAndDelete({_id:idInMongo})
}

function updateLocation(id,location){
	return Location.updateOne({_id: id}, location)
}

module.exports.findAll = findAll
module.exports.findOne = findOne
module.exports.addLocation = addLocation
module.exports.deleteOne= deleteOne
module.exports.updateLocation = updateLocation

