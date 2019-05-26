import {combineReducers} from "redux";
import {reducer as game} from "./game/game";
import {reducer as data} from "./data/data";
import {reducer as user} from "./user/user";

export default combineReducers({
  game,
  data,
  user,
});
