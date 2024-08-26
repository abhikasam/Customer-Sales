import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { RouteInfo } from '../shared/sidebar/sidebar.metadata';
import { SIDEBAR_ROUTES } from '../shared/sidebar/menu-items';
import { ResponseMessage } from '../models/response-message.model';

@Injectable({
  providedIn: 'root'
})
export class NavService {

  sidebarItems = new BehaviorSubject<RouteInfo[]>([])


  constructor(private http: HttpClient) {
    this.updateSidebar()
  }

  loginUser(login: any) {
    return this.http.post<ResponseMessage>('/api/login',login)
  }

  updateSidebar() {
    var routes = SIDEBAR_ROUTES
    this.sidebarItems.next(routes)
  }

  logout() {
    return this.http.post<boolean>('/api/logout', {})
  }
  getRoles(): string[] {
    return []
  }
}
