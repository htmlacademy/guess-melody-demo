import {combineReducers} from "redux";
import {reducer as game} from "./game/game";
import {reducer as data} from "./data/data";
import {reducer as user} from "./user/user";
import NameSpace from "./name-spaces";

export default combineReducers({
  [NameSpace.GAME]: game,
  [NameSpace.DATA]: data,
  [NameSpace.USER]: user,
});
