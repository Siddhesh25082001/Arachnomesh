import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { FooterComponent } from './footer/footer.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
// import {MatExpansionModule} from '@angular/material/expansion';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { UserHeaderComponent } from './user-header/user-header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdminDashboardHeaderComponent } from './Admin/admin-dashboard-header/admin-dashboard-header.component';
import {
  MatTabsModule, MatGridListModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatRadioModule,
  MatButtonModule,
  MatSelectModule,
  MatExpansionModule,
  MatChipsModule,
  MatTableModule,
  MatPaginatorModule,
  MatSnackBarModule,
  MatCardModule,
  MatTreeModule,
  MatSortModule,
  MatSlideToggleModule,
  MatSliderModule,
  MatCheckboxModule,
} from '@angular/material';
import { HomeComponent } from './Admin/home/home.component';
import { AdminLoginComponent } from './Admin/login/login.component';
import { UserPollingComponent } from './user-polling/user-polling.component';
import { UserListComponent } from './Admin/user-list/user-list.component';
import { JuryComponent } from "./jury/jury.component";
import { NominationComponent } from './Admin/nomination/nomination.component';
import { BlogPageComponent } from './blog-page/blog-page.component';
import { BlogDetailComponent } from './blog-detail/blog-detail.component';
import { PaymentsComponent } from './payments/payments.component';
import { PaymentComponent } from './Admin/payment/payment.component';
import { QueryComponent } from './Admin/query/query.component';
import { JuryPostComponent } from './jury-post/jury-post.component';
import { LeadsComponent } from './Admin/leads/leads.component';
import { MockupUploadComponent } from './Admin/mockup-upload/mockup-upload.component';
import { NumberOnlyDirective } from './number-only.directive';
import { InfiniteScrollerDirective } from './infinite-scroller.directive';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { CampaignComponent } from './Admin/campaign/campaign.component';
import { AddBlogComponent } from './Admin/add-blog/add-blog.component';
import { NgxEditorModule } from 'ngx-editor';
import { ConfigService } from './Admin/config.service';
import { QuillModule } from 'ngx-quill'
import { BlogsListComponent } from './Admin/blogs-list/blogs-list.component';
import { BenefitPageComponent } from './benefit-page/benefit-page.component';
import { ReversePipe } from './reverse.ngFor.component';
import { OtpRecordComponent } from './Admin/otp-record/otp-record.component';
import { NominationSliderComponent } from './Admin/nomination-slider/nomination-slider.component';
import { NominationPageComponent } from './nomination-page/nomination-page.component';
import { DashboardComponent } from './Admin/dashboard/dashboard.component'
import { ProfileUploadComponent } from './Admin/profile-upload/profile-upload.component';
import { NominationStatComponent } from './Admin/nomination-stat/nomination-stat.component';
import { EditNominationComponent } from './Admin/edit-nomination/edit-nomination.component'
import { AuthInterceptor } from './auth/http-interceptor';
import { JuryDashboardComponent } from './jury-dashboard/jury-dashboard.component';
import { QuestionPageComponent } from './question/question-page/question-page.component';
import { ScoreComponent } from './question/score/score.component';
import { JuryAssignmentComponent } from './Admin/jury-assignment/jury-assignment.component';
import {MatStepperModule} from '@angular/material/stepper';
import { NgxDocViewerModule } from 'ngx-doc-viewer';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    FooterComponent,
    UserDashboardComponent,
    UserHeaderComponent,
    AdminDashboardHeaderComponent,
    HomeComponent,
    AdminLoginComponent,
    UserPollingComponent,
    UserListComponent,
    NominationComponent,
    BlogPageComponent,
    BlogDetailComponent,
    PaymentsComponent,
    PaymentComponent,
    QueryComponent,
    JuryComponent,
    JuryPostComponent,
    LeadsComponent,
    MockupUploadComponent,
    NumberOnlyDirective,
    InfiniteScrollerDirective,
    CampaignComponent,
    AddBlogComponent,
    BlogsListComponent,
    BenefitPageComponent,
    ReversePipe,
    OtpRecordComponent,
    NominationSliderComponent,
    NominationPageComponent,
    DashboardComponent,
    ProfileUploadComponent,
    NominationStatComponent,
    EditNominationComponent,
    JuryDashboardComponent,
    QuestionPageComponent,
    ScoreComponent,
    JuryAssignmentComponent,
  ],
  imports: [
    BrowserModule,
    MatExpansionModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatTabsModule,
    MatIconModule,
    NgxDocViewerModule,
    MatGridListModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatCheckboxModule,
    MatButtonModule,
    MatSelectModule,
    MatChipsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSnackBarModule,
    InfiniteScrollModule,
    NgxEditorModule,
    QuillModule.forRoot(),
    MatCardModule,
    MatTreeModule,
    MatTableModule,
    MatSortModule,
    MatSlideToggleModule,
    MatSliderModule,
    MatCheckboxModule,
    MatStepperModule
  ],
  providers: [
    ConfigService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
