import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/common.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-nomination',
  templateUrl: './nomination.component.html',
  styleUrls: ['./nomination.component.css']
})
export class NominationComponent implements OnInit {
  nominationsList: any = [];
  public id= this.route.snapshot.paramMap.get('id') || '';
  userInfo: any;
  name: any;
  email: any;
  phone: any;
  company: any;
  website: any;
  nominationInfo: any;
  showJuries: boolean=false;
  action =   {};
  from:any;
  to:any;
  total:any;
  cartTrue=0;
  totalArchive=0;
  totalPage = 0;
  currentPage = 1;
  totalItem = 10;
  searchContent:any;
  checkoutTrue=0
  type:any;
  selectedEmployee:any = [];
  employeeData:any;
  employee:String;
  answerSubmitted: String;
  orderReceived: String;
  juryAssigned: any;
  juryName: String;
  jury: any[]=[];
  searchText:string;
  orderBy:string;
  sort:string;
  questionnaire: any[];
  viewFileActive: number=0;
  imgFile: string;
  videoFile: string;
  pdfFile: string;
  anotherFile: string;
  currUrl: string;
<<<<<<< HEAD
=======
  partAanswer:any
>>>>>>> 23f3a2535f232e304b38606f4e48358ae9e49aeb
  constructor(public commonService: CommonService,private route: ActivatedRoute,public router: Router, public auth: AuthService) { }

  ngOnInit() {
    this.currUrl='https://'+window.location.host;
    this.getNominations();
    if(this.id) {
      this.getUserInfo();
    }
    this.getEmployeeData();
  }


  searchField(e){
    let searchText =  { '$regex': e.target.value, '$options': 'i' }
    this.commonService._post("getSearchField",searchText,res=>{
      this.searchContent=res;
    },err=>{

    })
  }

  getKey(obj){
    let keyName = Object.keys(obj)[1]
    let keyValue = Object.values(obj)[0]
    return keyName+keyValue;
  }

  getValue(obj){
    return Object.values(obj)[1]
  }

  search(obj){
    let keyName = Object.keys(obj)[1]
    let keyValue = Object.values(obj)[0]
    let keyActualValue = Object.values(obj)[1];
    console.log(keyName,keyValue,keyActualValue);


  }

  getNominations(from="",to=""){


    const body = {
      userId: this.id,
      start: this.from,
      enddate: this.to,
      limit: this.totalItem,
      skip: (this.currentPage-1) * this.totalItem,
      type:this.type,
      search:this.searchText,
      sort: this.sort,
      orderBy: this.orderBy,
      answerSubmitted: this.answerSubmitted,
      orderReceived: this.orderReceived,
    }



    this.commonService._post('get-user-nominations',body,(res)=>{
      this.cartTrue=0;
      this.checkoutTrue=0;
      this.nominationsList = res.response;
      this.total = res.nomineeTotal;
      this.totalPage = Math.ceil(res.pageTotal / this.totalItem);
      if(this.type=='archive')
      {
        this.totalArchive = res.pageTotal;
      }else{
        this.totalArchive=0;
      }





      this.cartTrue=res.cartTotal;

      this.checkoutTrue = res.checkoutTotal;


      for (let index = 0; index < this.nominationsList.length; index++) {

        const element = this.nominationsList[index];
        this.action[element['_id']+'_status'] = element['status'];
        this.action[element['_id']+'_cmnt'] = element['comment'];


      }
   },(err)=>{

   });
  }
  // getArchiveNomination(){
  //   if (this.archive) {
  //     this.archive = false
  //   }else{
  //     this.archive=true;
  //   }

  // }

  deletePost(id){

    const body={
      nomineeId:id,
      archive:typeof this.type=="undefined"?"-1":this.type
    }
    this.commonService._post("archiveNomination",body,res=>{

      this.getNominations(this.from, this.to)

    },err=>{
      console.log(err);

    })
  }
  filterNomination(){
    this.getNominations(this.from,this.to)

  }
  getUserInfo(){
    this.commonService._post('check-registration-data',{id:this.id},async (res)=>{
      this.userInfo = res[0];
      //  console.log(this.userInfo);
    },(err)=>{

    });
  }

  viewUser(user, item){
    this.name = user.name || 'NA';
    this.email = user.email || 'NA';
    this.phone = user.phone || 'NA';
    this.company = user.companyName || 'NA';
    this.website = user.website || 'NA';
    this.nominationInfo=item;
    this.commonService._get(`/admin/getJuryData/${item._id}`,
    (res) => {
      this.juryAssigned=res.jury;
      this.juryName="";
      for(let i=0;i<res.jury.length; i++) {
        this.juryName= (res.jury[i][0].name || "NA") + ' , ' + this.juryName;
      }
    },
    (error) => { alert('Unable to fetch Jury'); });
  }
  
