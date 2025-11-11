import { getData } from "./config/configGetData.js";
import {
  renderHabilities,
  renderIcon,
  renderSkill,
  renderCard,
} from "./data/renderingData.js";
import "./controller/dataControllerForm.js";
import "./function/funtinality.js";

async function main() {
  const data = await getData();
  renderHabilities(data.service);
  renderIcon(data.icon);
  renderSkill(data.skill);
  renderCard(data.card);
}

main();
