import {Component, OnInit, ViewChild} from '@angular/core';
import {ClubFormComponent} from "../../../forms/club-form/club-form.component";
import {HttpClient} from "@angular/common/http";
import {MatDialogRef} from "@angular/material";

@Component({
  selector: 'app-club-dialog',
  templateUrl: './club-dialog.component.html',
  styleUrls: ['./club-dialog.component.css']
})
export class ClubDialogComponent implements OnInit {
  @ViewChild(ClubFormComponent) clubForm: ClubFormComponent;


  constructor(private http: HttpClient, public dialogRef: MatDialogRef<ClubDialogComponent>) { }

  ngOnInit() {
  }

  onCreateNewClick() {
    this.clubForm.onSubmit();
    this.dialogRef.close();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
