import { http, HttpResponse } from "msw"

const starshipOne = {
  name: "Starship One",
  model: "x10",
  manufacturer: "Enterprise",
  cost_in_credits: "10",
  length: "3000",
  max_atmosphering_speed: "20000",
  crew: "10",
  passengers: "100",
  cargo_capacity: "1000",
  consumables: "none",
  hyperdrive_rating: "2",
  MGLT: "something",
  starship_class: "CAT2",
  url: "https://swapi.info/api/starships/1",
  pilots: [],
  films: [],
}

const starshipTwo = {
  ...starshipOne,
  name: "Starship Two",
  url: "https://swapi.info/api/starships/2",
}

const starshipsResponse = [starshipOne, starshipTwo]

const baseResponse = {
  people: "",
  planets: "",
  films: "",
  species: "",
  vehicles: "",
  starships: "",
}

export const handlers = [
  http.get("https://swapi.info/api", () => {
    return HttpResponse.json(baseResponse)
  }),
  http.get("https://swapi.info/api/starships", () => {
    return HttpResponse.json(starshipsResponse)
  }),
  http.get("https://swapi.info/api/starships/1", () => {
    return HttpResponse.json(starshipOne)
  }),
  http.get("https://swapi.info/api/starships/2", () => {
    return HttpResponse.json(starshipTwo)
  }),
]
