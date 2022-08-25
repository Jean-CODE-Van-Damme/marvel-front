import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Characters = ({
  name,
  setName,
  page,
  setPage,
  limit,
  setLimit,
  favoriteArrayCharacter,
  setFavoriteArrayCharacter,
  tokenCookie,
}) => {
  const [data, setdata] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3002/characters?name=${name ? name : ""}&page=${
            page ? page : ""
          }&limit=${limit}`
        );
        setdata(response.data);
        // console.log("datacharacter >>>", response.data.characters);
        // console.log("numberOgPages >>>", response.data.numberOfPages);
      } catch (error) {
        console.log(error.response);
      }
      setIsLoading(false);
    };
    fetchData();
  }, [name, page, limit]);

  const charachtersArray = data.characters;
  // console.log("array >>>", charachtersArray);

  return (
    <div>
      {isLoading ? (
        <p className="chargement">Chargement</p>
      ) : (
        <div>
          <h2>Heroes</h2>
          <div className="container">
            <div className="all-characters">
              {charachtersArray.map((element) => {
                let characterId = element._id;
                // console.log("id >>>", characterId);
                return (
                  <>
                    <div className="big-card">
                      <Link
                        className="character"
                        to={`/comics/${characterId}`}
                        key={characterId}
                      >
                        {element.name && (
                          <div className="character-title">{element.name} </div>
                        )}
                        {element.picture && (
                          <div className="character-img">
                            <img
                              src={element.picture}
                              alt="representation du personnage"
                            />
                          </div>
                        )}

                        {element.description ? (
                          <div className="character-description">
                            {element.description}
                          </div>
                        ) : (
                          <div className="character-description">
                            <p>No desciption yet</p>
                          </div>
                        )}
                      </Link>
                      <div
                        className="character-favorite"
                        onClick={async () => {
                          let copyFavoriteArrayCharacter = [
                            ...favoriteArrayCharacter,
                          ];
                          copyFavoriteArrayCharacter.push(element);
                          setFavoriteArrayCharacter(copyFavoriteArrayCharacter);

                          const response2 = await axios.post(
                            `http://localhost:3002/user/favorite/character/${characterId}`,
                            { tokenCookie: tokenCookie }
                          );
                        }}
                      >
                        <FontAwesomeIcon
                          className="character-icon-heart"
                          icon="heart"
                        />
                        <p>Add to Favorites</p>
                      </div>
                    </div>
                  </>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Characters;
