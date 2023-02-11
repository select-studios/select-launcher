import { AppBar, Loader, Sidebar, GameCard } from "@/components";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { logout, getGameInfo } from "@/handlers/api";
import { useCookies } from "react-cookie";
import protectRoute from "@/handlers/api/utils/protectRoute";
import { LoadingState } from "@/components/loader/loader.component";
import GameInfo from "@/interfaces/GameInfoInterface";
import { motion } from "framer-motion";
import {
  Alert,
  alertConfig,
  removeAlert,
} from "@/components/alert/alert.component";
import { Button, Container } from "@nextui-org/react";
import ButtonLoader from "@/components/loader/button/buttonloader.component";

export const Home: React.FC = () => {
  const [user, setUser] = useState<any>();
  const [cookies, setCookie, removeCookie] = useCookies([
    "accessToken",
    "refreshToken",
  ]);
  const [loading, setLoading] = useState<LoadingState>({
    state: true,
    msg: "",
  });
  const [gamesInfo, setGamesInfo] = useState<GameInfo[] | undefined>();
  const [alert, setAlert] = useState(alertConfig);
  const navigate = useNavigate();

  const logoutClient = () => {
    logout(cookies.refreshToken, setLoading, removeCookie, navigate);
  };

  useEffect(() => {
    protectRoute(cookies, setCookie, setUser, setLoading, navigate);

    async function retrieveGameInfo() {
      const fetchedGameInfo = await getGameInfo();

      if (fetchedGameInfo) {
        setGamesInfo(fetchedGameInfo);
      }
    }

    retrieveGameInfo();
  }, []);

  useEffect(() => {
    removeAlert(setAlert);
  }, [alert]);

  return !loading.state ? (
    <div>
      <motion.div exit={{ opacity: 0 }}>
        <Container fluid className="home">
          <AppBar
            dashboard={true}
            user={user}
            logoutFn={logoutClient}
            loggingOut={loading.state}
          />
          <div className="flex">
            <Sidebar active="home" />

            <div className="mt-10">
              <div className="grid w-full ml-16 grid-cols-3">
                {gamesInfo?.map((gameInfo, i) => {
                  return <GameCard key={i} game={gameInfo} />;
                })}
              </div>
            </div>
          </div>
        </Container>
      </motion.div>
      <Alert show={alert.show} msg={alert.msg} type={alert.type} />
    </div>
  ) : (
    <Loader msg={loading.msg} />
  );
};
