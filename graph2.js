// Include file system module.
var fs=require('fs');

// Include the readline module and read the csv file.
var lineReader = require('readline').createInterface({
  input: fs.createReadStream('Data.csv'),
});


function GDPChart(country, GDP) {
    this.country = country;
    this.GDP = GDP;

};

var country,GDP;
var indexCountry,indeXGDP;
var GDPArray = [];
var c=0;
//callback method to read a file line by line
lineReader.on('line', function (line) 
{

  var lineRecords = line.split(',');

  if (c==0) {
    indexCountry = lineRecords.indexOf('Country Name');
    indexGDP = lineRecords.indexOf('GDP Billions(USD)2013');
    c++;
  } 
  else {
    country = lineRecords[indexCountry];
    

    if (!(country.indexOf('European Union')>-1)) {
      
      GDP = lineRecords[indexGDP];
            
      GDPArray.push(new GDPChart(country, GDP));
      
      GDPArray.sort(function(a, b) {
                return parseFloat(b.GDP) - parseFloat(a.GDP)
            });
      

      fs.writeFileSync("barchart2.json", JSON.stringify(GDPArray), encoding = "utf8");
    }
  }

});




