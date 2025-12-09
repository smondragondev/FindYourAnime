export default class User {
  constructor(
    dataSource,) {
    this.dataSource = dataSource;
    this.user = {};
  }

  init() {
    this.user = this.dataSource.getData();
  }

  login(userData){
    this.user = userData;
    this.dataSource.setData(this.user);
  }

  isAuthenticated(){
    return this.user ? true : false;
  }

  getUserData(){
    return this.user;
  }
}