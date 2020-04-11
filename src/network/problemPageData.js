import baseAxiso from "./baseAxiso";
import postMethodAxiso from "./postMethodAxiso";
import qs from "qs";

export function getAllProblem() {
  return baseAxiso({
    url: '/Extra/problem/view/php/getProblemsFont20.php'
  })
}

export function getAnswerByPid(Pid) {
  let reData = {
    Pid: Pid,
  }
  return postMethodAxiso({
    url: '/Extra/problem/controller/php/getAnswer.php',
    data:qs.stringify(reData)
  })
}

export function addAnswerByPid(Pid, Atext) {
  let reData = {
    Pid: Pid,
    Atext:Atext,
  }
  return postMethodAxiso({
    url: '/Extra/problem/controller/php/addAnswer.php',
    data:qs.stringify(reData)
  })
}

export function delProblemByPid(Pid) {
  let reData = {
    Pid: Pid,
  }
  return postMethodAxiso({
    url: '/Extra/problem/controller/php/delectProblems.php',
    data:qs.stringify(reData)
  })
}

export function editProblem(editData) {
  console.log(editData)
  let reData = {
    Pid: editData.Pid,
    Ptext: editData.Ptext,
    Ptime: editData.Ptime,
    Ptype: editData.Ptype,
    Pstatus: editData.Pstatus,
  }
  return postMethodAxiso({
    url: '/Extra/problem/controller/php/updateProblems.php',
    data:qs.stringify(reData)
  })
}

export function addProblem(Ptext, Ptype) {
  let reData = {
    Ptext: Ptext,
    Ptype: Ptype
  }
  return postMethodAxiso({
    url: '/Extra/problem/controller/php/addproblems.php',
    data:qs.stringify(reData)
  })
}
