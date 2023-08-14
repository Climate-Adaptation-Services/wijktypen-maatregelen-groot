import { dsv } from 'd3'

export function load(){
  const data = dsv(';', "https://gist.githubusercontent.com/stichtingcas/38c68f15acfb359c1a1e7dd48167ff0f/raw/20403a6a958270969acb59ebc1fc8082abff5a79/grote-ingrepen.csv")
  return { data }
}

