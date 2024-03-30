import { AppBar, Sidebar } from "@/components";
import { GamesStore } from "@/stores/GamesStore";
import { UserStore } from "@/stores/UserStore";
import { FunctionComponent } from "react";
import { useParams } from "react-router";
import { InfoBar, ContentHeader, ContentFooter } from "./components";

interface GamesInfoProps {}

const Game: FunctionComponent<GamesInfoProps> = () => {
  const params = useParams();
  const gameName = params.game;

  const { games } = GamesStore;
  const game = games?.find((game) => game.name === gameName);

  const { user } = UserStore;

  return (
    <section className="game-page">
      <div className="main flex">
        <Sidebar active="home" />
        <div className="content mt-5 mr-5 w-full">
          {user && <AppBar dashboard user={user} pageName="Game" />}

          <div className="p-2">
            <ContentHeader game={game} />
            <ContentFooter game={game} />
          </div>
        </div>
        <InfoBar game={game} />
      </div>
    </section>
  );
};

export default Game;