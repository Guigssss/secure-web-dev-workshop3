// This file holds the Business-Logic layer, interacting with Data Layer

const Location = require('./locations.model')

async function findAll () {
	const location = await Location.find()
	if(!location){
		throw new Error("Not Found");
	}
	return location
}

async function findOne(idInMongo){
	const location = await Location.findById(idInMongo)
	if(!location){
		throw new Error("Not Found");
	}
	return location
}
async function addLocation(locationData){
	try{
		const location = await new Location(locationData)
		return location.save();
	}
	catch(e){
		throw new Error("Missing mandatory field")
	}
}
async function deleteOne(idInMongo) {
	const location = await findOne(idInMongo)
	return location.remove()
	//return Location.findOneAndDelete({_id:idInMongo})
}

function updateLocation(id,location){
	return Location.updateOne({_id: id}, location)
}

module.exports.findAll = findAll
module.exports.findOne = findOne
module.exports.addLocation = addLocation
module.exports.deleteOne= deleteOne
module.exports.updateLocation = updateLocation

