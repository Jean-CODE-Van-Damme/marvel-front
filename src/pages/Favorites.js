import { useState } from "react";
import { Navigate } from "react-router-dom";

const Favorites = ({
  favoriteArray,
  setFavoriteArray,
  favoriteArrayCharacter,
  setFavoriteArrayCharacter,
  tokenCookie,
  setTokenCookie,
}) => {
  // console.log("favoriteArray >>>", favoriteArray);
  // console.log(favoriteArray[0].title);
  return tokenCookie ? (
    <div>
      <div className="container">
        <section>
          <h2>Favorites Comics</h2>
          <div className="favorite-comics">
            {favoriteArray.map((element) => {
              return (
                <div className="favorite-comic">
                  <div className="favorite-comic-name">{element.title}</div>
                  <div className="favorite-comic-img">
                    <img src={element.picture} alt="representation du Comics" />
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
            {favoriteArrayCharacter.map((element) => {
              return (
                <div className="favorite-character">
                  <div className="favorite-character-name">{element.name}</div>
                  <div className="favorite-character-img">
                    <img src={element.picture} alt="representation du Comics" />
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
    </div>
  ) : (
    <Navigate to="/login" />
  );
};

export default Favorites;
