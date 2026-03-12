# Link traversal querying

## SPARQL query

**Url to comunica:** `https://comunica.github.io/comunica-feature-link-traversal-web-clients/builds/follow-match-query/#datasources=https%3A%2F%2Fkellymarino.github.io%2Fknowledge-graphs-2026%2Fdata.ttl&query=PREFIX%20my%3A%20%20%20%20%20%3Chttps%3A%2F%2Fkellymarino.github.io%2Fknowledge-graphs-2026%2Fvocabulary.ttl%23%3E%0APREFIX%20ex%3A%20%20%20%20%20%3Chttps%3A%2F%2Fkellymarino.github.io%2Fknowledge-graphs-2026%2Fdata.ttl%23%3E%0APREFIX%20vocab%3A%20%20%3Chttps%3A%2F%2Fanyplin.github.io%2FKnowledge-Graphs%2Fvocab.ttl%23%3E%0APREFIX%20voc%3A%20%20%20%20%3Chttps%3A%2F%2Fjanaverl.github.io%2Fknowledge_graphs_lab2%2Fvocabulary.ttl%23%3E%0APREFIX%20vocab2%3A%20%3Chttps%3A%2F%2Fdaniel1402.github.io%2Fknowledge-graphs-labs%2Fvocab.ttl%23%3E%0APREFIX%20vocab3%3A%20%3Chttps%3A%2F%2Ftiantangvanhoecke.github.io%2FKG_Lab2%2Fvocab.ttl%23%3E%0A%0ASELECT%20DISTINCT%20%3Fperson%20%3Fname%20WHERE%20%7B%0A%20%20%23%20Direct%3A%20person%20has%20course%20%2B%20name%20%28in%20their%20own%20doc%29%0A%20%20%7B%20%3Fperson%20my%3AcourseParticipant%20%3Fcourse%20%3B%20my%3Aname%20%3Fname%20.%20%7D%0A%20%20UNION%0A%20%20%7B%20%3Fperson%20vocab%3AcourseParticipant%20%3Fcourse%20%3B%20vocab%3Aname%20%3Fname%20.%20%7D%0A%20%20UNION%0A%20%20%7B%20%3Fperson%20voc%3AenrolledIn%20%3Fcourse%20%3B%20voc%3Aname%20%3Fname%20.%20%7D%0A%20%20UNION%0A%20%20%7B%20%3Fperson%20vocab2%3Aattends%20%3Fcourse%20%3B%20vocab2%3Aname%20%3Fname%20.%20%7D%0A%20%20UNION%0A%20%20%7B%20%3Fperson%20vocab3%3AenrolledIn%20%3Fcourse%20%3B%20vocab3%3AhasFullName%20%3Fname%20.%20%7D%0A%20%20%23%20So%20engine%20follows%20%22knows%22%20links%3A%20someone%20knows%20%3Fperson%2C%20and%20%3Fperson%20has%20course%20%2B%20name%0A%20%20UNION%0A%20%20%7B%20%3Fany%20my%3Aknows%20%3Fperson%20.%20%3Fperson%20vocab%3AcourseParticipant%20%3Fcourse%20%3B%20vocab%3Aname%20%3Fname%20.%20%7D%0A%20%20UNION%0A%20%20%7B%20%3Fany%20my%3Aknows%20%3Fperson%20.%20%3Fperson%20voc%3AenrolledIn%20%3Fcourse%20%3B%20voc%3Aname%20%3Fname%20.%20%7D%0A%20%20UNION%0A%20%20%7B%20%3Fany%20my%3Aknows%20%3Fperson%20.%20%3Fperson%20vocab2%3Aattends%20%3Fcourse%20%3B%20vocab2%3Aname%20%3Fname%20.%20%7D%0A%20%20UNION%0A%20%20%7B%20%3Fany%20my%3Aknows%20%3Fperson%20.%20%3Fperson%20vocab3%3AenrolledIn%20%3Fcourse%20%3B%20vocab3%3AhasFullName%20%3Fname%20.%20%7D%0A%7D%0AORDER%20BY%20%3Fname`

```sparql
PREFIX my:     <https://kellymarino.github.io/knowledge-graphs-2026/vocabulary.ttl#>
PREFIX ex:     <https://kellymarino.github.io/knowledge-graphs-2026/data.ttl#>
PREFIX vocab:  <https://anyplin.github.io/Knowledge-Graphs/vocab.ttl#>
PREFIX voc:    <https://janaverl.github.io/knowledge_graphs_lab2/vocabulary.ttl#>
PREFIX vocab2: <https://daniel1402.github.io/knowledge-graphs-labs/vocab.ttl#>
PREFIX vocab3: <https://tiantangvanhoecke.github.io/KG_Lab2/vocab.ttl#>

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
  UNION
  { ?any my:knows ?person . ?person vocab:courseParticipant ?course ; vocab:name ?name . }
  UNION
  { ?any my:knows ?person . ?person voc:enrolledIn ?course ; voc:name ?name . }
  UNION
  { ?any my:knows ?person . ?person vocab2:attends ?course ; vocab2:name ?name . }
  UNION
  { ?any my:knows ?person . ?person vocab3:enrolledIn ?course ; vocab3:hasFullName ?name . }
}
ORDER BY ?name
```

---

## Which build did I use? Why? Would the other work?

**I used: Follow if triple matches query.**

- It only follows links that are needed for my query. So it is fast (about 0.2 s).
- **Follow All** would work too, but it follows every link everywhere, so the list of links to open gets huge and it can run forever. I did not got a result.

---

## Is everyone discoverable?

**No.** I only got 5 people (me + 4 classmates), not all 40.

**Why:**
- The engine only opens pages it finds a link to. I only have links to a few people. The rest are never linked, so they are never opened.
- Everyone uses different words for "name" and "course". My query only knows 5 ways. If someone uses another way, they do not show up.

**What could help:** More links between people, or add more "ways" (UNIONs) in the query for each classmate's words. Or use a fixed list of all 40 URLs (federated query) instead of following links.

---

## Infinite link queue and proxy

**Infinite queue:**  
The engine has a list of links to open. With **Follow All**, every link it sees gets added. One page adds 10 links, each of those adds more, and so on. The list can never get empty. That is an infinite (or huge) queue.

**Proxy:**  
A proxy is between you and the web. It can change links, save old answers (cache), or block some requests. So the engine might see more links (queue gets bigger), fewer links (smaller queue), or some links never load. So a proxy can change how big the queue is and how long the query runs.
