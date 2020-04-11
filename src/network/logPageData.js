import baseAxiso from "./baseAxiso";
import postMethodAxiso from "./postMethodAxiso";
import qs from "qs";

export function getAllLog() {
  return baseAxiso({
    url: '/Extra/log/view/php/logFontSelect.php'
  })
}

export function getLogByTime(ltime) {
  let reData = {
    ltime: ltime,
  }
  return postMethodAxiso({
    url: '/Extra/log/controller/php/logSelect.php',
    data:qs.stringify(reData)
  })
}

export function delLogByLid(lid) {
  let reData = {
    lid: lid,
  }
  return postMethodAxiso({
    url: '/Extra/log/controller/php/logDelete.php',
    data:qs.stringify(reData)
  })
}

export function addLog(ltitle,ltime,ltext) {
  let reData = {
    ltime: ltime,
    ltitle: ltitle,
    ltext:ltext
  }
  return postMethodAxiso({
    url:'/Extra/log/controller/php/logAdd.php',
    data:qs.stringify(reData)
  })
}
