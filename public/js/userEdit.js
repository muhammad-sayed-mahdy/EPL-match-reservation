import {formToJSON, showErrors} from './common.js';

const form = document.querySelector('form');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    fetch('/api/user/update_profile', {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json'
        },
        body: formToJSON(form)
    })
    .then(res => {
        if (res.ok) {
            res.json().then (data => {
                window.location.href = `/user/${data.id}`;
            });
        } else {
            res.json().then (data => {
                showErrors(data.errors);
            });
        }
    })
    .catch(err => console.error(err));
});