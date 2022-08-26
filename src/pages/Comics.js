import axios from "axios";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Navigate } from "react-router-dom";

const Comics = ({ title, page, limit, tokenCookie }) => {
  const [data, setdata] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `  https://marvel-back-63.herokuapp.com/comics?title=${
            title ? title : ""
          }&page=${page ? page : ""}&limit=${limit && limit}`
        );
        setdata(response.data);
        // console.log("dataComics >>>", response.data);
      } catch (error) {
        console.log(error.response);
      }
      setIsLoading(false);
    };

    fetchData();
  }, [title, page, limit]);

  // recuperation du array de Comics depuis la date
  const comicsArray = data.comics;
  // console.log("comicsArray >>>", comicsArray);

  return tokenCookie ? (
    <div>
      {/* Si chargement  */}
      {isLoading ? (
        <p className="chargement">Chargement</p>
      ) : (
        <div>
          <h2 className="h2-comics">Comics</h2>
          <div className="container">
            <div className="all-comics">
              {/* Map sur comicsArray  */}
              {comicsArray.map((element, index) => {
                let comicId = element.comics_id;
                console.log("comicsId >>>", comicId);
                return (
                  <div className="comics" key={index}>
                    {element.title && (
                      <div className="comics-title">{element.title}</div>
                    )}
                    {element.picture && (
                      <div className="comics-img">
                        <img
                          src={element.picture}
                          alt=" representation du comics"
                        />
                      </div>
                    )}

                    {element.description ? (
                      <div className="comics-description">
                        {element.description}
                      </div>
                    ) : (
                      <div className="comics-description">
                        <p>No desciption yet</p>
                      </div>
                    )}
                    <div
                      className="comics-favorite"
                      onClick={async () => {
                        // transmition comicId et cookieToken vers le back : gestion de sfavoris

                        const response2 = await axios.post(
                          // requete vers le back pour la gestion des favoris
                          `  https://marvel-back-63.herokuapp.com/user/favorite/comic/${comicId}`,
                          {
                            tokenCookie: tokenCookie,
                            title: element.title,
                            description: element.description,
                            picture: element.picture,
                          }
                        );
                        console.log(response2);
                      }}
                    >
                      <FontAwesomeIcon
                        className="comics-icon-heart"
                        icon="heart"
                      />
                      <p>Add to Favorites</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  ) : (
    <Navigate to="/login" />
  );
};

export default Comics;
