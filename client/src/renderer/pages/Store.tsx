/* eslint-disable no-unneeded-ternary */
/* eslint-disable no-plusplus */
import React, { useEffect, useState } from 'react';
import StoreCard from '../components/StoreCard';
import Sidebar from '../components/Sidebar';
import PageTitle from '../components/PageTitle';

function Store() {
  const [games, setGames] = useState<any[]>();
  const [libraryGames, setLibraryGames] = useState<any[]>();

  useEffect(() => {
    async function FetchGames() {
      const gameData = await window.electron.gamesApi.getFetchedGames();
      setGames(gameData);
    }
    FetchGames();
    setLibraryGames(window.electron.gamesApi.getLibrary());
  }, []);

  // NOTE Sweet Spot for Sidebar adjustment is m-24
  return (
    <div>
      <Sidebar />
      <PageTitle pageTitle="Store" />
      <div
        style={{
          marginLeft: '6rem',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr 1fr',
          gridGap: '30px',
          alignItems: 'start',
        }}
      >
        {games?.map((game) => {
          return (
            <StoreCard
              name={game.name}
              description={game.description}
              logo={`${game.logo}`}
              tags={game.tags}
              owned={libraryGames?.find(
                (libraryGame) => libraryGame.name === game.name
              )}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Store;
