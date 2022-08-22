import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const CommicsWithCharacters = () => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { characterId } = useParams();
  // console.log("characterId >>>", characterId);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3002/comics/${characterId}`
        );

        setData(response.data);
        console.log("response >>>", response.data);
      } catch (error) {
        console.log(error.response);
      }
      setIsLoading(false);
    };
    fetchData();
  }, [characterId]);

  const comicswithcharacterArray = data.arrayOfComics;
  console.log("comicswithcharacterArray >>>", comicswithcharacterArray);

  return (
    <>
      <div>
        {isLoading ? (
          <p>Chargement</p>
        ) : (
          <div>
            <h2>Commics with your favorite Character</h2>
            <div className="container">
              <div className="comic-with-character-principal">
                <img
                  className="comic-with-character-principal-img"
                  src={data.principalCharacterPicture}
                  alt="representation du personnage choisi"
                />
              </div>
              <div className="all-comic-with-character">
                {comicswithcharacterArray.map((element) => {
                  return (
                    <div className="comic-with-character">
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
  );
};

export default CommicsWithCharacters;
