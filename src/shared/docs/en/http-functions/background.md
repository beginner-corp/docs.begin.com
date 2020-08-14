## Overview

It would be best to have a basic knowledge of **HTTP** and the **request/response pattern** for you to understand how Begin utilizes HTTP functions. In this article, we will give you a brief history & breakdown of HTTP and how this protocol works in the context of Begin.

If you already know how HTTP works and want to get started immediately, [learn how to provision HTTP functions here!](/en/http-functions/provisioning)

## History

HTTP stands for **Hyper-Text-Transfer-Protocol**, and it is pretty much the basis for what we call the world wide web today! It was invented by Tim Berners-Lee in the 1980's and is the foundation of any data exchange on the internet. HTTP is one of many [application layer protocols](https://gradeup.co/application-layer-protocols-dns-smtp-pop-ftp-http-i-ba1194bd-c5ab-11e5-9dcb-5849de73f8e1); however, HTTP is the protocol that allows *web-based applications* to communicate and deliver content to and from each other such as text, images, audio, video, and documents. 

HTTP has changed and evolved many times over the years and is still evolving to this day with HTTP/2 gaining traction and the latest version, HTTP/3, currently in development. It all began with the transference of HTML documents. In 1991, the first document version, HTTP/0.9, was released. HTTP/1.0 was released in 1992 with the ability to transmit different file types like:

- CSS documents
- videos
- scripts 
- and images

In 1995 came the release of HTTP/1.1, which introduced the ability to reuse established connections for subsequent requests, among a host of other features. Further improvements made to HTTP/1.1 in 1999 resulted in what is mostly in use today.

## Request/Response pattern

HTTP follows a simple model where a client makes a request to a server and waits for a response. We can also call this pattern a client-server protocol, which means the recipient initiates requests. The recipient making the request is also known as the "client" or "user-agent." The client or user-agent is any tool that acts on behalf of the user; usually, this is the Web browser.

**For example, a user wants to see a website.**

To present a web page, the browser sends a request to fetch the HTML document representing the page. It then parses this file, making additional requests corresponding to: 

- execution scripts 
- layout information (CSS)
- sub-resources contained within the page (usually images and videos).

The Web browser then mixes these resources to present to the user a complete web page. Scripts executed by the browser can fetch more resources in later phases, and the browser updates the web page accordingly. Where we fetched these resources from is the server, which serves the document as requested by the client. 

## HTTP messages

HTTP messages are human-readable, plain text information about the request or response. Sometimes the body contains binary data that has to be base64 converted to become readable. A typical message consists of three main sections. 

- start line
- headers
- body

<!-- TODO Add image -->

The information in these three sections varies depending on whether the HTTP message is a request message or response message. 


### HTTP request message

An example HTTP request:

<!-- TODO Add image -->

Requests consists of the following elements:

- An HTTP method, usually a verb like `GET` or `POST`. Typically, a client wants to fetch a resource (using `GET`) or post the value of an HTML form (using `POST`), though more operations may be needed in other cases.
- The path of the resource to fetch; the URL of the resource stripped from elements that are obvious from the context, for example without the protocol (`http://`), the domain (here, developer.mozilla.org), or the TCP port (here, 80).
- The version of the HTTP protocol.
- Optional headers that convey additional information for the servers.
- Or a body, for some methods like POST, similar to those in responses, which contain the resource sent.

### HTTP response message

An example response:

<!-- TODO Add image -->

Responses consist of the following elements:

- The version of the HTTP protocol they follow.
- A status code, indicating if the request was successful, or not, and why.
- A status message, a non-authoritative short description of the status code.
- HTTP headers, like those for requests.
- Optionally, a body containing the fetched resource.
- APIs based on HTTP

> 🤖 You will learn much more about start lines, headers, and bodies in the context of Begin inside of the [API reference section](/en/http-functions/api-reference)!

Now that we have an understanding of HTTP and the request/response pattern, let's move on to learning how to provision our first HTTP function!

## Additional resources

- [Introduction to HTTP (Launch School)](https://launchschool.com/books/http)
- [An overview of HTTP (MDN web docs)](https://developer.mozilla.org/en-US/docs/Web/HTTP/Overview)
- [The HTTP and the Web | HTTP Explained | Request-Response Cycle (video)](https://www.youtube.com/watch?v=eesqK59rhGA)