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

const formToJSON = (form) => {
    const formData = new FormData(form);
    const data = {};
    formData.forEach((val, key) => {
        if (val != "") {
            data[key] = val;
        }
    });
    return JSON.stringify(data);
};

export {showErrors, formToJSON};