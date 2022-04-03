# CSRF Attack Prevention By Custom Header
This is an example with request side customer header.

## To set up
npm install

## To run
From the root
Run both below:

- App - node ./app/index.js
- fakeApp - node ./fakeApp/index.js

Then, you can see app will get a success message upon form submission in network tab.
On the other hand, the fake app will get a failure message.

This prevention works because of the use of the custom request header "x-csrf-token".

### Steps to implement
1. Make sure to add a custom header in the client side for post requests,etc.
2. Make sure to add check if the custom header exists in the requests in the server side.

#### Read below for more details:
https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html#use-of-custom-request-headers

## Testing
I have only tested this with Brave browser, so need to check other browsers as well.