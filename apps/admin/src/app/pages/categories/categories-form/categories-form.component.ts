/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CategoriesService, Category } from '@divstd/products';
import {MessageService} from 'primeng/api';
import { Subject, timer } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'admin-categories-form',
  templateUrl: './categories-form.component.html',
  styles: [
  ]
})
export class CategoriesFormComponent implements OnInit {

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
endsubs$ : Subject<any> = new Subject();

  form!: FormGroup;
  isSubmited = false;
  editMode = false;
  currentCategoryID : string | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private categoriesService: CategoriesService,
    private messageService: MessageService,
    private location: Location,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      icon: ['', Validators.required],
      color: ['#fff']
    });

    this._checkEditMode();
  }

  ngOnDestroy(): void {
    console.log('categories is destroyed');
    this.endsubs$.next();
    this.endsubs$.complete();
  }


  onSubmit() {
    this.isSubmited = true;
    if(this.form.invalid) {
      return;
    }
   // console.log(this.categoryForm.name.value);
   // console.log(this.categoryForm.icon.value);
const category : Category = {
  id: this.currentCategoryID,
  name: this.categoryForm.name.value,
  icon: this.categoryForm.icon.value,
  color: this.categoryForm.color.value
};
if(this.editMode) { //update

  this._updateCategory(category)

} else {   //create

this._addCategory(category)

   }
}


private _addCategory(category: Category) {
  this.categoriesService.createCategory(category)
  .pipe(takeUntil(this.endsubs$))
  .subscribe(
    (category: Category) => {
      this.messageService.add({
        severity:'success',
        summary:'Success',
        detail:`Category ${category.name} is created!`});

      timer(2000).toPromise().then(() =>{
        this.location.back();
      })

    },
    ()=> {
      this.messageService.add({
        severity:'error',
        summary:'Error',
        detail:'Category is not created!'});
    }
  );
}

private _updateCategory(category: Category) {
  this.categoriesService.updateCategory(category)
  .pipe(takeUntil(this.endsubs$))
  .subscribe(
    (category: Category) => {
      this.messageService.add({
        severity:'success',
        summary:'Success',
        detail:`Category ${category.name} is updated!`});

      timer(2000).toPromise().then(() =>{
        this.location.back();
      })

    },
    ()=> {
      this.messageService.add({
        severity:'error',
        summary:'Error',
        detail:'Category is not updated!'});
    }
  );
}

  get categoryForm() {
   return this.form.controls;
  }

  onCancel() {
   // timer(200).toPromise().then(() =>{
      this.location.back();
    //})
  }
  private _checkEditMode(){
   this.route.params
   .pipe(takeUntil(this.endsubs$))
   .subscribe(params => {
    if(params.id) {
      this.editMode = true;
      this.currentCategoryID = params.id;
      this.categoriesService.getCategory(params.id)
      .pipe(takeUntil(this.endsubs$))
      .subscribe(category => {
        this.categoryForm.name.setValue(category.name);
        this.categoryForm.icon.setValue(category.icon);
        this.categoryForm.color.setValue(category.color);
      })
     }
   })
  }
 }
