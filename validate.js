const form = document.getElementById('form');
const inputs = form.querySelectorAll('input');
const success = document.getElementById('success');

const rules = {
    name: { required: true, minLength: 3, pattern: /^[a-zA-Z\s]+$/, msg: { required: 'Name required', minLength: 'Min 3 chars', pattern: 'Letters only' } },
    email: { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, msg: { required: 'Email required', pattern: 'Invalid email' } },
    password: { required: true, minLength: 8, msg: { required: 'Password required', minLength: 'Min 8 chars' } },
    phone: { required: true, pattern: /^\d{10}$/, msg: { required: 'Phone required', pattern: '10 digits only' } }
};

function validate(id) {
    const input = document.getElementById(id);
    const errElem = document.getElementById(id + 'Err');
    const rule = rules[id];
    const value = input.value.trim();
    let error = '';

    if (rule.required && !value) error = rule.msg.required;
    else if (rule.minLength && value.length < rule.minLength) error = rule.msg.minLength;
    else if (rule.pattern && value && !rule.pattern.test(value)) error = rule.msg.pattern;

    if (error) {
        input.classList.add('error');
        errElem.textContent = error;
        errElem.classList.add('show');
        return false;
    } else {
        input.classList.remove('error');
        errElem.classList.remove('show');
        return true;
    }
}

inputs.forEach(input => {
    input.addEventListener('blur', () => validate(input.id));
    input.addEventListener('input', () => input.classList.contains('error') && validate(input.id));
});

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const isValid = Array.from(inputs).every(input => validate(input.id));
    
    if (isValid) {
        form.style.display = 'none';
        success.style.display = 'block';
        setTimeout(() => {
            form.reset();
            form.style.display = 'block';
            success.style.display = 'none';
            inputs.forEach(input => input.classList.remove('error'));
        }, 2000);
    }
});