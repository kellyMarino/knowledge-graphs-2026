# Lab 1: RDF Data Modeling and Processing

**Student Name:** Kelly Johana Mariño Martinez

## Installation Instructions

### Prerequisites
- [Bun](https://bun.sh/)

### Steps

1. Open the terminal in the project folder
2. Install dependencies, run:
     `bun install` 


## Execution Instructions

In the project folder, run:
1. `cd ./tsproject` 
2. `bun run index.ts`

## Analysis Question 1

**Question:** What is an advantage of using JSON-LD format? What is an advantage of using Turtle format? For both formats, provide a situation where it is best to use this format over the other.

**Answer:**

An advantage of JSON-LD is that makes data RDF-compatible in a way that fits web applications: it’s just JSON, so frontends can work with it directly instead of manually parsing triples. An advantage of Turtle is that it is compact and easy to read for people working with RDF, with clear prefixes and triple-style syntax.

## Analysis Question 2

**Question:** Is the triple count outputted correct? Why or why not?

**Answer:**

The triple count is correctly 13 due to the deduplication of the triples, meaning that merging was succesful.
First I had 23 triples because I was missing one colon at one of the subjects definition (exMyName) and that created one extra subject with 9 properties. After fixing the typo I got 14 because I was using different prefix for the name predicate (in ttl schema and in jsonld foaf), so I had one extra triple. After using the same predicate in both files, the merging was good and I got 13 triples.
# knowledge-graphs-2026
