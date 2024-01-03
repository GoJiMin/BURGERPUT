import axios from "axios";

export async function getCurrentItems() {
  return await axios
    .get("/loading")
    .then((res) => res.data)
    .catch((error) => console.log(error));
}
