## Overview

To fully understand serverless HTTP functions, it helps to have some knowledge of **HTTP** and the **request/response pattern**. Here we'll provide a brief history and breakdown of HTTP, and how this protocol works in the context of Begin.

Of course, if you're already familiar with HTTP and ready to get started: [learn how to provision HTTP functions here](/en/http-functions/provisioning).


## Origins

HTTP (**Hypertext Transfer Protocol**) is the underlying application-layer protocol for most of the consumer internet. Invented by Tim Berners-Lee at CERN in 1989, HTTP is now the de facto standard for generalized data exchange. Most notably, HTTP enables web sites, web apps, and a wide variety of APIs to deliver all manner of media, including text, images, audio, video, documents, and more.


## Request / response pattern

HTTP is a classic example of the request / response pattern, wherein a client (usually just a browser) makes a request to a web server, and awaits its response. (This also makes HTTP a client-server protocol, which means the recipient initiates the request.)

### Example

When a user wants to load a web site, that person often types a domain name into their browser. This, in turn, sends an HTTP request to the web server(s) operating the site. The server fulfills the request, and responding to the client with a payload that contains (among other things) the HTML document representing the page. The browser then parses this response, and begins rendering the page (and may also make additional requests for JS, CSS, images, video, etc.).


## HTTP payloads

HTTP payloads (technically referred to as `messages`) contain mostly human-readable information about a given request or response. We won't get too deep into the HTTP spec, but we'll touch on the most important properties of HTTP requests and responses below:

### Requests

Key properties of HTTP requests include:

- **Method** (sometimes called a **verb**)
  - One of `GET`, `POST`, `PUT`, `PATCH`, `DELETE`, or `OPTIONS`
  - Example: when a client requests a page, it's sending a `GET` request; when it sends the contents of a form, it's usually sending a `POST` request
- **Path**
  - The directory and/or file path being requested
  - Example: when requesting `https://docs.begin.com/en/guides/quickstart`, the path is `/en/guides/quickstart`
- **Headers** (optional)
  - Client metadata associated with the request; each header includes a value that can be represented in plain text
  - Example: your browser sends a `cookie: foo=bar` header; this header identifies that it has the cookie `foo` (and that cookie `foo` is `bar`)
- **Body** (optional)
  - Contains the contents of a form being published, or API request body
  - Generally only `POST`, `PUT`, `PATCH`, `DELETE` methods include a body
  - Example: your browser sends a `POST` request with a body that includes a username and password you typed into a login form


### HTTP response message

Key properties of HTTP responses include:

- **Status code**
  - There are dozens of status codes representing a variety of response conditions; generally `200` (indicating a successful response) is returned
  - Example: the server responds to a request with `200` and a body including the contents of the requested asset or endpoint
- **Headers** (optional)
  - Server metadata associated with the response; each header includes a value that can be represented in plain text
  - Example: the server sends a `set-cookie: fiz=buz` header; this header instructs the browser to create a new cookie called `fiz` (and that cookie `fiz` should be `buz`)
- **Body** (optional)
  - Contains the contents of the requested asset or endpoint
  - Example: your browser sends a `GET` request for an image, and the image contents are returned in the body


## How HTTP functions work

### The "serverful" model

Traditionally, the web servers handling the responses to client requests are large applications that run on virtual machines or containers. Like your own computer, they take a few minutes to boot up. And because they need to be ready at any moment to respond to client requests, these web servers must be left running all the time. Of course, this costs money, even if your web servers aren't actually doing anything at all.

Since you only have so many web servers (and so much money), when your web site / app / API generates too much traffic, your servers become overloaded. This renders them unable to respond to requests in a timely fashion; some users may take a very long time to receive their responses, while others' requests may be dropped entirely.

Since servers can't ask for help, to be made aware of such problems, the humans operating the site / app / API must then add complex instrumentation and monitoring, and will likely opt to build additional tooling and systems to help with the task of spinning up new servers when needed (lagging behind a few minutes, of course). And because servers are complex, those same people need to be ready at all times to jump in to ensure everything is working ok.

Oh, and don't forget: you've also got to patch your web servers and maintain their security so your application isn't vulnerable to attack.

That's a lot of wasted effort, money, and, most importantly: time.


### The serverless model

Instead of the aforementioned "serverful" model, Begin apps are built in an entirely new way: with serverless HTTP functions, specifically: AWS Lambda. Instead of large web servers that are slow to spin up, Begin apps rely on auto-provisioning, auto-scaling services that boot up in milliseconds, and shut off when they're not in use.

This means when your web app is hit with a flood of traffic, it will instantly spawn as many HTTP functions as is necessary to deliver timely responses to your customers. And because each of these functions shuts down when completed, they are auto-upgraded with the latest performance improvements, and patched with the latest security releases, so you never have to worry about maintenance unrelated to your core application.

All this means no wasted effort, money, or time – just the fastest way to write and deliver web sites, apps, and APIs that respond to customers over the most critical and common internet protocol today: HTTP.


## Let's go

Now that we have an understanding of HTTP, the request/response pattern, and how HTTP functions differ from traditional web servers, let's move on to learning [how to build with these primitives](/en/http-functions/provisioning)!


### Learn more about HTTP

- [An overview of HTTP (MDN)](https://developer.mozilla.org/en-US/docs/Web/HTTP/Overview)
- [Introduction to HTTP (Launch School)](https://launchschool.com/books/http)
