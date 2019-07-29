## Overview

Fast, scalable cloud function-based apps need fast, scalable cloud function-capable persistence.

When selecting a database for your cloud function-based Begin app, we strongly suggest solutions that enable connection via HTTP or API, such as Begin Data, DynamoDB, or FaunaDB – as opposed to older socket-based databases.


## In-network databases

### Begin Data

Every Begin app comes bundled with [Begin Data](/en/data/begin-data/), a durable, easy to use, fully managed, SSD-based key-value and document database that's free and in-network.

Learn more about using [Begin Data's simple API here](/en/data/begin-data/).


### AWS databases

Your Begin app can connect to AWS database systems, such as DynamoDB, although there may be certain limitations. For example, some may require VPC connections (which Begin does not presently support).


### Out of network

## FaunaDB

[FaunaDB](https://fauna.com) also offers a great, scalable, highly distributed cloud database solution as well.

Learn more about integrating [Fauna with Begin here](https://fauna.com/blog/using-faunadb-with-begin-com).


## Firebase

Another highly regarded and widely used distributed cloud database is [Firebase](https://firebase.google.com/docs/database).
