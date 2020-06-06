/* eslint-disable no-console */

//
// There we are trying to get the user, but this won't work as expected
//
function getUser(id) {
  setTimeout(() => {
    console.log('getUser: Reading a user from a database...');
    return { id, username: 'mark' };
  }, 500);
}

const doesntWork = false;
if (doesntWork) {
  console.log('Before');
  const syncUser = getUser(1);
  // Not what we expect
  console.log(syncUser);
  console.log('After');
}

//
// Demonstrating Callback method
//

// Callbacks
function getUserCallback(id, callback) {
  setTimeout(() => {
    console.log('getUserCallback: Reading a user from a database...', id);
    callback({ id, username: 'mark' });
  }, 500);
}

function getRepositoriesCallback(username, callback) {
  setTimeout(() => {
    console.log('getRepositories ...', username);
    callback(['repo1', 'repo2', 'repo3']);
  }, 500);
}

function getCommitsCallback(repos, callback) {
  setTimeout(() => {
    console.log('getCommits ...', repos);
    callback(['commit1', 'commit2', 'commit3']);
  }, 500);
}

// Callback method
// This works but puts us in callback hell
// Too many nested things

const useCallbacks = false;
if (useCallbacks) {
  getUserCallback(1, (user) => {
    console.log('User: ', user);
    getRepositoriesCallback(user, (repos) => {
      console.log('Repos:', repos);
      getCommitsCallback(repos, (commits) => {
        console.log('commits', commits);
      });
    });
  });
}

//
// Cleaner
// Callback method but using named functions, makes it easier to read
//

function displayCommits(commits) {
  console.log('commits', commits);
}

function getCommits(repos) {
  console.log('Repos:', repos);
  getCommitsCallback(repos, displayCommits);
}

function getRepositories(user) {
  console.log('User: ', user);
  getRepositoriesCallback(user, getCommits);
}

const useCallbacksWithNamedFunctions = false;
if (useCallbacksWithNamedFunctions) {
  getUserCallback(1, getRepositories);
}

//
// Promises - Holds eventual result of an asynchronous operation
//
const keepPromise = true;
const p = new Promise((resolve, reject) => {
  // Kick off async work
  // ...
  console.log(new Date());
  setTimeout(() => {
    console.log(new Date());
    if (keepPromise) {
      resolve('This is how you keep a promise'); // pending => resolved (fulfilled)
    } else {
      reject(new Error('This is how you break a promise')); // pending => rejected
    }
  }, 500);
});

p.then((result) => {
  console.log('Kept promise: ', result);
}).catch((error) => {
  console.log('Broken promise: ', error.message);
});

//
// Demonstrating Promises method
//

// Promises
function getUserPromise(id) {
  // eslint-disable-next-line no-unused-vars
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('getUserPromise ...', id);
      resolve({ id, username: 'mark' });
    }, 500);
  });
}

function getRepositoriesPromise(username) {
  // eslint-disable-next-line no-unused-vars
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('getRepositoriesPromise ...', username);
      resolve(['repo1', 'repo2', 'repo3']);
      // reject("Promises and repositories don't mix");
    }, 500);
  });
}

function getCommitsPromise(repos) {
  // eslint-disable-next-line no-unused-vars
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('getCommitsPromise ...', repos);
      resolve(['commit1', 'commit2', 'commit3']);
    }, 500);
  });
}

//
// Promise method
//

const usePromises = false;
if (usePromises) {
  getUserPromise(1)
    .then((user) => getRepositoriesPromise(user))
    .then((repos) => getCommitsPromise(repos))
    .then((commits) => console.log('Promises promises', commits))
    .catch((error) => console.log('Error', error));
}

// We can create promises that are already resolved or rejected
const resolved = Promise.resolve({ id: 1 });
resolved.then((result) => console.log('This is already resolved: ', result));

const rejected = Promise.reject(new Error('I am not wanted'));
rejected.catch((error) => console.log('This is already rejected: ', error.message));

//
// We can even do multiple promises
//
const p1 = new Promise((resolve) => {
  setTimeout(() => {
    console.log('First promise');
    resolve('First response');
  }, 3000);
});
const p2 = new Promise((resolve) => {
  setTimeout(() => {
    console.log('Second promise');
    resolve('Second response');
  }, 500);
});

Promise.all([p1, p2]).then((result) => console.log('All promises settled:', result));
Promise.race([p1, p2]).then((result) => console.log('Any promise settled:', result));

//
// Using async and await
//
async function doAsync() {
  try {
    console.log('Async...');
    const user = await getUserPromise(1);
    const repos = await getRepositoriesPromise(user);
    const commits = await getCommitsPromise(repos);
    console.log('Async... we got commits:', commits);
  } catch (error) {
    console.log('Errors show up here:', error.message);
  }
}

const useAwait = true;
if (useAwait) doAsync();
