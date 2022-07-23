import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CommonService } from 'src/app/common.service';

@Component({
  selector: 'app-edit-nomination',
  templateUrl: './edit-nomination.component.html',
  styleUrls: ['./edit-nomination.component.css']
})
export class EditNominationComponent implements OnInit {

  constructor(private _route: ActivatedRoute, public _commonService: CommonService) { }

  nominationForm: FormGroup;
  nominationId: string;
  nominationDetails: any;
  awardCategory: any[] = [];
  productCategory: any[] = [];
  productSubCategory: any[] = [];
  productSubSubCategory: any[] = [];

  ngOnInit() {
    this.nominationId = this._route.snapshot.paramMap.get('nominationId');
    this.fetchDetails(this.nominationId);
  }

  /**
   * This method first fetches award category then nomination details and call `initForm` method
   */
  fetchDetails(nominationId: string) {
    this._commonService._get('award-list',
     (res1) => {
        this.awardCategory = res1;
        this._commonService._get(`admin/nomination-details/${nominationId}`,
          (res2) => {
            this.nominationDetails = res2.nomination;
            if(res2.nomination.productCategory)
            this.productCategory = [res2.nomination.productCategory];
            if(res2.nomination.productSubCategory)
            this.productSubCategory = [res2.nomination.productSubCategory];
            if(res2.nomination.productSubSubCategory)
            this.productSubSubCategory = [res2.nomination.productSubSubCategory];
            this.initForm(res2);
          },
          (err) => {
            alert('Some error occured while fetching details.');
        });
     },
     (err) => {
        alert('Some error occured while fetching details.');
     })
  }

  /**
   * Validate all the product category form field
   */
   validateProductCategory(categoryList: any[]): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const isCategoryExist: boolean = categoryList.length > 0;
      setTimeout(() => {console.log(categoryList, categoryList.length, isCategoryExist);}, 2000)
      if (!isCategoryExist) {
        return null;
      }

      if (isCategoryExist && control.value) {
        return null;
      }

      return {productCategoryRequired: true};
    }
  }

  /**
   * Set new form field validator based on current product categories
   */
  setProductCategoryValidator() {
    this.nominationForm.get('productCategory').setValidators(Validators.compose([this.validateProductCategory(this.productCategory)]));
    this.nominationForm.get('productSubCategory').setValidators(Validators.compose([this.validateProductCategory(this.productSubCategory)]));
    this.nominationForm.get('productSubSubCategory').setValidators(Validators.compose([this.validateProductCategory(this.productSubSubCategory)]));
  }

  /**
   * Initializes the nomination form state, uses by `fetchDetails` method
   */
   initForm(initState: any) {
    let prodCat = null;
    let prodSubCat = null;
    let prodSubSubCat = null;
    if (initState.nomination.productCategory) {
      prodCat = initState.nomination.productCategory._id;
    }
    if (initState.nomination.productSubCategory) {
      prodSubCat = initState.nomination.productSubCategory._id;
    }
    if (initState.nomination.productSubSubCategory) {
      prodSubSubCat = initState.nomination.productSubSubCategory._id;
    }

    this.nominationForm = new FormGroup({

      productName: new FormControl(initState.nomination.productName, {
        validators: [Validators.required],
      }),

      awardCategory: new FormControl(initState.nomination.awardCategory, {
        validators: [Validators.required],
      }),

      productCategory: new FormControl(prodCat, {

      }),

      productSubCategory: new FormControl(prodSubCat, {

      }),

      productSubSubCategory: new FormControl(prodSubSubCat, {

      }),

      archive: new FormControl(initState.nomination.archive, {
        validators: [],
      }),
    });

    //this.setProductCategoryValidator();
  }

  /**
   * Fetch product category based on parent id
   */
  fetchProductCategory(parentId = '5ea9af9b5aebf3609433697c') {
    this._commonService._get(`getProductByParentId/${parentId}`,
          (res) => {
            this.productCategory = res;
            this.productSubCategory = [];
            this.productSubSubCategory = [];
            this.nominationForm.patchValue({productCategory: null, productSubCategory: null, productSubSubCategory: null});
            //this.setProductCategoryValidator();
          },
          (err) => {
            alert('Some error occured while fetching details.')
          });
  }

  /**
   * Fetch product sub category based on parent id
   */
   fetchProductSubCategory(parentId: string) {
    this._commonService._get(`getProductByParentId/${parentId}`,
          (res) => {
            this.productSubCategory = res;
            this.productSubSubCategory = [];
            this.nominationForm.patchValue({ productSubCategory: null, productSubSubCategory: null});
            //this.setProductCategoryValidator();
          },
          (err) => {
            alert('Some error occured while fetching details.')
          });
  }

  /**
   * Fetch product sub sub category based on parent id
   */
  fetchProductSubSubCategory(parentId: string) {
    this._commonService._get(`getProductByParentId/${parentId}`,
          (res) => {
            this.productSubSubCategory = res;
            this.nominationForm.patchValue({ productSubSubCategory: null});
            //this.setProductCategoryValidator();
          },
          (err) => {
            alert('Some error occured while fetching details.')
          });
  }

  /**
   * This method called each time user selects an award category
   */
  awardSelectAction() {
    this.fetchProductCategory();
  }

  /**
   * Method to be called on save button click to update the nomination details
   */
  saveData() {
    if (this.nominationForm.invalid) {
      alert('Please enter all the required fields');
      return;
    }

    alert('Nomination detail will be updated, click ok to confirm.');

    this.nominationDetails.productName = this.nominationForm.value.productName;
    this.nominationDetails.awardCategory = this.nominationForm.value.awardCategory;
    this.nominationDetails.productCategory = this.nominationForm.value.productCategory;
    this.nominationDetails.productSubCategory = this.nominationForm.value.productSubCategory;
    this.nominationDetails.productSubSubCategory = this.nominationForm.value.productSubSubCategory;
    this.nominationDetails.archive = this.nominationForm.value.archive;

    this._commonService._post('admin/update-nomination',this.nominationDetails,
          (res) => {
            if (res.result.nModified > 0) {
              alert('Details updated successfully.');
            } else {
              alert('Updation failed.');
            }
          },
          (err) => {
            alert('Updation failed.');
        });
  }

}
