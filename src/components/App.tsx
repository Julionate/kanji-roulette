import { CreateList } from "./CreateList";
import { Roulette } from "./Roulette";
import { route } from "../lib/Routing";

export const App = () => {
  return route.getRoute() === "Create List" ? <CreateList /> : <Roulette />;
};
