import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Characters = ({ name, setName, page, setPage, limit, setLimit }) => {
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
        <p>Chargement</p>
      ) : (
        <div>
          <h2>Heroes</h2>
          <div className="container">
            <div className="all-characters">
              {charachtersArray.map((element) => {
                let characterId = element._id;
                // console.log("id >>>", characterId);
                return (
                  <Link
                    to={`/comics/${characterId}`}
                    className="character"
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

                    <div className="character-favorite">
                      <FontAwesomeIcon
                        className="character-icon-heart"
                        icon="heart"
                      />
                      <p>Add to Favorites Heroes</p>
                    </div>
                    {element.description ? (
                      <div className="character-description">
                        {element.description}
                      </div>
                    ) : (
                      <div className="character-description">
                        <p>
                          Pas encore de descritpion disponible pour ce
                          personnage
                        </p>
                      </div>
                    )}
                  </Link>
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
