import { Component, OnInit, ViewChild, Input } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { AddRequestComponent } from "./add-request/add-request.component";
import {
  UserService,
  AuthenticationService,
  RequestService,
} from "@/_services";
import { first } from "rxjs/operators";
/**
 * @title Table with pagination
 */

@Component({
  selector: "table-pagination-example",
  //styleUrls: ["table-pagination-example.css"],
  templateUrl: "table-pagination-example.html",
})
export class TablePaginationExample implements OnInit {
  constructor(
    public dialog: MatDialog,
    private requestService: RequestService
  ) {}
  displayedColumns: string[] = [
    "position",
    "email",
    "weight",
    "symbol",
    "notes",
    "approved",
  ];
  user = {};
  role: number;
  userId: number;
  requests = [];
  dataSource: any;
  isLoading = false;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  ngOnInit() {
    this.isLoading = true;
    this.userId = Number(localStorage.getItem("cognizant-user-id"));
    this.requestService
      .getAll()
      .pipe(first())
      .subscribe(
        (data: any) => {
          this.requests = data;
          if (this.role !== 3) {
            console.log("GH", data);
            const d = data.filter((item) => item?.user?.id === this.userId);
            console.log(d);
            this.requests = d;
          }
          this.dataSource = new MatTableDataSource<PeriodicElement>(
            this.requests
          );
          this.dataSource.paginator = this.paginator;
          this.isLoading = false;
        },
        (error) => {
          this.isLoading = false;
        }
      );
    this.role = Number(localStorage.getItem("cognizant-user-role"));
  }
  openDialog() {
    const dialogRef = this.dialog.open(AddRequestComponent, {
      width: "640px",
      disableClose: true,
    });
  }
  onToggle(event, pos) {
    console.log(event, pos);
    this.requestService.approveRequest(pos, event.checked).subscribe(
      (data: any) => {},
      (error) => {}
    );
  }
}

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

/**  Copyright 2019 Google LLC. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at http://angular.io/license */
