import {formToJSON, showErrors} from './common.js';

const form = document.querySelector('form');
const labels = document.querySelectorAll('label');

form.addEventListener('click', (e) => {
    var x = e.target;
    if(x.style.backgroundColor === "green"){
    x.style.backgroundColor = "gray";
    }
    else if(x.style.backgroundColor === "gray"){
    x.style.backgroundColor = "green";
    }
});

form.addEventListener('submit', (e) => {
    var xs = [];
    var ys = [];
    for (var i = 0; i < labels.length; i++) {
        if(labels[i].style.backgroundColor === "gray"){
            var res = labels[i].id.split(" ");
            ys.push(parseInt(res[0]));
            xs.push(parseInt(res[1]));
        }
    }
    const reqbody = {
        'id': form.id,
        'x_i': xs,
        'y_i': ys
    };
    fetch('/api/reservation/', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(reqbody)
    })
    .then(res => {
        console.log("touched");
        if (res.ok) {
            window.location.href = '/matches/' + form.id;
        } else {
            res.json().then (data => {
                showErrors(data.errors);
            });
        }
    })
    .catch(err => console.error(err));
});