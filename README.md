# formsender.js

## introduction
This is a lightweight JS library that handles your static HTML form responses for free, using Google Apps Scripts.
<strong>This should not be used for websites expecting generally more than 30 simulataneous responses or 20,000 responses a day due to Google Apps Scripts' limitations.</strong> For small or personal websites, however, formsender.js is a perfect solution!

## setup
<strong>1. Install formsender.js</strong>
<br>
You can either <a href="https://cdn.jsdelivr.net/npm/formsender-js@1.0.1/formsender.min.js">download</a> formsender.js or <a href="https://www.jsdelivr.com/package/npm/formsender-js">use jsDelivr</a>.
```html
<!-- downloaded -->
<script src="formsender.js"></script>
<!-- jsDelivr -->
<script src="https://cdn.jsdelivr.net/npm/formsender-js@1.0.1/formsender.min.js"></script>
```
<strong>2. Google Apps Script</strong>
<br>
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
If you have more experience with Google Apps Script, you can further customize by using spreadsheets as a response database instead of receiving emails (I will personally add example code soon so that Google spreadsheet can be used).
<br>
<br>
After, go to "Publish" and "Publish as webapp". Set the user as your personal email and accessibility to "anonymous, even if not logged in".
You should ultimately have a link in the format "https://script.google.com/macros/s/somescriptID/exec".
<br>
<br>
<strong>3. Formsender Object</strong>
<br>
Initialize the Formsender Object, where the parameters represent #formID and Google Apps Script webapp respectively.
```js
var form1 = new Formsender('formID', 'https://script.google.com/macros/s/somescriptID/exec');
```
You're done! For further customizations, reference the documentation at the <a href="https://dseum22.github.io/formsender-js/" target="_blank">formsender.js website</a>.
