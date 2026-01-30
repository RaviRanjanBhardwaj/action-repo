// Sample Application File
// This file is part of the action-repo demonstration

function main() {
    console.log('GitHub Webhook Demo Application');
    console.log('This repository triggers webhook events on Push, Pull Request, and Merge actions');
}

// Example function for testing commits
function helloWorld() {
    return 'Hello, World!';
}

// Example function for testing pull requests
function calculateSum(a, b) {
    return a + b;
}

// Run the main function
main();

module.exports = {
    main,
    helloWorld,
    calculateSum
};
