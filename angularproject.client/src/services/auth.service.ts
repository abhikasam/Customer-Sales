import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { RouteInfo } from '../shared/sidebar/sidebar.metadata';
import { SIDEBAR_ROUTES } from '../shared/sidebar/menu-items';
import { MENUBAR_ROUTES } from '../shared/header/navmenu-items';
import { UserDetails, UserSession } from '../models/user.model';
import { ResponseMessage } from '../models/response-message.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authenticated: BehaviorSubject<boolean> = new BehaviorSubject(false)
  claims: string[] = []


  userDetails = new BehaviorSubject<UserDetails>(new UserDetails())

  sidebarItems = new BehaviorSubject<RouteInfo[]>([])
  menuItems = new BehaviorSubject<RouteInfo[]>([])


  constructor(private http: HttpClient) {
    this.authenticated.subscribe((res) => {
      this.updateMenubar()
      this.updateSidebar()
      if (!res) {
        this.userDetails.next(new UserDetails())
      }
    })
  }

  getUserSession() {
    this.http.get<UserSession>('/api/login').subscribe(res => {
      this.authenticated.next(res.authenticated)
      this.userDetails.next(res.applicationUser)
    })
  }

  getUser(email: string) {
    return this.http.get<boolean>('/api/register?email='+email)
  }

  registerUser(register: any) {
    return this.http.post<ResponseMessage>('/api/register', register)
  }

  loginUser(login: any) {
    return this.http.post<ResponseMessage>('/api/login',login)
  }

  updateSidebar() {
    var routes = SIDEBAR_ROUTES
    routes = routes.filter(i => i.authenticated.includes(this.authenticated.value))
    this.sidebarItems.next(routes)
  }

  updateMenubar() {
    var routes = MENUBAR_ROUTES
    routes = routes.filter(i => i.authenticated.includes(this.authenticated.value))
    this.menuItems.next(routes)
  }

  signout() {
    this.authenticated.next(false)
    this.userDetails.next(new UserDetails())
    this.updateSidebar()
    this.updateMenubar()
  }

  logout() {
    return this.http.post<boolean>('/api/logout', {})
  }

  setRoles(roles: string[]) {
    let currentUserDetails = { ...this.userDetails.value }
    currentUserDetails.roles = roles
    this.userDetails.next(currentUserDetails)
  }

  getRoles() {
    return this.userDetails.value.roles
  }
}
