import axios from "axios";

export async function getMangerList() {
  return axios
    .get("/back/managers")
    .then((res) => res.data)
    .catch((error) => console.log(error));
}

export async function addManger(manager) {
  axios.post("/back/managers", JSON.stringify(manager), {
    headers: { "Content-Type": "application/json" },
  });
}

export async function deleteManger(manager) {
  axios.post("/back/managers", JSON.stringify(manager), {
    headers: { "Content-Type": "application/json" },
  });
}
