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
      <section className="favorite-comics">
        <h2>Favorites Comics</h2>
        {favoriteArray.map((element) => {
          return (
            <div>
              <div>{element.title}</div>
              <div>
                <img src={element.picture} alt="representation du Comics" />
              </div>
              <div>{element.description}</div>
            </div>
          );
        })}
      </section>
      <section className="favorite-characters">
        <h2>Favorites Heroes</h2>
        {favoriteArrayCharacter.map((element) => {
          return (
            <div>
              <div>{element.name}</div>
              <div>
                <img src={element.picture} alt="representation du Comics" />
              </div>
              <div>{element.description}</div>
            </div>
          );
        })}
      </section>
    </div>
  ) : (
    <Navigate to="/login" />
  );
};

export default Favorites;
