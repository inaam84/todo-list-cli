const fs = require('fs');
const readlineSync = require('readline-sync');
const filePath = 'todos.json';

// Function to load the to-dos from the file
const loadTodos = () => {
    try {
        const dataBuffer = fs.readFileSync(filePath);
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    } catch (e) {
        return [];
    }
};

// Function to save the to-dos to the file
const saveTodos = (todos) => {
    const dataJSON = JSON.stringify(todos);
    fs.writeFileSync(filePath, dataJSON);
};

// Function to list all to-dos
const listTodos = () => {
    const todos = loadTodos();
    console.log('Your to-dos');
    todos.forEach((todo, index) => {
        console.log(`${index + 1}. ${todo.title} - ${todo.completed ? 'Completed' : 'Not Compelted'}`);
    });
};

// Function to add a new to-do
const addTodo = (title) => {
    const todos = loadTodos();
    todos.push({ title: title, completed: false });
    saveTodos(todos);
    console.log('New to-do added!');
};

// Function to toggle to-do
const toggleTodo = (index) => {
    const todos = loadTodos();
    if( index > 0 && index <= todos.length ) {
        todos[index - 1].completed = !todos[index - 1].completed;
        saveTodos(todos);
        console.log('To-do status toggled!');
    } else {
        console.log('Invalid index');
    }    
};

// Function to remove to-do
const removeTodo = (index) => {
    const todos = loadTodos();
    if (index > 0 && index <= todos.length) {
        todos.splice(index -1, 1);
        saveTodos(todos);
        console.log('To-do removed');
    } else {
        console.log('Invalid index');
    }
};

// Function to show the main menu and get user input
const showMenu = () => {
    console.log('\n1. Add a new to-do');
    console.log('2. List all to-dos');
    console.log('3. Remove a to-do');
    console.log('4. Toggle to-do completion');
    console.log('5. Exit');

    const choice = readlineSync.question('Choose an option: ');
    return choice;
};

// Main application loop
const main = () => {
    let running = true;

    while(running) {
        const choice = showMenu();

        switch(choice) {
            case '1':
                const title = readlineSync.question('Enter to-do title: ');
                addTodo(title);
                break;
            case '2':
                listTodos();
                break;
            case '3':
                const removeIndex = readlineSync.question('Enter the index of the to-do item to remove: ');
                removeTodo(removeIndex);
                break;
            case '4':
                const toggleIndex = readlineSync.question('Enter the index of the to-do item to toggle: ');
                toggleTodo(toggleIndex);
                break;
            case '5':
                running = false;
                console.log('Good Bye!');
                break;
            default:
                console.error('Invalid choice, please enter a number between 1 and 5.');
        }
    }
};

main();