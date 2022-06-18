import axios from "axios"
import { API_KEY2 } from "@env"

export default axios.create({
  baseURL: "https://api.yelp.com/v3/businesses",
  headers: {
    Authorization:
    `Bearer ${API_KEY2}`,
  },
});
