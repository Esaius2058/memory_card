import { useState, useEffect } from "react";
import loadingGif from "../assets/loadingGif.gif"

const Cards = () => {
  const [animeData, setAnimeData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [charList, setCharList] = useState([]);
  const [currScore, setCurrScore] = useState(0);
  const [highestScore, setHighestScore] = useState(0);
  const [clickedCards, setClickedCards] = useState([]);
  const [win, setWin] = useState(false);

  const shuffleCards = (buttonId) => {
    if (animeData?.data?.Media?.characters?.nodes) {
      const shuffledCards = [...charList].sort(
        () => Math.random() - 0.5
      );
      setAnimeData({
        ...animeData,
        data: {
          ...animeData.data,
          Media: {
            ...animeData.data.Media,
            characters: {
              nodes: shuffledCards,
            },
          },
        },
      });
    }

    updateScore(buttonId);
  };

  const updateScore = (buttonId) => {
    if (!clickedCards.includes(buttonId)) {
      const newScore = currScore + 1;
      setCurrScore(newScore);
      setClickedCards([...clickedCards, buttonId]);

      if (currScore > highestScore) {
        setHighestScore(newScore);
      }

      if (newScore === 12) {
        setWin(true);
      }
    } else {
      setClickedCards([]);
      setCurrScore(0);
    }
  };

  const resetGame = () => {
    setLoading(true);
    setClickedCards([]);
    setCurrScore(0);
    setHighestScore(0);
    setWin(false);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  };

  useEffect(() => {
    const fetchAnimeData = async () => {
      const url = "https://graphql.anilist.co";

      const query = `
            query ($search: String!) {
                Media(search: $search, type: ANIME){
                    id
                    title {
                        romaji
                        english
                        native
                    }
                    characters {
                        nodes {
                            name {
                                full
                            }
                            image {
                                large
                                medium
                            }
                        }
                    }
                }
            }
        `;

      const variables = {
        search: "yu gi oh gx",
      };

      try {
        const response = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            query: query,
            variables: variables,
          }),
          mode: "cors",
        });

        const data = await response.json();
        setAnimeData(data);
        setCharList(data.data.Media.characters.nodes);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchAnimeData();
  }, []);

  if (loading) return (
      <div className="loading-container">
        <img src={loadingGif} alt="Loading..." className="loading-gif" />
        <p>Loading Cards...</p>
      </div>
    );

  return (
    <div>
      {!loading && !win && (
        <>
        <div className="instructions">
          <h3>Click each card once. 
            Try to remember the cards you&apos;ve already clicked and don&apos;t click them again.</h3>
        </div>
          <div className="score">
            <h2>Score: {currScore}</h2>
            <h2>Highest Score: {highestScore}</h2>
          </div>
          <div className="card-container">
            {animeData?.data?.Media?.characters?.nodes
              .slice(0, 12)
              .map((character, index) => (
                <button
                  key={index}
                  id={index}
                  onClick={() => shuffleCards(character)}
                  className="card"
                >
                  <div>
                    <img
                      src={character.image.large}
                      alt={character.name.full}
                    />
                    <p>{character.name.full}</p>
                  </div>
                </button>
              ))}
          </div>
        </>
      )}
      {win && (
        <div className="game-over">
          <h1>{"Congratulations! You Won"}</h1>
          <h2>Score : {currScore}</h2>
          <h2>Highest score : {highestScore}</h2>
          <button onClick={resetGame}>Play Again</button>
        </div>
      )}
    </div>
  );
};

export default Cards;
