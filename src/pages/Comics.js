import axios from "axios";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Navigate } from "react-router-dom";

const Comics = ({
  title,
  setTitle,
  page,
  setPage,
  limit,
  setLimit,
  favoriteArray,
  setFavoriteArray,
  tokenCookie,
  setTokenCookie,
}) => {
  const [data, setdata] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        {
          /* Affichage des labels selon la localisation */
        }
        const response = await axios.get(
          `http://localhost:3002/comics?title=${title ? title : ""}&page=${
            page ? page : ""
          }&limit=${limit && limit}`
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
                        // on push dans le state favoriteArray les favoris
                        let copyFavoriteArray = [...favoriteArray];
                        copyFavoriteArray.push(element);
                        setFavoriteArray(copyFavoriteArray);
                        // transmition comicId et token user vers le back

                        const response2 = await axios.post(
                          `http://localhost:3002/user/favorite/comic/${comicId}`,
                          { tokenCookie: tokenCookie }
                        );
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
