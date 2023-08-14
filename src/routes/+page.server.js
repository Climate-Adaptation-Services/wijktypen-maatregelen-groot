import { dsv } from 'd3'

export function load(){
  const data = dsv(';', "https://gist.githubusercontent.com/stichtingcas/3d474b72da6142a18244677ac8a38b9d/raw/9173c2919f5fab630951d70e6304b9b0e59db24d/gemiddelde-ingrepen.csv")
  return { data }
}

