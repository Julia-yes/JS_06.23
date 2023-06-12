function createDebounceFunction(callback, num) {
  if (typeof callback !== "function") {
    throw new Error("Invalid argument");
  }
  if (typeof num !== "number" || !Number.isFinite(num) || !Number.isInteger(num) || num < 0) {
    throw new Error("Invalid argument");
  }
  let timerId;
  return function () {
    clearTimeout(timerId);
    timerId = setTimeout(callback, num);
  };
}

class RickAndMorty {
  getCharacter(id) {
    if (typeof id !== "number" || !Number.isFinite(id) || !Number.isInteger(id) || id < 0) {
      throw new Error("Invalid character id");
    }

    const URL = `https://rickandmortyapi.com/api/character/${id}`;
    return fetch(URL)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error();
        }
      })
      .catch(() => null);
  }
  async getEpisode(id) {
    if (typeof id !== "number" || !Number.isFinite(id) || !Number.isInteger(id) || id < 0) {
      throw new Error("Invalid episode id");
    }
    try {
      const URL = `https://rickandmortyapi.com/api/episode/${id}`;
      const response = await fetch(URL);
      if (response.ok) {
        return response.json();
      } else {
        throw new Error();
      }
    } catch {
      return null;
    }
  }
}
