import { Component, OnInit, VERSION, ViewChild } from "@angular/core";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { Router } from "@angular/router";
import * as moment from "moment";
import {
  UserService,
  AuthenticationService,
  RequestService,
} from "@/_services";
import { Subject } from "rxjs";
@Component({
  selector: "app-add-request",
  templateUrl: "./add-request.component.html",
  styles: [require("./add-request.component.css").toString()],
})
export class AddRequestComponent implements OnInit {
  public breakpoint: number; // Breakpoint observer code
  public fname: string = `Ramesh`;
  public lname: string = `Suresh`;
  public addCusForm: FormGroup;
  wasFormChanged = false;
  minDateToFinish = new Subject<string>();
  minDate;
  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private requestService: RequestService
  ) {
    this.minDateToFinish.subscribe((r) => {
      this.minDate = new Date(r);
    });
  }
  fromDate: string;
  toDate: string;
  notes: string;
  public ngOnInit(): void {
    this.addCusForm = this.fb.group({
      IdProof: null,
      firstname: [
        this.fname,
        [Validators.required, Validators.pattern("[a-zA-Z]+([a-zA-Z ]+)*")],
      ],
      lastname: [
        this.lname,
        [Validators.required, Validators.pattern("[a-zA-Z]+([a-zA-Z ]+)*")],
      ],
      email: [null, [Validators.required, Validators.email]],
    });
    this.breakpoint = window.innerWidth <= 600 ? 1 : 2; // Breakpoint observer code
  }

  public onSave() {
    const payload = {
      notes: this.notes,
      fromDate: moment(this.fromDate).format("YYYY-MM-DDTHH:mm:ssZ"),
      toDate: moment(this.toDate).format("YYYY-MM-DDTHH:mm:ssZ"),
      user: localStorage.getItem("cognizant-user-id"),
    };
    this.requestService.createRequest(payload).subscribe(
      (data: any) => {
        this.dialog.closeAll();
        window.location.reload();
      },
      (error) => {}
    );
  }

  openDialog(): void {
    console.log(this.wasFormChanged);
    if (this.addCusForm.dirty) {
      //   const dialogRef = this.dialog.open(DeleteComponent, {
      //     width: "340px",
      //   });
    } else {
      this.dialog.closeAll();
    }
  }

  // tslint:disable-next-line:no-any
  public onResize(event: any): void {
    this.breakpoint = event.target.innerWidth <= 600 ? 1 : 2;
  }

  private markAsDirty(group: FormGroup): void {
    group.markAsDirty();
    // tslint:disable-next-line:forin
    for (const i in group.controls) {
      group.controls[i].markAsDirty();
    }
  }

  formChanged() {
    this.wasFormChanged = true;
  }
  dateChange(event) {
    this.minDateToFinish.next(event.value.toString());
  }
}
