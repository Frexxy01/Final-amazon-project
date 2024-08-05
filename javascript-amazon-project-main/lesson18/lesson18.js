/*const xhr = new XMLHttpRequest();

xhr.addEventListener('load', () => {
  console.log(xhr.response)
});

xhr.open('GET', 'https://supersimplebackend.dev/greeting')
xhr.send()
xhr.response
*/
/*
const b = fetch("https://supersimplebackend.dev/greeting").then((response) => {
  return response.text();
})
.then((text) => {
  console.log(text)
});
*/
/*
async function c() {
  await fetch("https://supersimplebackend.dev/greeting").then((response) => {
    return response.text();
  }).then((text) => {
    console.log(text)
  })
}
c();

data = {
  name: "Örkényi István"
}

fetch("https://supersimplebackend.dev/greeting", {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(data)
}).then((response) => {
  return response.text();
}).then((data) => {
  console.log(data)
})
/*
async function d() {
  await fetch("https://amazon.com").then((response) => {
    return response.text();
  }).then((text) => {
    console.log(text)
  }).catch((error) => {
    console.log('Your request was blocked by the server.')
  })
}
d();
*/
data = {
  name: "Örkényi István"
}

async function postGreeting() {
  try {
    const response = await fetch("https://supersimplebackend.dev/greeting", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
      },
    })
    if (response.status >= 400) {
      throw response
    }

    const text = await response.text();
    console.log(text);
  } catch(error) {
    if (error.status === 400) {
      const errorResponse = await error.json()
      console.log(errorResponse)
    } else {
      console.log("network error, please try again later")
    }
  }
}
postGreeting();


