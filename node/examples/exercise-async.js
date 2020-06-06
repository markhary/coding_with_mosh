/* eslint-disable no-unused-vars */
/* eslint-disable no-console */

// Exercise for Awynchronous module

function getCustomer(id) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: 1,
        name: 'Mosh Hamedani',
        isGold: true,
        email: 'email',
      });
    }, 4000);
  });
}

function getTopMovies() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(['movie1', 'movie2']);
    }, 4000);
  });
}

function sendEmail(email, movies) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 4000);
  });
}

async function sendEmails() {
  try {
    const customer = await getCustomer(1);
    console.log('Customer:', customer);
    if (customer.isGold) {
      const movies = await getTopMovies();
      console.log('Movies:', movies);
      await sendEmail(customer.email, movies);
      console.log('Email sent...');
    }
  } catch (error) {
    console.log('sendEmails(): Error occurred', error.message);
  }
}

sendEmails();
