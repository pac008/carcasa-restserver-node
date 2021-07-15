const form = document.querySelector('form');


const url = ( window.location.hostname.includes('localhost') )
        ? 'http://localhost:8080/api/auth'
        : 'https://restserver-nod3.herokuapp.com/api/auth';

form.addEventListener('submit', ev => {
    ev.preventDefault();

    const formData = {};
    for( let elem of form.elements ) {
        if( elem.name.length > 0 ) {
            formData[elem.name] = elem.value;

        }
    }
    
    fetch( url + '/login', {
        method: 'POST',
        body: JSON.stringify( formData ),
        headers: {'Content-Type': 'application/json'}
    })
    .then( resp => resp.json() )
    .then( ({ msg, token }) => {
        if( msg) {
            console.error(msg);
        }
        localStorage.setItem('token', token);
        window.location = 'chat.html';
    })
    .catch( console.log );
})

function onSignIn(googleUser) {

var profile = googleUser.getBasicProfile();
console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
console.log('Name: ' + profile.getName());
console.log('Image URL: ' + profile.getImageUrl());
console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.

var id_token = googleUser.getAuthResponse().id_token;
var data = { id_token };

fetch( url + '/google' , {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify( data )
})
.then( resp => resp.json() )
.then( ({ token }) => {
    
    localStorage.setItem('token', token)
    window.location = 'chat.html';
})
.catch( console.log );

}
const signOut = () => {
let auth2 = gapi.auth2.getAuthInstance();
auth2.signOut().then(function () {
    console.log('User signed out.');
});
}

