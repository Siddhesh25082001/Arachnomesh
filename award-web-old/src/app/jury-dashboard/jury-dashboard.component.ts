import { Component, OnInit } from '@angular/core';
import { CommonService } from '../common.service';

declare var Swiper:any;

@Component({
  selector: 'app-jury-dashboard',
  templateUrl: './jury-dashboard.component.html',
  styleUrls: ['./jury-dashboard.component.css']
})
export class JuryDashboardComponent implements OnInit {

  constructor(private commonService: CommonService) {
    this.companyListTree = [];
    this.nominationListTree = {};
    this.getUserInfo();
  }

  public nominationsCatLevel1: any[];
  public nominationsCatLevel2: any[];
  public nominationsCatLevel3: any[];
  public companyListTree: any[];
  public nominationListTree: any;
  userInfo: any;
  id:string = localStorage.getItem("userId"); 
  ngOnInit() {


    var swiper = new Swiper ('.mySwiper1', {
      slidesPerView: 'auto',
      spaceBetween: 30,
      autoplay: {
        delay: 2000,
        disableOnInteraction: true,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });

    this.commonService._post('/award/getAssignedNominationByCompany',{},
    (res)=>{
      this.companyListTree = res;
    },
    (error)=> alert('Unable to fetch nominations.'));
  }

  getUserInfo(){
    this.commonService._post('check-registration-data',{id:this.id},async (res)=>{
      this.userInfo = res[0];
       console.log(this.userInfo);
    },(err)=>{

    });
  }

  getSubCategoris(parentId: string, parentLevel: number): any[] {
    let list: any[] = [];
    if (parentLevel === 1) {
      list = this.nominationsCatLevel2.filter(val => val.parentId === parentId);
    }
    if (parentLevel === 2) {
      list = this.nominationsCatLevel3.filter(val => val.parentId === parentId);
    }
    if (list.length === 0) {
      console.log('HERE WE GO', parentId, parentLevel)
      list.push({isDummy: true, productId: parentId})
    }
    return list;
  }

  fetch_x(category: string, id: string) {
    const body = {
      category: category,
      categoryId: id,
    };
    if(!this.companyListTree.hasOwnProperty(id))
    this.commonService._post('/award/getAssignedNominationByCompany',body,
    (res)=>{
      this.companyListTree[id] = res;
    },
    (error)=> alert('Unable to fetch nominations.'));
  }

  fetch_y(category: string, cmpId: string) {
    const body = {
      category: category,
      cmpId: cmpId,
    };
    if(!this.nominationListTree.hasOwnProperty(cmpId))
    this.commonService._post('/award/getAssignedNomination',body,
    (res)=>{
      this.nominationListTree[cmpId] = res;
      console.log(this.nominationListTree);
    },
    (error)=> alert('Unable to fetch nominations.'));
  }

}
