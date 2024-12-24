import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  isLoginSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false); //() 裡給初始值
  isCreateSubject : BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  userName:string = '';

  constructor() {}

  //如果有取得token，表示使用者有登入系統
  private hasTocken(): boolean {
    return Boolean(localStorage.getItem('isLoginStatus')) ?? false; // ?? >> 當前面的值是 null 返回 false
  }

  //登入使用者，並通知所有訂閱者
  changeToLoginStatus(): void {
    localStorage.setItem('isLoginStatus', 'true');
    this.isLoginSubject.next(true);
  }

  //登出使用者，並通知所有訂閱者
  changeToLogoutStatus(): void {
    localStorage.removeItem('isLoginStatus');
    this.isLoginSubject.next(false);
  }

  // @returns {Observable<T>} 讓其他人可以訂閱
  isLoggedIn(): Observable<boolean> {
    return this.isLoginSubject.asObservable();
  }


  createNewUser():void{
    localStorage.setItem('isCreateSubject', 'new');
    this.isCreateSubject.next(true);
  }

  isCreatedNewUser():Observable<boolean> {
    return this.isCreateSubject.asObservable();
  }

}

