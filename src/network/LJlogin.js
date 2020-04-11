import postMethodAxiso from "./postMethodAxiso";
import qs from 'qs'

export function doLogin(uname,upwd) {
  let reData = {
      uname: uname,
      upwd: upwd
  }
  return postMethodAxiso({
    url:'/index/controller/dologin.php',
    data:qs.stringify(reData)
  })
}
