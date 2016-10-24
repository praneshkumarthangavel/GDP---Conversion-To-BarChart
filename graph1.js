// Include file system module.
var fs=require('fs');

// Include the readline module and read the csv file.
var lineReader = require('readline').createInterface({
	input: fs.createReadStream('Data.csv'),
});



function populationChart(country, population) {

	this.country = country;
	this.population = population;
};

var country,population;
var indexCountry,indexPopulation;
var populationArray = [];
var c=0;
//callback method to read a file line by line
lineReader.on('line', function (line) 
{

	var lineRecords = line.split(',');

	if (c==0) {
		indexCountry = lineRecords.indexOf('Country Name');
		indexPopulation = lineRecords.indexOf('Population (Millions) 2013');
		c++;
	} 
	else {
		country = lineRecords[indexCountry];
		

		if (!(country.indexOf('European Union')>-1)) {
			
			population = lineRecords[indexPopulation];
				
			populationArray.push(new populationChart(country, population));
			
			populationArray.sort(function(a, b) {
				return parseFloat(b.population) - parseFloat(a.population)
			});
			

			fs.writeFileSync("barchart1.json", JSON.stringify(populationArray), encoding = "utf8");
		}
	}

});




