import { StepperSelectionEvent } from '@angular/cdk/stepper';
import { AfterViewInit, Component, ElementRef, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MatStep, MatStepper } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { CommonService } from 'src/app/common.service';
import { AnswerType, IAnswer } from '../question-model';

@Component({
  selector: 'app-question-page',
  templateUrl: './question-page.component.html',
  styleUrls: ['./question-page.component.css']
})
export class QuestionPageComponent implements OnInit, AfterViewInit {

  constructor(private _route: ActivatedRoute, private _auth: AuthService, private commonService: CommonService,private _formBuilder: FormBuilder, private elementRef: ElementRef) {
  }

  public nominationId: string;
  public user: { role: string, id: string };
  public questions: any[];
  public answers: any[];
  public isSubmissionLocked: false;
  public mappedAnswers: IAnswer[];
  public page: number;
  public scoreObject:any[];
  public isFinalSubmitted: boolean;
  juryChecked: boolean;
  isNominationBrand: boolean;
  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  initialStep: number;
  files: any[] = [];
  fileName: string="";
  imgFile: string;
  videoFile: string;
  pdfFile: string;
  anotherFile: string;
  currUrl: string;
  @ViewChild('stepper', {static: false}) stepper: MatStepper;

  ngOnInit() {
    this.currUrl='https://'+window.location.host;
    this.nominationId = this._route.snapshot.paramMap.get('nominationId');
    this.user = this._auth.getUser();
    this.mappedAnswers = [];
    this.commonService._get(`/award/isBrandRelated/${this.nominationId}`, (res) => {
      this.isNominationBrand=res.isBrand;
        //get all questions for this nomination
        this.fetchQuestionAnswers();
    }, (err) => {
      if(err) {
        alert(err);
      }
    });
    //which page should show to user
  }

  ngAfterViewInit() {
  }

  /**
   * Initialize the stepper
   */
    initStepper() {
      setTimeout(() => {
        this.elementRef.nativeElement.querySelectorAll('mat-step-header').forEach((item, i) => {
          item.addEventListener('click', event => {
            if (!this.isChanQuesSubmitted()) {
              this.stepper.selectedIndex = 0;
              alert('Please submit all the answers of this section.');
            }
            });
        });
      }, 1);
    }

  /**
   * Method to fetch question and answer for a given nomination
   */
  fetchQuestionAnswers() {
    //fetch questions
    this.commonService._get(`/award/question/${this.nominationId}`,
      (res) => {
        this.questions = res.questions;
        if (this.questions && this.questions.length > 0) {
          //fetch answers
          this.commonService._get(`/award/answer/${this.nominationId}`,
            (res) => {
              this.answers = res.answers;
              this.isFinalSubmitted = res.isFinalSubmitted || false;
              this.juryChecked=res.juryChecked || false;
              //map answers to question and set property `mappedAnswers`
              this.mapAnswers();
              //Initialize the answer form
              if (this.user.role === 'user') {
                this.initForm();
                this.initStepper();
              } else {
                this.initScoreObject();
              }
            },
            (error) => { alert('Unable to fetch questions');return; });
        }
      },
      (error) => { alert('Unable to fetch answers'); });
  }

