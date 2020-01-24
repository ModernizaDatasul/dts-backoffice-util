export interface ISessionInfo {
  diStatus: string;
  productVersion: string;
  userPwd: string;
  sessionId: string;
  userDomain: string;
  userName: string;
  userSO: string;
  timeout: number;
}

export class SessionInfo implements ISessionInfo {

  diStatus: string;
  productVersion: string;
  userPwd: string;
  sessionId: string;
  userDomain: string;
  userName: string;
  userSO: string;
  timeout: number;

  constructor(values: object = {}) {
    Object.assign(this, values);
  }

  get $diStatus() {
    return this.diStatus;
  }

  get $productVersion() {
    return this.productVersion;
  }

  get $userPwd() {
    return this.userPwd;
  }

  get $sessionId() {
    return this.sessionId;
  }

  get $userDomain() {
    return this.userDomain;
  }

  get $userName() {
    return this.userName;
  }

  get $userSO() {
    return this.userSO;
  }

  get $timeout() {
    return this.timeout;
  }

  set $diStatus(diStatus: string) {
    this.diStatus = diStatus;
  }

  set $productVersion(productVersion: string) {
    this.productVersion = productVersion;
  }

  set $userPwd(userPwd: string) {
    this.userPwd = userPwd;
  }

  set $sessionId(sessionId: string) {
    this.sessionId = sessionId;
  }

  set $userDomain(userDomain: string) {
    this.userDomain = userDomain;
  }

  set $userName(userName: string) {
    this.userName = userName;
  }

  set $userSO(userSO: string) {
    this.userSO = userSO;
  }

  set $timeout(timeout: number) {
    this.timeout = timeout;
  }

  static of(json: any = {}) {
    return new SessionInfo(json);
  }

  static empty() {
    return new SessionInfo();
  }

  static fromJson(json: Array<any> = []) {

    const items: Array<ISessionInfo> = [];

    for (const values of json) {
      items.push(new SessionInfo(values));
    }

    return items;
  }

}
