# formsender.js

## introduction
This is a lightweight JS library that handles your HTML form responses for free, using Google Apps Scripts.
<strong>This should not be used for websites expecting generally more than 30 simulataneous responses or 20,000 responses a day due to Google Apps Scripts' limitations.</strong> For small or personal websites, however, formsender.js is a perfect solution!

## setup
1. Install formsender.js
From the Github explorer above, download formsender.js. In your html, put the following code, depending on where the library is located.
```html
<script src="formsender.js"></script>
```
2. Google Apps Script
Go to your preferred Google account and create a new Google Apps Scripts. The following javascript should be pasted in.
```js
function doPost(e) {
  const receiver = 'johndoe@gmail.com'; // where you want responses to be sent
  const body = e.postData.contents; 
  const bodyJSON = JSON.parse(body);
  const formattedbody = `Name: ${bodyJSON.firstname} ${bodyJSON.lastname}\nEmail: ${bodyJSON.email}\nMessage:\n${bodyJSON.message}`;
  GmailApp.sendEmail(receiver, 'New Msg from formsender.js', formattedbody);
}
```
*Note: JSON keys are set automatically to the "name" attribute of the HTML form's inputs.*
<br>
<br>
After, go to "Publish" and "Publish as webapp". Set the user as your personal email and accessibility to "anonymous, even if not logged in".
You should ultimately have a link in the format "https://script.google.com/macros/s/somescriptID/exec".
<br>
<br>
3. Formsender Object
Initialize the Formsender Object, where the parameters represent #formID and Google Apps Script webapp respectively.
```js
var form1 = new Formsender('formID', 'https://script.google.com/macros/s/somescriptID/exec');
```
You're done! For further customizations, reference the documentation at the <a href="https://dseum22.github.io/formsender-js/" target="_blank">formsender.js website</a>.
