const selectors = {
    root: '[data-js-header]',
    overlay: '[data-js-header-overlay]',
    burgerButton: '[data-js-header-burger-button]'
};

const stateClasses = {
    isActive: 'is-active',
    isLock: 'is-lock',
};

const initHeader = () => {
    const rootElement = document.querySelector(selectors.root);
    const overlayElement = rootElement.querySelector(selectors.overlay);
    const burgerButtonElement = rootElement.querySelector(selectors.burgerButton);

    const onBurgerButtonClick = () => {
        burgerButtonElement.classList.toggle(stateClasses.isActive);
        overlayElement.classList.toggle(stateClasses.isActive);
        document.documentElement.classList.toggle(stateClasses.isLock);
    };

    burgerButtonElement.addEventListener('click', onBurgerButtonClick);
};

initHeader();


document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.form__contact-form');

    form.addEventListener('submit', (event) => {
        event.preventDefault(); 

        
        if (!form.checkValidity()) {
            alert('Please fill in all fields correctly!');
            return;
        }

        const formData = new FormData(form);

        
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });

        
        fetch('/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then(response => {
                if (response.ok) {
                    alert('Form successfully submitted!');
                    form.reset();
                } else {
                    alert('Something went wrong, please try again.');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('An error occurred while submitting the form.');
            });
    });
});

