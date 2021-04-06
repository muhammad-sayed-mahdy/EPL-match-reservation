import {formToJSON, showErrors} from './common.js';

const form = document.getElementById('signup-form');

form.addEventListener('submit', (e) => {
    e.preventDefault();
      
    fetch('/api/signup', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: formToJSON(form)
    })
    .then(res => {
        if (res.ok) {
            window.location.href = '/';
        } else {
            res.json().then (data => {
                showErrors(data.errors);
            });
        }
    })
    .catch(err => console.error(err));
});