import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, Navigate } from "react-router-dom";

const CommicsWithCharacters = ({ tokenCookie }) => {
  const [data, setData] = useState({});
  const [data2, setData2] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { characterId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // requete vers le back vers la route comics/:character id pour afficher les comics
        // avec un charachter precis
        const response = await axios.get(
          `http://localhost:3002/comics/${characterId}`
        );
        // requete vers le back vers la route character/;character id pour recup
        // l img du charcacter principal
        const response2 = await axios.get(
          `http://localhost:3002/character/${characterId}`
        );

        setData(response.data);
        setData2(response2.data);
      } catch (error) {
        console.log(error.response);
      }
      setIsLoading(false);
    };
    fetchData();
  }, [characterId]);

  let nameOfPrincipalCharacter = data2.character_name;
  const comicswithcharacterArray = data.arrayOfComics;

  // Si il y a un token
  return tokenCookie ? (
    <>
      <div>
        {/* Si en chargement  */}
        {isLoading ? (
          <p>Chargement</p>
        ) : (
          <div>
            <h2 className="cwc-h2">Commics with {nameOfPrincipalCharacter}</h2>
            -he
            <div className="container">
              <div className="comic-with-character-principal">
                <img
                  className="comic-with-character-principal-img"
                  src={data.principalCharacterPicture}
                  alt="representation du personnage choisi"
                />
              </div>

              <div className="all-comic-with-character">
                {/* map de comicswithcharacterArray */}
                {comicswithcharacterArray.map((element) => {
                  return (
                    <div className="comic-with-character" key={element._id}>
                      {element.title && (
                        <div className="comic-with-character-title">
                          {element.title}
                        </div>
                      )}
                      {element.picture && (
                        <div className="comic-with-character-img">
                          <img
                            src={element.picture}
                            alt="representation du comics"
                          />
                        </div>
                      )}
                      {element.descritpion ? (
                        <div className="comic-with-character-descitpion">
                          {element.descritpion}
                        </div>
                      ) : (
                        <div className="comic-with-character-descitpion">
                          <p>
                            Pas encore de description disponible pour ce Comics{" "}
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  ) : (
    // Si il n y a pas de token : navgation directe vers la page Login.js
    <Navigate to="/login" />
  );
};

export default CommicsWithCharacters;