  assignJury() {
    const body={
      archive: false,
      skip: 0,
      top: 100,
      year: '2021',
    }
    this.commonService._post(`get-jury-for-admin`, body,
    (res) => {
      this.jury=res.result;
      this.showJuries=true;
    },
    (error) => { alert('Unable to fetch Jury'); });
  }

  updateJury() {
    const newJuryId=document.querySelector('input[name="juries"]:checked').id;
    let cat1: string[] = [];
    let cat2: string[] = [];
    let cat3: string[] = [];
    let nominations: string[]=[this.nominationInfo._id];
    const body={
      assign:{cat1, cat2, cat3, nominations},
      jury: newJuryId,
    }
    this.commonService._post('/admin/assignNomination', body,
    (res) => {
      alert(res.status);
      if(this.nominationInfo.user[0]) {
        this.viewUser(this.nominationInfo.user[0],this.nominationInfo);
      }
    },
    (error: HttpErrorResponse) => {alert(error.error.msg)})
  }

  showDiv(val) {
    const x=document.getElementById('viewFile');
    if(val) {
      x.style.display="block";
      this.viewFileActive=2;
    }
    else {
      x.style.display="none";
      this.viewFileActive=1;
    }
  }

<<<<<<< HEAD
=======
  getImageSource(img){
    const imageChunks=img.split('/')
    console.log(imageChunks);
    const imageUrl=`https://awards.channelier.com/uploads/${imageChunks[imageChunks.length-1]}`
    console.log(imageUrl);
    
    return imageUrl
    
  }

>>>>>>> 23f3a2535f232e304b38606f4e48358ae9e49aeb
  viewQuestionAnswers(nominationId, user){
    //service to get questions.
    this.imgFile=null;
    this.videoFile=null;
    this.pdfFile=null;
    this.anotherFile=null;
    this.viewFileActive=0;
    this.commonService._get(`award/question/${nominationId}`,
    (res) => {
      let questions = res.questions;
      if (questions && questions.length > 0) {
        //fetch answers
        this.commonService._post(`/award/answerForAdmin`, {nominationId: nominationId, userId: user},
          (res) => {
            let answers = res.answers;
<<<<<<< HEAD
=======
            this.partAanswer=res.partAanswer
>>>>>>> 23f3a2535f232e304b38606f4e48358ae9e49aeb
            //map answers to question and set property `mappedAnswers`
            let finalRes=[];
            for(let i=0;i<questions.length; i++) {
              let val=questions[i];
              let ans=answers.find(x => x.questionId===val._id);
              let a="";
              if(ans && ans.field && (ans.field.text || ans.field.file)) {
                if(ans.field.text) {
                  a=ans.field.text;
                }
                if(ans.field.file) {
                  this.viewFileActive=1;
                  const type=ans.field.file.split('.')[1];
                  if(type==='jpg' || type==='jpeg' || type==='png') {
                    this.imgFile=ans.field.file;
                  }
                  else if(type==='mp4' || type==="webm" || type==="ogg") {
                    this.videoFile=ans.field.file;
                  }
                  else if(type==='pdf' || type==='docx' || type==='ppt' || type==='txt') {
                    this.pdfFile=ans.field.file;
                  }
                  else {
                    this.anotherFile=ans.field.file;
                  }
                }
              }
              else if(ans && ans.field && val.mapId==='qc-006') {
                let att=Object.getOwnPropertyNames(ans.field);
                let mat=["Beat management",'Multiple levels of channel partners', 'Custom Schemes and Pricing for Outlets', 'Login for Channel Partners', 'Works offline', 'Custom Forms and surveys', 'Module for delivery person, merchandiser', 'Measure Productivity', 'Predictive Analytics', 'Targets and Achievements', 'Daily Tasks Scheduling', 'Inventory visibility at retailer outlets', 'Track Payment Status', 'Reminders for Follow-ups', 'Track Location'];
                att.forEach(at => {
                  if(ans.field[at]) {
                    const ind=Number(at.slice(4));
                    a=a+mat[ind]+"\n";
                  }
                })
              }
              else if(val.mapId==='qc-007' && ans && ans.field && ans.field.selected) {
                let mat = ['1-5 SKU', '6-10 SKU', '11-15 SKU', '16-20 SKU', 'More than 20 SKUs'];
                const ind=Number(ans.field.selected);
                a=mat[ind-1];
              }
              else if(val.mapId==='qc-008' && ans && ans.field && ans.field.selected) {
                let mat = ['0 States', '1-5 States', '6-10 States', '11-15 States', '16-20 States', 'More than 20 States'];
                const ind=Number(ans.field.selected);
                a=mat[ind];
              }
              else if(ans && ans.field && val.mapId==='qc-009') {
                let mat=['Amazon', 'Flipkart', 'Big Baskets', 'Grofers', 'Company Website', 'Others']
                for(let i=0;i<=5;i++) {
                  var att="opt_"+i.toString();
                  var att2="text_"+i.toString();
                  if(ans.field[att]) {
                    a=a+mat[i]+" :  "+ans.field[att2]+"\n";
                  }
                }
              }
              else if(ans && ans.field && val.mapId==='qc-010') {
                let mat=['Instagram', 'Twitter', 'Facebook', 'Linkedin', 'Others'];
                for(let i=0;i<=4;i++) {
                  var att="opt_"+i.toString();
                  var att2="text_"+i.toString();
                  if(ans.field[att]) {
                    a=a+mat[i]+" :  "+ans.field[att2]+"\n";
                  }
                }
              }
              else if(ans && ans.field && val.mapId==='qc-011') {
                let mat=['Environmentally friendly packaging', 'Is the material biodegradable/green packaging', 'Packaging meets standard specified by regulatory body', 'Is the package reusable', 'Does it follow packaging and labelling regulation in India?'];
                for(let i=0;i<=4;i++) {
                  var att="opt_"+i.toString();
                  var s="";
                  if(ans.field[att]=='1') {
                    s="YES";
                  }
                  else if(ans.field[att]=='2')
                    s="NO";
                  else if(ans.field[att]=='3')
                    s="Don't Know"
                  a=a+(i+1).toString()+").  "+mat[i]+" :  "+s+"\n";
                }
              }
              else if(ans && val.mapId==='qc-017' && ans.field && ans.field.opt_1) {
                let mat=['Yes', 'No'];
                const ind=Number(ans.field.opt_1);
                a=mat[ind-1];
              }
              let scores=[];
              if(ans &&ans.scores) {
                for(let i=0;i<ans.scores.length;i++) {
                  let judgeId=ans.scores[i].judgeId;
                  let ph=ans.user.find(x => x._id===judgeId);
                  let jury=ans.jury.find(x => ph.phone===x.phone);
                let score={
                    score: ans.scores[i].score,
                    juryName: jury ? jury.name : 'Computerised Marks',
                  }
                  scores.push(score);
                }
              }
              let obj={
                question: val.text,
                id: val.mapId,
                answer: a,
                scores: scores,
              }
              finalRes.push(obj);
            }
            this.questionnaire=finalRes;
          },
          (error) => { alert('Unable to fetch questions');return; });
      }
    },
    (error) => { alert('Unable to fetch answers'); });
  }

