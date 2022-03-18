﻿import { Component } from "@angular/core";
import { Router } from "@angular/router";

import { AuthenticationService } from "./_services";
import { User } from "./_models";

import "./_content/app.less";

@Component({ selector: "app", templateUrl: "app.component.html" })
export class AppComponent {
  currentUser: User;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    this.authenticationService.currentUser.subscribe(
      (x) => (this.currentUser = x)
    );
  }

  logout() {
    localStorage.removeItem("cognizant-token");
    localStorage.removeItem("cognizant-user-role");
    localStorage.removeItem("cognizant-user-id");
    this.authenticationService.logout();
    this.router.navigate(["/login"]);
  }
}
