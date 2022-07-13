import { MANAGER_STATS_API } from "../constants";
import { makeRequest } from "../util";

const fetchManagerStats = async () => {
  let managerStats = await makeRequest({
    url: MANAGER_STATS_API,
    type: "get",
  });

  try {
    managerStats = JSON.parse(JSON.stringify(managerStats));
  } catch (err) {
    console.error("Failed to parse data", err);
    managerStats = {};
  }
  return managerStats;
};

export { fetchManagerStats };
