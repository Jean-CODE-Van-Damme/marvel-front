import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const Favorites = ({ tokenCookie }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // requete vers route get pour recup tab des characters favoris
        const response = await axios.get(
          `  https://marvel-back-63.herokuapp.com/user/favorite/character`,
          { headers: { Authorization: tokenCookie } }
        );
        console.log(response.data);

        // requete vers route get pour recup tab des comics favoris
        const response2 = await axios.get(
          `  https://marvel-back-63.herokuapp.com/user/favorite/comic`,
          { headers: { Authorization: tokenCookie } }
        );

        console.log(response2.data);
        setData(response.data);
        setData2(response2.data);
      } catch (error) {
        console.log(error.response);
      }
      setIsLoading(false);
    };
    fetchData();
  }, [tokenCookie]);

  const favoriteArrayComic = data2;
  const favoriteArrayCharacter = data;

  // Si il y a un token
  return tokenCookie ? (
    <div>
      {isLoading ? (
        <p>Chargement</p>
      ) : (
        <div className="container">
          <section>
            <h2>Favorites Comics</h2>
            <div className="favorite-comics">
              {/* map  favoriteArrayComic >>> Comics favoris  */}
              {favoriteArrayComic.map((element) => {
                return (
                  <div className="favorite-comic" key={element.id}>
                    <div className="favorite-comic-name">{element.title}</div>
                    <div className="favorite-comic-img">
                      <img
                        src={element.picture}
                        alt="representation du Comics"
                      />
                    </div>
                    {element.description ? (
                      <div className="favorite-comic-description">
                        {element.description}
                      </div>
                    ) : (
                      <div className="favorite-comic-description">
                        <p>No descitpion yet</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
          <section>
            <h2>Favorites Heroes</h2>
            <div className="favorite-characters">
              {/* map  favoriteArrayCharacter >>> Characters favoris  */}
              {favoriteArrayCharacter.map((element) => {
                return (
                  <div className="favorite-character" key={element.id}>
                    <div className="favorite-character-name">
                      {element.name}
                    </div>
                    <div className="favorite-character-img">
                      <img
                        src={element.picture}
                        alt="representation du Comics"
                      />
                    </div>

                    {element.description ? (
                      <div className="favorite-character-description">
                        {element.description}
                      </div>
                    ) : (
                      <div className="favorite-character-description">
                        <p>No descitpion yet</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        </div>
      )}
    </div>
  ) : (
    // Si il n y a pas de token : Navigation directe vers la page Login.js
    <Navigate to="/login" />
  );
};

export default Favorites;
