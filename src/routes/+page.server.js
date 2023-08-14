import { dsv } from 'd3'

export function load(){
  const data = dsv(';', "https://gist.githubusercontent.com/stichtingcas/38c68f15acfb359c1a1e7dd48167ff0f/raw/2154f59a57bdb3ed887f628ffade8101ed48980c/grote-ingrepen.csv")
  return { data }
}

