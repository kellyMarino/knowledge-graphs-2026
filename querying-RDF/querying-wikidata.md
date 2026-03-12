# Querying Wikidata

1. Queries: 

 SPARQL query that select all the railway stations in Belguim that have P1235

```
SELECT DISTINCT ?station ?stationLabel WHERE {
  ?station wdt:P31/wdt:P279* wd:Q55488 .
  ?station wdt:P17 wd:Q31 .
  ?station wdt:P1435 wd:Q12053139 .
  SERVICE wikibase:label { bd:serviceParam wikibase:language "en". }
}
ORDER BY ?stationLabel
```
- SPARQL query that count all “beschermd monument” in Belgium, grouped by their type

```
SELECT ?type (SAMPLE(?typeLabel) AS ?typeLabel) (COUNT(?item) AS ?count) (SAMPLE(?itemLabel) AS ?exampleItem) WHERE {
  ?item wdt:P17 wd:Q31 .
  ?item wdt:P1435 wd:Q12053139 .
  ?item wdt:P31 ?type .
  SERVICE wikibase:label {
    bd:serviceParam wikibase:language "en" .
    ?type rdfs:label ?typeLabel .
    ?item rdfs:label ?itemLabel .
  }
}
GROUP BY ?type
ORDER BY DESC(?count)
```

2. On the data out I found, the most conmmon type of "beschermd monument" in Belgium is church building with 693 and (Q16970) but also parish church with 520 (Q317557).




Open world assumption (OWA)

- In SPARQL and RDF, we assume the data is incomplete: the fact that something is not stated in the dataset does not mean it is false. So:
If a railway station in Belgium is not in the query result, we cannot conclude it is not a “beschermd monument”; we only know that either it isn’t, or it wasn’t added to Wikidata, or the statement isn’t there yet.
So the “list” of railway stations with beschermd monument is only “what Wikidata currently has”, not “all that exist in the real world”.

- How we could try to get a more complete list:
- Use multiple designations:
  -  If “beschermd monument” is one of several heritage statuses, consider querying for all relevant P1435 values and then filtering or grouping, so you don’t miss items that use a slightly different designation.
- Compare with official lists
  - Check with an official Belgian heritage or transport database; note how many real-world monuments/stations are missing in Wikidata.
- Document limitations
- Use subproperties / subclass
- Contributing
  - One way to “guarantee” a more complete list over time could be adding missing items or statements to Wikidata (following their policies).

