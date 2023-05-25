export interface EnvInterface {
  investmentsApi: string,
}
export interface LocalEnv {
  prod: EnvInterface,
  local: EnvInterface,
}
export const environmentBase: LocalEnv = {
  local: {
    investmentsApi: "https://investment-api-3vvw.onrender.com/",
  },
  prod: {
    investmentsApi: "https://investment-api-3vvw.onrender.com/",
  },
}