  /**
   * Map answers to the questions after fetching them
   */
  mapAnswers() {
    this.scoreObject = [];
    this.mappedAnswers = [];
    //Iterate through questions list
    for (let i = 0; i < this.questions.length; i++) {
      let val = this.questions[i];
      if(val.mapId==="qc-008") {
        if(this.isNominationBrand) {
          val.text=val.text.replaceAll("product", "brand");
        }
        else {
          val.text=val.text.replaceAll("brand", "product");
        }
      }
      else if(val.mapId==="qc-009") {
        if(this.isNominationBrand) {
          val.text=val.text.replaceAll("product", "brand");
        }
        else {
          val.text=val.text.replaceAll("brand", "product");
        }
      }
      else if(val.mapId==="qc-012") {
        if(this.isNominationBrand) {
          val.text=val.text.replaceAll("product", "brand");
        }
        else {
          val.text=val.text.replaceAll("brand", "product");
        }
      }
      else if(val.mapId==="qc-013") {
        if(this.isNominationBrand) {
          val.text=val.text.replaceAll("product", "brand");
        }
        else {
          val.text=val.text.replaceAll("brand", "product");
        }
      }
      else if(val.mapId==="qc-014") {
        if(this.isNominationBrand) {
          val.text=val.text.replaceAll("product", "brand");
        }
        else {
          val.text=val.text.replaceAll("brand", "product");
        }
      }
      else if(val.mapId==="qc-015") {
        if(this.isNominationBrand) {
          val.text=val.text.replaceAll("product", "brand");
        }
        else {
          val.text=val.text.replaceAll("brand", "product");
        }
      }
      let ans: IAnswer;
      //check if answer exists, then assign it to mapped answers
      let existedAnswer = this.answers.find(x => x.questionId === val._id);
      if (existedAnswer) { 
        ans = {
          ...existedAnswer,
          questionText: val.text,
          isScorable: val.isScorable,
          answerType: val.answerType,
          mapId: val.mapId,
        };
        if(ans.field === undefined) ans.field = {};
        if(ans.answerType==="FILE" && ans.field.file) {
          this.fileName=ans.field.file;
        }
      } else {
        //else initialize with empty answers
        ans = {
          questionId: val._id,
          nominationId: val.isScorable ? this.nominationId : "",
          userId: this.user.id,
          answeredBy: this.user.role,
          field: {},
          questionText: val.text,
          isScorable: val.isScorable,
          answerType: val.answerType,
          mapId: val.mapId,
        };
      }

      this.getInitialStep();
      this.mappedAnswers.push(ans);
    };
  }

  /**
 * Initializes the answer form state
 */
  initForm() {
    let chanQuesControls: { [key: string]: AbstractControl } = {};
    let controls1: { [key: string]: AbstractControl } = {};
    let controls2: { [key: string]: AbstractControl } = {};
    this.firstFormGroup = this._formBuilder.group(chanQuesControls);
    this.secondFormGroup = this._formBuilder.group(controls1);
    this.thirdFormGroup = this._formBuilder.group(controls2);
  }

  /**
   * Initialize score object, always call it after initializes the `mappedAnswers` by method `mapAnswers`,
   * `scoreObject` length equals to zero represents nomination not available for scoring
   */
  initScoreObject() {
    if(this.answers.length > 0)
    this.mappedAnswers.forEach(val => {
      if (val.scores && val.scores.length > 0) {
        this.scoreObject.push({
          ...val.scores[0],
          judgeId: this.user.id,
          answerId: val._id
        });
      } else {
        this.scoreObject.push({
          judgeId: this.user.id,
          score: 0,
          answerId: val._id
        });
      }
    });
    else alert('This nomination not available yet for scoring');
  }

  /**
   * post the answers to server
   * @param isFinalSubmission if user just saving the answers or making the final submission
   */
  _postAnswers(isFinalSubmission: boolean) {
    let answers: IAnswer[] = [];
    //creating request object for answer form submission request
    this.mappedAnswers.forEach(val => {
      let ans: IAnswer = Object.assign({}, val);
      if (this.files.length > 0 && val.mapId === "qc-015") {
        ans.field["file"] = this.nominationId + '.' + this.files[0].type.split('/').reverse()[0];
      }
      //these properties is not part of answer model
      delete ans.questionText;
      delete ans.isScorable;
      answers.push(ans);
    });

    const data = {
      answers: answers,
      nominationId: this.nominationId,
      isFinalSubmission: isFinalSubmission
    }
    let body = new FormData();
    body.append('data', JSON.stringify(data));
    if (this.files.length > 0) {
      body.append('file', this.files[0]);
    }
    this.commonService._post('/award/answer', body,
      (res) => {
        if (res.status === 'success') {
          this.answers = res.result;
          this.mapAnswers();
          //if user remove any channelier question's answer then this function,
          this.isChanQuesSubmitted();
          alert('Answers saved successfully');
          if(isFinalSubmission) this.isFinalSubmitted = true;
          this.initForm();
        }
      },
      (error) => { alert('Unable to save the answers'); })
  }

  /**
   * Move to next question page
   */
  nextQuesPage() {
    if(this.user.role === 'user') {
      if(this.isChanQuesSubmitted())
      this.stepper.next();
      else alert('Please submit all the answers of this section.');
    }

    if (this.user.role === 'jury') {
      this.stepper.next();
    }
  }

