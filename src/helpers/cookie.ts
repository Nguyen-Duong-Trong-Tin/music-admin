const get = (cname: string) => {
  const name = cname + "=";
  const ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

const set = (cname: string, cvalue: string, miliSeconds: number) => {
  const d = new Date();
  d.setTime(d.getTime() + miliSeconds);
  const expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + "; " + expires + "; path=/";
}

const del = (cname: string) => {
  document.cookie = `${cname}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
}

const delAll = () => {
  const cookies = document.cookie.split(";");

  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i];
    const eqPos = cookie.indexOf("=");
    const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
    document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
  }
}

const cookieHelper = {
  get,
  set,
  del,
  delAll
};
export default cookieHelper;