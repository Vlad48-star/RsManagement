import { DataService } from 'src/app/core/services/data.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component } from '@angular/core';

@Component({
  selector: 'app-crate-board',
  templateUrl: './crate-board.component.html',
  styleUrls: ['./crate-board.component.scss'],
})
export class CrateBoardComponent {
  constructor(private dataService: DataService) {
    this.createForm();
  }
  newBoardForm!: FormGroup;
  errorOnsubmit = false;

  formSubmit() {
    this.errorOnsubmit = true;
    if (!this.newBoardForm.valid) {
      return;
    }
    this.errorOnsubmit = false;
    this.dataService.addBoard(this.newBoardForm.value);
    this.newBoardForm.reset();
  }
  private createForm() {
    this.newBoardForm = new FormGroup({
      title: new FormControl('', [Validators.required]),
    });
  }
  get title() {
    return this.newBoardForm.get('title');
  }
}