  showAllNomination(){
    this.router.navigate(['/nominations'])
  }

  onBlurMethod(val,id,type) {
    if (val.trim()) {
     let temp:any = {};
     temp[type] = val;
    //  console.log(temp);

      this.commonService._post('update-nomination',{doc:temp,recordId:id},(res)=>{

      },(err)=>{
            console.log(err);
      });
    }
  }

  getEmployeeData(){
    this.commonService._get('getEmployeeData',res=>{
      this.employeeData=res


    },err=>{

    })
  }

  selectEmployee(value,id) {
    if(value) {
      let temp:any = {};
      temp['employeeName'] = value;
      this.commonService._post('update-nomination',{temp,recordId:id},(res)=>{
          let random : any;
          random = res;
          console.log(random);
      },(err)=>{
            console.log(err);
      });
    }
  }

  updateOrderReceived(value,id) {
    if(value) {
      let temp:any = {};
      temp['orderReceived'] = value;
      this.commonService._post('update-nomination',{temp,recordId:id},(res)=>{
          let random : any;
          random = res;
          console.log(random);
      },(err)=>{
            console.log(err);
      });
    }
  }

  didModify() {
    this.getNominations(this.from, this.to)
  }

  setOrder(sort : string) {

    this.orderBy = this.orderBy === "ASC" ? "DESC" : "ASC";
    this.sort = sort;
    this.getNominations(this.from, this.to);
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.selectedEmployee = [];
      this.getNominations(this.from, this.to)
    }



  }
  nextPage() {
    if (this.currentPage < this.totalPage) {
      this.currentPage++;
      this.selectedEmployee = [];
      this.getNominations(this.from, this.to)
    }


  }

  /**
   *
   * @param id Nomination ID
   * Move to the edit nomination page
   */
  goToEditPage(id: string) {
    this.router.navigate([`edit-nomination/${id}`]);
  }
}
