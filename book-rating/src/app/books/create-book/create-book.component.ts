import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Book } from '../shared/book';

@Component({
  selector: 'br-create-book',
  templateUrl: './create-book.component.html',
  styleUrls: ['./create-book.component.scss']
})
export class CreateBookComponent {

  @Output()
  created = new EventEmitter<Book>();

  bookForm = new FormGroup({
    isbn: new FormControl('', [
        Validators.required,
        Validators.minLength(3)
    ]),
    title: new FormControl('', Validators.required),
    description: new FormControl('')
  });

  isInvalid(name: string) {
    const control = this.bookForm.get(name);
    return control.invalid && control.dirty;
  }

  hasError(name: string, errorCode: string) {
    const control = this.bookForm.get(name);
    return control.hasError(errorCode) && control.dirty;
  }

  submitForm() {
    const newBook = {
      ...this.bookForm.value,
      rating: 1,
      price: 10
    };

    this.created.emit(newBook);
    this.bookForm.reset();
  }
}
