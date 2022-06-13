const Marvelservice = () => {
  const _base_url = "https://gateway.marvel.com:443/v1/public/characters";
  // const _api = "7aee92fdbe4f8e13d3e13670a06c2326";
  const _api2 = "822d48b4f5a740b9691a4e0ec595c376";

  async function getResource(url) {
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Could not fetch ${url} status ${res.status}`);
    }
    return await res.json();
  }

  const getAllcharacters = async () => {
    const res = await getResource(
      `${_base_url}?limit=9&offset=210&apikey=${_api2}`
    );
    return res.data.results.map(_transformCharacter);
  };

  const getCharacterId = async (id) => {
    const res = await getResource(`${_base_url}/${id}?apikey=${_api2}`);
    return _transformCharacter(res.data.results[0]);
  };

  const _transformCharacter = (char) => {
    return {
      id: char.id,
      name: char.name,
      description: char.description,
      thumbnail: char.thumbnail.path + "." + char.thumbnail.extension,
      url: char.urls[0].url,
      wiki: char.urls[1].url,
    };
  };

  return { getAllcharacters, getCharacterId };
};

export default Marvelservice;