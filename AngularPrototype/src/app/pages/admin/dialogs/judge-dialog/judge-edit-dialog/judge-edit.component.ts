import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {JudgeService} from "../../../../../services/JudgeService/judge.service";
import {FormControl, Validators} from "@angular/forms";

@Component({
  selector: 'app-judge-edit',
  templateUrl: './judge-edit.component.html',
  styleUrls: ['./judge-edit.component.css']
})
export class JudgeEditComponent implements OnInit {

  nationalities = ['Deutschland', 'Belgien', 'Bulgarien', 'Dänemark', 'Deutschland', 'Estland', 'Finnland',
    'Frankreich', 'Griechenland', 'Irland', 'Italien', 'Kroatien', 'Lettland', 'Litauen', 'Luxemburg',
    'Malta', 'Niederlande', 'Österreich', 'Polen', 'Portugal', 'Rumänien', 'Schweden', 'Slowakei', 'Slowenien',
    'Spanien', 'Tschechische Republik', 'Ungarn', 'Vereinigtes Königreich', 'Zypern' ];

  constructor(public dialogRef: MatDialogRef<JudgeEditComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, public judgeService: JudgeService) { }

  ngOnInit() {
  }

  formControl = new FormControl('', [
    Validators.required
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

  stopEdit(): void {
    this.judgeService.updateJudge(this.data);
  }

}
