const readlineSync = require('readline-sync');

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
                console.log(title + ' added');
                break;
            case '2':
                console.log('List of all to-dos');
                break;
            case '3':
                const removeIndex = readlineSync.question('Enter the index of the to-do item to remove: ');
                console.log(removeIndex + ' removed');
                break;
            case '4':
                const toggleIndex = readlineSync.question('Enter the index of the to-do item to toggle: ');
                console.log(toggleIndex + ' toggled');
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