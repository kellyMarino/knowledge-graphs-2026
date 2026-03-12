# Federated Query
```
PREFIX my:     <https://kellymarino.github.io/knowledge-graphs-2026/vocabulary.ttl#>
PREFIX ex:     <https://kellymarino.github.io/knowledge-graphs-2026/data.ttl#>
PREFIX vocab:  <https://anyplin.github.io/Knowledge-Graphs/vocab.ttl#>
PREFIX voc:    <https://janaverl.github.io/knowledge_graphs_lab2/vocabulary.ttl#>
PREFIX vocab2: <https://daniel1402.github.io/knowledge-graphs-labs/vocab.ttl#>
PREFIX vocab3: <https://tiantangvanhoecke.github.io/KG_Lab2/vocab.ttl#>
PREFIX data2:  <https://daniel1402.github.io/knowledge-graphs-labs/data.ttl#>

SELECT DISTINCT ?person ?name WHERE {
  { ?person my:courseParticipant ?course ; my:name ?name . }
  UNION
  { ?person vocab:courseParticipant ?course ; vocab:name ?name . }
  UNION
  { ?person voc:enrolledIn ?course ; voc:name ?name . }
  UNION
  { ?person vocab2:attends ?course ; vocab2:name ?name . }
  UNION
  { ?person vocab3:enrolledIn ?course ; vocab3:hasFullName ?name . }
}
ORDER BY ?name
```
- What interoperability problems there are: 
    - The same concept (person name, course enrolment, knows) is expressed with different property URIs in each graph. A single pattern like ?person foaf:name ?name would only match people who use FOAF.

- How to I "solve" them:

    - One UNION branch for my data: my:courseParticipant, my:name.
    - One for Anna: vocab:courseParticipant, vocab:name.
    - One for Jana: voc:enrolledIn, voc:name.
    - One for Daniel: vocab2:attends, vocab2:name.
    - One for Tian: vocab3:enrolledIn, vocab3:hasFullName.
    - stating equivalence for "knows": my:knows owl:equivalentProperty foaf:knows
    - I use the same course URI as Anna (https://anyplin.github.io/Knowledge-Graphs/data.ttl#KnowledgeGraphs) in my:courseParticipant
    - We had a email threat with a several people's links and we also talk about the possibility of everyone stating that they are part of the Knowledge Graph course . 
