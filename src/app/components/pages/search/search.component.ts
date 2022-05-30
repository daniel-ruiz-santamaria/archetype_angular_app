import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, NgForm, FormGroup, AbstractControl,FormBuilder} from '@angular/forms';
import { TagModel } from 'ngx-chips/core/tag-model';
import { throwError, Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators'
import { TagInputComponent as SourceTagInput } from 'ngx-chips';
import { NONE_TYPE } from '@angular/compiler';
import { SearchObj } from 'src/app/models/search-obj.model';
import { InferenceServiceService } from 'src/app/services/inference-service.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  @ViewChild('tagInput')

  public imagePath: string = "";
  imgURL: any;
  public message: string = "";

  // Tags
  tagItem1: string = "";
  isValidtagItem1 : boolean = true;
  tagItem2: string = "";
  isValidtagItem2 : boolean = true;
  searchObeject: SearchObj;


  constructor(private inferenceService: InferenceServiceService) { 
    this.searchObeject = new SearchObj();
  }

  ngOnInit(): void {
  }

  requestInference() {
    console.log(this.inferenceService.requestInference() )
  }
  


  preview(files :any) {
    if (files.length === 0)
      return;
 
    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = "Only images are supported.";
      return;
    }
 
    var reader = new FileReader();
    this.imagePath = files;
    this.searchObeject.imageURL = files;
    reader.readAsDataURL(files[0]); 
    reader.onload = (_event) => { 
      this.imgURL = reader.result; 
      this.searchObeject.imageContent = reader.result;
    }
  }

  public onAddedViennaFunc = this.beforeAddVienna.bind(this);


  onViennaAdded(event: any) {
    console.log(event.value);
    console.log(this.searchObeject.vienaCodes);
  }

  private vienaRegex(viennaCode: string) {
    let EMAIL_REGEXP = /\d{1,2}(.\d{1,2}){0,2}/
    let maches = viennaCode.match(EMAIL_REGEXP);
    return (viennaCode!=null && (maches != null && maches[0] == viennaCode));
  }


  private beforeAddVienna(tag: TagModel): Observable<TagModel> {

    if (!this.vienaRegex(tag.toString())) {
      tag = NONE_TYPE;
      return throwError('No valid viena code');
    }
    return of(tag);
  }

  onViennaTextChange(tag: TagModel) {
    this.tagItem1 = tag.toString();
    console.log('onTextChange',this.tagItem1);
    this.isValidtagItem1 = this.tagItem1 == "" || this.vienaRegex(this.tagItem1)
  }

  public onAddedNizaFunc = this.beforeAddNiza.bind(this);


  onNizaAdded(event: any) {
    console.log(event.value);
    console.log(this.searchObeject.nizaCodes);
  }

  private nizaRegex(viennaCode: string) {
    let EMAIL_REGEXP = /\d{1,10}/
    let maches = viennaCode.match(EMAIL_REGEXP);
    return (viennaCode!=null && (maches != null && maches[0] == viennaCode));
  }


  private beforeAddNiza(tag: TagModel): Observable<TagModel> {

    if (!this.nizaRegex(tag.toString())) {
      tag = NONE_TYPE;
      return throwError('No valid viena code');
    }
    return of(tag);
  }

  onNizaTextChange(tag: TagModel) {
    this.tagItem2 = tag.toString();
    console.log('onTextChange',this.tagItem2);
    this.isValidtagItem2 = this.tagItem2 == "" || this.nizaRegex(this.tagItem2)
  }


}
