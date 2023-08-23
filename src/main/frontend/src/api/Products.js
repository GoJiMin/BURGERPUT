import axios from "axios";

// 달라진 목록을 받아오는 api
export async function getDiffInven() {
  return await axios
    .get("/back/main")
    .then((res) => res.data)
    .catch((error) => console.log(error));
}

// 기기 목록을 받아오는 api
export async function getMachines() {
  return await axios
    .get("/back/select/machines")
    .then((res) => res.data)
    .finally(console.log("데이터를 받아왔음"))
    .catch((error) => console.log(error));
}

// 식품 목록을 받아오는 api
// export async function getFoods() {
//   return await axios
//     .get("/back/select/foods")
//     .then((res) => res.data)
//     .catch((error) => console.log(error));
// }

export async function getFoods() {
  return fetch("/data/foods.json").then((res) => res.json());
}

// 선택한 기기 목록을 전송하는 api
export async function setCustomMachines(customMachines) {
  await axios.post("/back/select/machines", JSON.stringify(customMachines), {
    headers: { "Content-Type": "application/json" },
  });
}

// 선택한 식품 목록을 전송하는 api
export async function setCustomFoods(customFoods) {
  await axios.post("/back/select/machines", JSON.stringify(customFoods), {
    headers: { "Content-Type": "application/json" },
  });
}

// 선택한 기기 목록을 받아오는 api
export async function getCustomMachines() {
  return await axios
    .get("/back/enter/machines")
    .then((res) => res.data)
    .catch((error) => console.log(error));
}

// 완료된 기기 온도 값을 전달하는 api
export async function submitMachines(machines) {
  await axios.post("/back/enter/machines", JSON.stringify(machines), {
    headers: { "Content-Type": "application/json" },
  });
}

// 선택한 식품 목록을 받아오는 api
export async function getCustomFoods() {
  return await axios
    .get("/back/enter/foods")
    .then((res) => res.data)
    .catch((error) => console.log(error));
}

// 완료된 식품 온도 값을 전달하는 api
export async function submitFoods(foods) {
  await axios.post("/back/enter/foods", "hi", {
    headers: { "Content-Type": "application/json" },
  });
}
