import {Component, Inject, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {Judge} from "../../../../data-models/judge";
import {FormControl, Validators} from "@angular/forms";
import {JudgeService} from "../../../../services/JudgeService/judge.service";

@Component({
  selector: 'app-judge-dialog',
  templateUrl: './judge-dialog.component.html',
  styleUrls: ['./judge-dialog.component.css']
})
export class JudgeDialogComponent implements OnInit {

  nationalities = ['Deutschland', 'Belgien', 'Bulgarien', 'Dänemark', 'Deutschland', 'Estland', 'Finnland',
    'Frankreich', 'Griechenland', 'Irland', 'Italien', 'Kroatien', 'Lettland', 'Litauen', 'Luxemburg',
    'Malta', 'Niederlande', 'Österreich', 'Polen', 'Portugal', 'Rumänien', 'Schweden', 'Slowakei', 'Slowenien',
    'Spanien', 'Tschechische Republik', 'Ungarn', 'Vereinigtes Königreich', 'Zypern' ];

  constructor(private http: HttpClient, public dialogRef: MatDialogRef<JudgeDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Judge, private judgeService: JudgeService) { }

  ngOnInit() {
  }

  formControl = new FormControl('', [
    Validators.required,
    // Validators.email,
  ]);

  getErrorMessage() {
    return this.formControl.hasError('required') ? 'Required field' :
      this.formControl.hasError('email') ? 'Not a valid email' :
        '';
  }

  submit() {
    // empty stuff
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  public confirmAdd(): void {
    this.judgeService.addJudge(this.data);
  }

}
