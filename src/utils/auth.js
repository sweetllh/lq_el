import Cookies from 'js-cookie'

const TokenKey = 'LQ-Token'
const userInfo = "LQ-UserInfo"
const account = "LQ-Account"

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function removeUserInfo() {
  return sessionStorage.removeItem(userInfo)
}

export function setUserInfo(data) {
  return sessionStorage.setItem(userInfo, JSON.stringify(data))
}

export function getUserInfo() {
  return JSON.parse(sessionStorage.getItem(userInfo))
}

export function getAccount() {
  return Cookies.get(account)
}

export function setAccount(data) {
  return Cookies.set(account, data)
}

export function removeAccount() {
  return Cookies.remove(account)
}