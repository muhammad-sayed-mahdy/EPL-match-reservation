const form = document.querySelector('[name = reservation_form]');
const labels = document.querySelectorAll('td');

form.addEventListener('click', (e) => {
    var x = e.target;
    if(x.classList.contains("btn-success")){
        x.classList.remove("btn-success");
        x.classList.add("btn-info");
    }
    else if(x.classList.contains("btn-info")){
        x.classList.remove("btn-info");
        x.classList.add("btn-success");
    }
});

const showErrors = (errors) => {
    const bodyContainer = document.getElementById('body-container');
    errors.forEach (err => {
        const div = document.createElement('div');
        div.className = "my-2 alert alert-danger alert-dismissible fade show";
        div.innerText = "Error! " + err.msg;
        
        const button = document.createElement('button');
        button.className = "close";
        button.type = "button";
        button.setAttribute('data-dismiss', "alert");
        button.innerHTML = "&times;";
        div.appendChild(button);    
        
        bodyContainer.appendChild(div);
    });
};

form.addEventListener('submit', (e) => {
    e.preventDefault();
    var xs = [];
    var ys = [];
    for (var i = 0; i < labels.length; i++) {
        if(labels[i].classList.contains("btn-info")){
            var res = labels[i].id.split(" ");
            ys.push(parseInt(res[0]));
            xs.push(parseInt(res[1]));
        }
    }
    const reqbody = {
        'id': form.id,
        'x_i': ys,
        'y_i': xs
    };
    console.log(reqbody);
    fetch('/api/reservation/', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(reqbody)
    })
    .then(res => {
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