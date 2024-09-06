export class User {
  constructor(
    public _id : string,
    public userName: string,
    public fullName: string,
    public userRoles : []
  ) { }
}


export class AppUserRole {
  constructor(
    public _id: string,
    public userName: string,
    public roleName : string
  )
  { }
}
