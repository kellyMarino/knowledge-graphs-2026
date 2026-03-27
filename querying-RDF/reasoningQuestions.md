## Published files

- **Data:** <https://kellymarino.github.io/knowledge-graphs-2026/data.ttl>
- **Ontology:** <https://kellymarino.github.io/knowledge-graphs-2026/vocabulary.ttl>


### What happens when you try the FOAF query?

I loaded my files (`data.ttl`, `vocabulary.ttl`), one RDFS rules file, and some classmates data + ontology. Then I ran the same **Pictures** query again (it only uses FOAF words like `foaf:Image`, `foaf:depicts`, `foaf:Person`, `foaf:name`).

**What I got:** Still **one** answer: my library photo and **"Kelly Mariño"**. Nothing new from the other people.

**Why:** The query It only matches when **all** of this is true at once: there is a **picture** counted as a FOAF image, it **depicts** someone who counts as a FOAF person, and that **same someone** has a **FOAF name** (a text name). My file is the only one where that whole story fits after reasoning. The others either don’t have “photo -> depicts -> person with name” in their data, or their ontology doesn’t connect their terms to FOAF the way mine does. **All results** shows that their data *did* load; this query just filters almost everything out.

---

### (How) does this show semantics in action?

The query doesn’t use my words (`my:Photograph`, `my:depicts`, …). It only uses FOAF. Still it finds my photo and my name because my ontology says things like: “my photograph type is a kind of FOAF image” and “my `depicts` is a kind of FOAF `depicts`.” The rules file tells the reasoner what “subclass” and “subproperty” mean. So the reasoner can **add** FOAF facts that are not literally written in `data.ttl`, for example that my photo is a `foaf:Image`. That's using meaning (definitions + rules), not searching for exact URIs.

---

### What can we use this for?

- Same question but many datasets: If each person keeps their own vocabulary but **maps** it to something common (like FOAF), one style of query can work for everyone who mapped enough.

