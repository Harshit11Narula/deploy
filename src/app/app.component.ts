
// Rectiveforms 
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

// task 2
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';

// task1
import * as CUSTOM from '../assets/js/task.js';


export interface Music_Tag {
  name: string;
}


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  form: FormGroup;

  // Regex
  fullNamePattern = '^[a-zA-Z][a-zA-Z]+ [a-zA-Z][a-zA-Z]+$';
  emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$';

  uploaded_file = null;
  file_warning = '';
  task1_output = null;
  task1 = CUSTOM.task1;
  success_submit = null;

  ngOnInit(): void {
    // In order to set default value empty
    this.form = new FormGroup({
      email: new FormControl('', Validators.pattern(this.emailPattern)),
      name: new FormControl('', Validators.pattern(this.fullNamePattern)),
      age: new FormControl('', this.ageValidator),
    });
  }

  // File Validation
  readFile(event) {
    this.uploaded_file = event.target.files[0].name;
    const size = event.target.files[0].size / 1024 / 1024;
    if (size > 10) {
      this.file_warning = 'File size needs to be less than 10 MB';
    } else {
      this.file_warning = '';
      // Task 1
      this.task1(event.target.files[0])
        .then((data) => {
          this.task1_output = data.tags.artist + ' and ' + data.tags.album;
        })
        .catch((error) => {
          this.task1_output = "while reading data got: " + error;
        });
    }
  }

  // Age Validation
  ageValidator(control: FormControl) {
    if (control.value.trim().length === 0) {
      return null;
    }
    const integercheck = control.value.match(/^-{0,1}\d+$/);
    if (!integercheck) {
      return { age: 'Age should be an integer' };
    }
    const age = parseInt(control.value, 10);
    const minage = 18;
    const maxage = 120;
    if (age >= minage && age <= maxage) {
      return null;
    } else if (age < minage) {
      return {
        age:
          'Warning! Age should be minimum of 18 years old to access this site',
      };
    } else {
      return { age: 'Must be between ' + minage + ' and ' + maxage };
    }
  }

  // Task 2  Tags
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  all_tags: Music_Tag[] = [];

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add  tag
    if ((value || '').trim() && this.all_tags.length < 5) {
      this.all_tags.push({ name: value.trim() });
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove(tag: Music_Tag): void {
    const index = this.all_tags.indexOf(tag);

    if (index >= 0) {
      this.all_tags.splice(index, 1);
    }
  }

  // summit Button
  onSubmit(FormItem) {
    if (this.file_warning === '') {
      this.success_submit = 'Form Submit Success';
    }
  }
}

