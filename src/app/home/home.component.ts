import { Component, OnInit } from "@angular/core";
import { first } from "rxjs/operators";

import { User } from "@/_models";
import {
  UserService,
  AuthenticationService,
  RequestService,
} from "@/_services";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { AddRequestComponent } from "@/_components/add-request/add-request.component";

@Component({ templateUrl: "home.component.html" })
export class HomeComponent implements OnInit {
  currentUser: User;
  user = {};
  role: number;
  userId: number;
  requests = [];
  constructor(
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private requestService: RequestService,
    public dialog: MatDialog
  ) {
    this.currentUser = this.authenticationService.currentUserValue;
    this.role = Number(localStorage.getItem("cognizant-user-role"));
    this.userId = Number(localStorage.getItem("cognizant-user-id"));
    console.log(this.role);
  }

  ngOnInit() {
    // this.requestService
    //   .getAll()
    //   .pipe(first())
    //   .subscribe(
    //     (data: any) => {
    //       this.requests = data;
    //       if (this.role !== 3) {
    //         const d = data.filter((item) => item.user.id === this.userId);
    //         console.log(d);
    //         this.requests = d;
    //       }
    //       console.log(this.requests);
    //     },
    //     (error) => {}
    //   );
  }
  openDialog() {
    const dialogRef = this.dialog.open(AddRequestComponent, {
      width: "640px",
      disableClose: true,
    });
  }
}
