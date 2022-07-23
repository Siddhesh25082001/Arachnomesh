import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { HomeComponent } from './Admin/home/home.component';
import { AdminLoginComponent } from './Admin/login/login.component';
import { UserPollingComponent } from './user-polling/user-polling.component';
// import { BlogPageComponent } from './blog-page/blog-page.component';
// import { BlogDetailComponent } from './blog-detail/blog-detail.component';
import { UserListComponent } from './Admin/user-list/user-list.component';
import { NominationComponent } from './Admin/nomination/nomination.component';
import { AuthGuardService as AuthGuard } from './auth/auth-guard.service';
import { PaymentsComponent } from './payments/payments.component';
import { QueryComponent } from './Admin/query/query.component';
import { PaymentComponent } from './Admin/payment/payment.component';
import { JuryComponent } from './jury/jury.component';
import { JuryPostComponent } from './jury-post/jury-post.component'
import { LeadsComponent } from './Admin/leads/leads.component';
import { MockupUploadComponent } from './Admin/mockup-upload/mockup-upload.component';
import { CampaignComponent } from './Admin/campaign/campaign.component';
import { AddBlogComponent } from './Admin/add-blog/add-blog.component';
import { BlogsListComponent } from './Admin/blogs-list/blogs-list.component';
import { BenefitPageComponent } from './benefit-page/benefit-page.component';
import { OtpRecordComponent } from './Admin/otp-record/otp-record.component';
import { NominationSliderComponent } from './Admin/nomination-slider/nomination-slider.component';
import { NominationPageComponent } from './nomination-page/nomination-page.component';
import { DashboardComponent } from './Admin/dashboard/dashboard.component'
import { ProfileUploadComponent } from './Admin/profile-upload/profile-upload.component';
import { NominationStatComponent } from './Admin/nomination-stat/nomination-stat.component';
import { EditNominationComponent } from './Admin/edit-nomination/edit-nomination.component';
import { JuryDashboardComponent } from './jury-dashboard/jury-dashboard.component';
import { QuestionPageComponent } from './question/question-page/question-page.component';
import { JuryAssignmentComponent } from './Admin/jury-assignment/jury-assignment.component';
const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'user-dashboard',
    component: UserDashboardComponent
  },
  {
    path: 'admin-dashboard',
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'admin',
    component: AdminLoginComponent
  },
  {
    path: 'user-polling',
    component: UserPollingComponent
  },
  // {
  //   path: 'blog',
  //   component: BlogPageComponent
  // },
  {
    path: 'benefit',
    component: BenefitPageComponent
  },
  // {
  //   path: 'blog/:companyName',
  //   component: BlogDetailComponent
  // },

  {
    path: 'users',
    component: UserListComponent,
    canActivate: [AuthGuard]
  },

  {
    path: 'otp-record',
    component: OtpRecordComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'nomination-record',
    component: NominationSliderComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'nominations',
    component: NominationComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'nominations-all',
    component: NominationPageComponent,
    // canActivate: [AuthGuard]
  },
  {
    path: 'user-queries',
    component: QueryComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'payment-info',
    component: PaymentComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'mockup-upload',
    component: MockupUploadComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'leads',
    component: LeadsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'jury',
    component: JuryComponent
  },
  {
    path: 'jury-post',
    component: JuryPostComponent
  },
  {
    path: 'payment',
    component: PaymentsComponent
  },
  {
    path: "client/:companyName",
    component: UserPollingComponent
  },
  {
    path: 'campaign',
    component: CampaignComponent,
    canActivate: [AuthGuard]
  },

  {
    path: 'add-blog/:blogId',
    component: AddBlogComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'blog-list',
    component: BlogsListComponent,
    canActivate: [AuthGuard]
  }, {
    path: 'stats-dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'profile-upload',
    component: ProfileUploadComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'nomination-stats',
    component: NominationStatComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'edit-nomination/:nominationId',
    component: EditNominationComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'jury-dashboard',
    component: JuryDashboardComponent,
  },
  {
    path: 'questions/:nominationId',
    component: QuestionPageComponent,
  },
  {
    path: 'assignment/:juryId',
    component: JuryAssignmentComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
