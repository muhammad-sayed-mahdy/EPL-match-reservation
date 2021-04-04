import './js.cookie.min.js';

const form = document.querySelector('form');

const showErrors = (errors) => {
    document.querySelectorAll('input').forEach(e => e.classList.remove('is-invalid'));
    document.querySelectorAll('.invalid-feedback').forEach(e => e.remove());
    for (const e of errors) {
        const input = document.getElementById(e.param);
        input.classList.add('is-invalid');
        const div = document.createElement('div');
        div.classList.add('invalid-feedback');
        div.innerText = e.msg;
        input.parentElement.appendChild(div);
    }
};

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const data = {};
    formData.forEach((val, key) => {
        data[key] = val;
    });    
    fetch('/api/signup', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(res => {
        if (res.ok) {
            res.json().then(data => {
                Cookies.set('token', data.token, {secure:true, expires:1});         
            });
            window.location.href = '/';
        } else {
            res.json().then (data => {
                showErrors(data.errors);
            });
        }
    })
    .catch(err => console.error(err));
});