const input = document.querySelector('input');
const button = document.querySelector('button');
const list = document.querySelector('ul');

// Adds item to list.
button.addEventListener('click', () => {
    // Ends functin if input is empty.
    if (input.value == "") {
        return
    };
    // Save input value and whipes input text field.
    const inputValue = input.value;
    input.value = '';

    // New Item content.
    const listItem = document.createElement('li');
    listItem.textContent = inputValue;
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'X';
    listItem.appendChild(deleteBtn);
    list.appendChild(listItem);

    // Deletes list item.
    deleteBtn.addEventListener('click', () => {
        list.removeChild(listItem);
        input.focus();
    });
    input.focus();
});