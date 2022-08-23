import { useState } from "react";

const Favorites = ({
  favoriteArray,
  setFavoriteArray,
  favoriteArrayCharacter,
  setFavoriteArrayCharacter,
}) => {
  // console.log("favoriteArray >>>", favoriteArray);
  // console.log(favoriteArray[0].title);
  return (
    <div>
      <section className="favorite-comics">
        <h2>Favorites Comics</h2>
        {/* {favoriteArray.map((element) => {
        return (
          <div>
            <div>{element.title}</div>
            <div>
              <img src={element.picture} alt="representation du Comics" />
            </div>
            <div>{element.description}</div>
          </div>
        );
      })} */}
      </section>
      <section className="favorite-characters"></section>
    </div>
  );
};

export default Favorites;
