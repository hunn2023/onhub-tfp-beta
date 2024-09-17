import { jwtDecode } from "jwt-decode";

export interface UserData {
  aud: string;
  appId: string;
  fullname: string;
  email: string;
  exp: number;
  iat: number;
  id: string;
  iss: string;
  nbf: number;
  policies: string;
  roles: string;
  username: string;
  services: string;
  shopifyStoreId: string;
}

export class User {
  aud: string;
  appId: string;
  fullname: string;
  email: string;
  exp: number;
  iat: number;
  id: string;
  iss: string;
  nbf: number;
  policies: number[];
  roles: string;
  username: string;
  services: string[];
  shopifyStoreId: string;

  constructor(
    aud: string = '',
    appId: string = '',
    fullname: string = '',
    email: string = '',
    exp: number = 0,
    iat: number = 0,
    id: string = '',
    iss: string = '',
    nbf: number = 0,
    policies: string = '',
    roles: string = '',
    username: string = '',
    services: string = '',
    shopifyStoreId: string
  ) {
    this.aud = aud;
    this.appId = appId;
    this.fullname = fullname;
    this.email = email;
    this.exp = exp;
    this.iat = iat;
    this.id = id;
    this.iss = iss;
    this.nbf = nbf;
    this.policies = policies ? policies.split(',').map((x) => parseInt(x, 10)) : [];
    this.roles = roles;
    this.username = username;
    this.services = services ? JSON.parse(services) : [];
    this.shopifyStoreId = shopifyStoreId
  }
}

export function decodeToken(token: string): User {
  const userData = jwtDecode<UserData>(token);
  const user = new User(
    userData.aud,
    userData.appId,
    userData.fullname,
    userData.email,
    userData.exp,
    userData.iat,
    userData.id,
    userData.iss,
    userData.nbf,
    userData.policies,
    userData.roles,
    userData.username,
    userData.services,
    userData.shopifyStoreId
  );

  localStorage.setItem('userDataKey', JSON.stringify(user));
  localStorage.setItem('accessTokenKey', token);
  return user;
}
