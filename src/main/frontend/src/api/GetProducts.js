// export async function getMachines() {
//   return fetch("/data/machines.json").then((res) => res.json());
// }

export async function getFoods() {
  return fetch("/data/foods.json").then((res) => res.json());
}

// 식품 목록을 받아오는 api
// export async function getFoods() {
//   return axios.get('/select/foods').then(res => res.json()).catch(error => console.log(error))}
export async function getCustomMachines() {
  return fetch("/data/custommachines.json").then((res) => res.json());
}

export async function getCustomFoods() {
  return fetch("/data/custommachines.json").then((res) => res.json());
}
