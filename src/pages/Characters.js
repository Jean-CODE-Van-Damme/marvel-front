import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Characters = ({ name, page, limit, tokenCookie }) => {
  const [data, setdata] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // requete vers le back avec param name, page et limit
        const response = await axios.get(
          `  https://marvel-back-63.herokuapp.com/characters?name=${
            name ? name : ""
          }&page=${page ? page : ""}&limit=${limit}`
        );

        setdata(response.data);
      } catch (error) {
        console.log(error.response);
      }
      setIsLoading(false);
    };
    fetchData();
  }, [name, page, limit]);

  // recup tableau des characters depuis la data
  const charachtersArray = data.characters;

  return (
    <div>
      {/* Si chargment en cours  */}
      {isLoading ? (
        <p className="chargement">Chargement</p>
      ) : (
        <div>
          <h2>Heroes</h2>
          <div className="container">
            <div className="all-characters">
              {/* map de charactersArray */}
              {charachtersArray.map((element) => {
                let characterId = element._id;
                // console.log("id >>>", characterId);
                return (
                  <>
                    <div className="big-card">
                      {/* Lien vers la page /comics/:characterId */}
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
                          // transmition characterId et cookieToken vers le back : gestion de sfavoris
                          const response2 = await axios.post(
                            `  https://marvel-back-63.herokuapp.com/user/favorite/character/${characterId}`,
                            {
                              tokenCookie: tokenCookie,
                              name: element.name,
                              description: element.description,
                              picture: element.picture,
                            }
                          );
                          console.log(response2);
                        }}
                      >
                        <FontAwesomeIcon
                          className="character-icon-heart"
                          icon="heart"
                        />
                        <p>Add to favorites</p>
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