  /**
   * Move to previous question page
   */
  prevQuesPage() {
    this.stepper.previous();
  }

  /**
   * Check if channelier all question's answer is submitted or not,
   * move to scorable questions only when channelier question's answer completed
   */
  isChanQuesSubmitted(): boolean {
    for (let i = 0; i < this.mappedAnswers.length; i++) {
      const val = this.mappedAnswers[i];
      if (!val.isScorable && val.answerType !== "MULTI_SELECT" && !val.field.text) {
        return false;
      }
    }
    return true;
  }

  /**
   * Fetch and return the current question page to be shown
   */
   getInitialStep() {
    let isChannelierAnswerGiven = this.isChanQuesSubmitted();

    if (isChannelierAnswerGiven) this.initialStep = 1;
    this.initialStep = 0;
  }

  /**
   * @param answerId
   * return score given to particular answer
   */
  getScore(answerId: string) {
    const scoreobj = this.scoreObject.filter(val => val.answerId === answerId);
    if(scoreobj.length > 0)
    return scoreobj[0].score;
    else return 1;
  }

  /**
   * Called when score of any answer changes by slider and updates the `scoreObject`
   */
  scoreChanged(val) {
    const idx = this.scoreObject.findIndex(score => score.answerId === val.answerId);
    this.scoreObject[idx] = {
      ...val,
      judgeId: this.user.id
    };
  }

  getFile(val) {
    if(val.field.file) {
      const type=val.field.file.split('.')[1];
      if(type==='jpg' || type==='jpeg' || type==='png') {
        this.imgFile=val.field.file;
      }
      else if(type==='mp4' || type==="webm" || type==="ogg") {
        this.videoFile=val.field.file;
      }
      else if(type==='pdf' || type==='docx' || type==='ppt' || type==='txt') {
        this.pdfFile=val.field.file;
      }
      else {
        this.anotherFile=val.field.file;
      }
    }
  }

  /**
   * Saves the score given by jury, uses `scoreObject` to get score data
   */
  saveScores(val: boolean){
    this.juryChecked=val;
    if(val) {
      alert("Answer will be saved permanently");
    }
    this.commonService._post('/award/setScore',
    {scores: this.scoreObject, nominationId: this.nominationId, juryChecked: val},
    (res)=>{alert("score added successfully, thank you!")},
    (error)=>{alert("Error. Please try again later.")})
  }

  /**
   * Returns the question by question ID
   */
  getQuestionById(id: string): string | null {
    const mapped = this.mappedAnswers.find(val => val.questionId === id);
    if (mapped) {
      return mapped.questionText;
    }
    return null;
  }

  /**
   * Check if current form state is valid for final submission
   */
  checkFinalSubmitValidation(): boolean {
    for (let i = 0; i < this.mappedAnswers.length; i++) {
      const ans = this.mappedAnswers[i];
      if (ans.answerType === AnswerType.Text && !ans.field.text) {
        return false;
      }
      if (ans.answerType === AnswerType.SingleSelect && !(ans.field.selected || ans.field.opt_1)) {
        return false;
      }
      if (ans.answerType === AnswerType.SubQuest && Object.keys(ans.field).length !== 5) {
        return false;
      }
      if (ans.answerType === AnswerType.File && !ans.field.text && !ans.field.file) {
        return false;
      }
    }
    return true;
  }

  /**
   * Handles the final submission request
   */
   finalSubmission() {
     if (!this.checkFinalSubmitValidation()) {
       alert('All the questions must be answered for final submission.');
       return;
     }
     alert('After this submission you can not edit answers');
     this._postAnswers(true);
   }

   /**
    * Saves the answers using `_postAnswer method`
    */
    saveAnswers() {
      this._postAnswers(false);
    }

    onFileChange(event){
      this.files = event.target.files;
      const fileSize = this.files[0].size / 1024 / 1024 ; // in MB
      if (fileSize > 25) {
        alert('File size exceeds 25 MB');
      } else {
        if(this.files[0].name) {
          this.fileName = this.files[0].name;
        }
      }
    }
}
