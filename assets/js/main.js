import { getData } from "./config/configGetData.js";
import { getDataGit } from "./config/configGitData.js";
import {
  renderHabilities,
  renderIcon,
  renderSkill,
  renderCard,
  renderGitHubRepos,
} from "./data/renderingData.js";
import "./controller/dataControllerForm.js";
import "./function/funtinality.js";

async function main() {
  const data = await getData();
  const gitData = await getDataGit();

  renderHabilities(data.service);
  renderIcon(data.icon);
  renderSkill(data.skill);
  renderCard(data.card);
  renderGitHubRepos(gitData);
}

main();
