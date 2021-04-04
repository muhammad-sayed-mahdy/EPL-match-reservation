const form = document.querySelector('form');
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
                
            });
            window.location.href = '/';
        } else {
            res.json().then (errors => {
                
            });
        }
    })
    .catch(err => console.error(err));
});