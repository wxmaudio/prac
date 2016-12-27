IE/**
* Usage: 
<!--[if IE]>
<script src="UserDataStorage.js"></script> 
<![endif]-->
*/
function UserDataStorage(maxage, storeFile) {
// Create a document element and install the special userData
// behavior on it so it gets save() and load() methods.
var memory = document.createElement("div"); 
// Create an element 
memory.style.display = "none"; // Never display it 
// Attach magic behavior 
memory.style.behavior = "url('#default#userData')"; 
document.body.appendChild(memory); 

if (maxage) {
	var now = new Date().getTime();
	var expires = now + maxage * 1000; // maxage seconds from now 
	memory.expires = new Date(expires).toUTCString();
}
// Initialize memory by loading saved values.
// The argument is arbitrary, but must also be passed to save() 
var filename = storeFile || "UserDataStorage";
memory.load(filename);
// Retrieve saved values from attributes 
this.getItem = function(key) { 
	return memory.getAttribute(key) || null;
};

this.setItem = function(key, value) {
	memory.setAttribute(key,value); // Store values as attributes
	memory.save(filename); // Save state after any change 
};
this.removeItem = function(key) {
	memory.removeAttribute(key); // Remove stored value attribute
	memory.save(filename); // Save new state 
};
}

