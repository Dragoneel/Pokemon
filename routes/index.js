var express = require('express');
var S = require('string');

// Sparql stuffs
var SparqlClient = require('sparql-client');
var util = require('util');
var endpoint = 'http://dbpedia.org/sparql';

var router = express.Router();
// var serie = "Psych";
/* GET home page. */
router.get('/', function(req, res) {
 	// var query = "SELECT DISTINCT ?property WHERE {?instance a <http://dbpedia.org/ontology/series> . ?instance ?property ?obj . } LIMIT 10";
 	// var query = "SELECT * WHERE {?e <http://dbpedia.org/ontology/series>         <http://dbpedia.org/resource/"+serie+">    . ?e <http://dbpedia.org/ontology/releaseDate>    ?date. ?e <http://dbpedia.org/ontology/episodeNumber>  ?number . ?e <http://dbpedia.org/ontology/seasonNumber>   ?season. ?e <http://dbpedia.org/ontology/thumbnail> ?thumb. ?e dbpedia-owl:abstract ?resume. ?e dbpedia-owl:thumbnail ?thumbnail. ?e foaf:depiction ?link } order by ?date";
 	// var query = "select ?abstract ?thumbnail where {dbpedia:Ernest_Hemingway dbpedia-owl:abstract ?abstract ; dbpedia-owl:thumbnail ?thumbnail . filter(langMatches(lang(?abstract),'en')) } ";


 	// var query = "SELECT DISTINCT ?serie ?creator ?release WHERE { <http://dbpedia.org/resource/"+serie+">  dbpedia-owl:abstract ?abstract; dbpedia-owl:creator ?creator; dbpedia-owl:releaseDate ?release  . filter(langMatches(lang(?abstract),'en'))  } ";


	var query = "SELECT DISTINCT ?titre ?resume ?release ?th WHERE {?s rdf:type <http://dbpedia.org/ontology/TelevisionShow> . ?s rdfs:label ?titre .  ?s dbpedia-owl:abstract ?resume . ?s dbpedia-owl:releaseDate ?release. ?s dbpedia-owl:thumbnail ?th filter(langMatches(lang(?titre),'en')) filter(langMatches(lang(?resume),'en')) } ORDER BY ASC(?release) LIMIT 1";
	var client = new SparqlClient(endpoint);
	// console.log("Query to " + endpoint);
	// console.log("Query: " + query);
	client.query(query)
	  //.bind('city', 'db:Tokyo')
	  // .bind('city', '<http://dbpedia.org/resource/Rabat>')
	  .execute(function(error, results) {
	  // process.stdout.write(util.inspect(arguments, null, 20, true)+"\n");
	  // console.log(results.results.bindings);
	  res.render('search', { title: 'myPedia', res: results.results.bindings, pretty: true });
	});
  
});

// module.exports = searchQuery;

// searchQuery.prototype = {
//   find: function(req, res) {
//     console.log("triggered");

//   }
// };

module.exports = router;




// SELECT DISTINCT ?titre ?release ?th
// WHERE {

//   ?film_URI rdf:type <http://dbpedia.org/ontology/TelevisionShow> .
//   ?film_URI rdfs:label ?titre .
//   ?film_URI dbpedia-owl:releaseDate ?release.
//   ?film_URI dbpedia-owl:thumbnail ?th

// filter(langMatches(lang(?titre),'en'))

// } 
// ORDER BY ASC(?release)
// LIMIT 10


// SELECT DISTINCT ?person ?asbtract
// WHERE {
//     ?person a dbpedia-owl:Person .
//     ?person dbpedia-owl:abstract ?asbtract .
//      FILTER regex(str(?asbtract), "\\bBerlin\\b").
// }