# Node.js Fundamentals

## HTTP Protocol

HTTP (Hypertext Transfer Protocol) is a protocol used for communication between web clients (such as web browsers) and web servers. It is a request-response protocol that operates over the internet.

<br>

### HTTP Requests

A client initiates an HTTP request to a server using a URL (Uniform Resource Locator). The URL identifies the resource (such as a web page or an image) that the client wants to access. The request consists of a method, a URL, and headers.

<br>

### HTTP Methods

HTTP defines several methods that a client can use to interact with a server:

- GET: Retrieves a resource from the server.
- POST: Sends data to the server to create a new resource.
- PUT: Sends data to the server to update an existing resource.
- PATCH: Sends data to the server to update an especific information from the resource.
- DELETE: Deletes a resource from the server.

<br>

### HTTP Headers

HTTP headers are additional information sent along with an HTTP request or response. Headers provide information such as the content type, cache control, and authentication information.

<br>

### HTTP Responses

When a server receives an HTTP request, it responds with an HTTP response. The response consists of a status code, headers, and a message body.

<br>

### HTTP Status Codes

HTTP defines several status codes that a server can use to indicate the result of a request:

- 1xx: Informational - The request was received, and the server is continuing to process it.
- 2xx: Success - The request was successfully received, understood, and accepted.
- 3xx: Redirection - Further action needs to be taken to complete the request.
- 4xx: Client Error - The request contains bad syntax or cannot be fulfilled.
- 5xx: Server Error - The server failed to fulfill an apparently valid request.

<br>

### HTTP Message Body

The message body is the content of the response. It can be HTML, JSON, XML, or any other format that the server and client support.

## Streams
