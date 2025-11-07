import { getData } from "./data/getData.js";
import {
  renderHabilities,
  renderIcon,
  renderSkill,
  renderCard,
} from "./data/renderingData.js";
import "./function/funtinality.js";
import "./controller/dataControllerForm.js";

async function main() {
  const data = await getData();
  renderHabilities(data.service);
  renderIcon(data.icon);
  renderSkill(data.skill);
  renderCard(data.card);
}

main();
