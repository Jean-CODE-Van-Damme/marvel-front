import axios from "axios";
import { useState, useEffect } from "react";

const Comics = ({ title, setTitle, page, setPage, limit, setLimit }) => {
  const [data, setdata] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
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

  const comicsArray = data.comics;
  // console.log("comicsArray >>>", comicsArray);

  return (
    <div>
      {isLoading ? (
        <p>Chargement</p>
      ) : (
        <div>
          <h2 className="h2-comics">Comics</h2>
          <div className="container">
            <div className="all-comics">
              {comicsArray.map((element, index) => {
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
                        <p>
                          Pas encore de description disponible pour ce Comics
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
  );
};

export default Comics;
