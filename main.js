const templateElement = document.getElementById('joke-element');

const jokesListElement = document.querySelector('.jokes-list');
const loaderElement = document.querySelector('.loader');

const fetchJokes = async numberOfJokes => {
  const url = `https://official-joke-api.appspot.com/jokes/random/${numberOfJokes}`;

  try {
    const response = await fetch(url);

    return await response.json();
  } catch (error) {
    console.error(error);
  } finally {
    loaderElement.remove();
  }
};

(async () => {
  const jokesData = await fetchJokes(25);

  const jokesList = jokesData.map(joke => {
    const { type, setup, punchline } = joke;

    const jokeElement = document.importNode(
      templateElement.content,
      true
    ).firstElementChild;

    const jokeTypeElement = jokeElement.querySelector('.joke-type');
    const jokeSetupElement = jokeElement.querySelector('.joke-setup');
    const jokePunchlineElement = jokeElement.querySelector('.joke-punchline');

    jokeTypeElement.textContent = `Type: ${type}`;
    jokeSetupElement.textContent = setup;
    jokePunchlineElement.textContent = punchline;

    return jokeElement;
  });

  jokesList.forEach(joke => jokesListElement.appendChild(joke));
})();
