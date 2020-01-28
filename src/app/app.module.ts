import { environment } from "./../environments/environment";
import { BsDropdownModule } from "ngx-bootstrap";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { PatientLoginComponent } from "./external/patient-login/patient-login.component";
import { FacultyLoginComponent } from "./external/faculty-login/faculty-login.component";
import { PatientRegisterComponent } from "./external/patient-register/patient-register.component";
import { LoginComponent } from "./external/login/login.component";
import { PageNotFoundComponent } from "./external/page-not-found/page-not-found.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { AuthService } from "./services/auth.service";
import { InterceptorService } from "./services/interceptor.service";
import { ToastrModule } from "ngx-toastr";
import { AuthGuardService } from "./services/auth-guard.service";
import { AdminLoginComponent } from "./external/admin-login/admin-login.component";
import { AdminModule } from "./admin/admin.module";
import { BsDatepickerModule } from "ngx-bootstrap/datepicker";
import { FacultyModule } from "./faculty/faculty.module";
import { HospitalLoginComponent } from "./external/hospital-login/hospital-login.component";
import { ClinicModule } from "./clinic/clinic.module";
import { PatientModule } from "./patient/patient.module";
import { ClickOutsideModule } from "ng4-click-outside";
import { SharedModule } from "./shared/shared.module";
import { McBreadcrumbsModule } from "ngx-breadcrumbs";
import { IntlInputPhoneModule } from "intl-input-phone";
import { ResetPasswordComponent } from "./external/reset-password/reset-password.component";
// import { FooterComponent } from "./external/footer/footer.component";
import { NgxCaptchaModule } from "ngx-captcha";
import { MessagingService } from "./services/messaging.service";
import { AngularFireDatabaseModule } from "@angular/fire/database";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFireMessagingModule } from "@angular/fire/messaging";
import { AngularFireModule } from "@angular/fire";
import { NotificationService } from "./services/notification.service";
import { CommonService } from "./services/common.service";
import { AdminAuthGuardService } from "./services/admin-auth-guard.service";
import { ClinicAuthGuardService } from "./services/clinic-auth-guard.service";
import { FacultyAuthGuardService } from "./services/faculty-auth-guard.service";

@NgModule({
  declarations: [
    AppComponent,
    PatientLoginComponent,
    FacultyLoginComponent,
    PatientRegisterComponent,
    LoginComponent,
    PageNotFoundComponent,
    ResetPasswordComponent,
    // FooterComponent,
    AdminLoginComponent,
    HospitalLoginComponent
  ],
  imports: [
    BrowserModule,
    NgxCaptchaModule,
    IntlInputPhoneModule,
    BsDropdownModule.forRoot(),
    AppRoutingModule,
    McBreadcrumbsModule.forRoot(),
    ClickOutsideModule,
    BrowserAnimationsModule,
    BsDatepickerModule.forRoot(),
    FormsModule,
    AdminModule,
    ClinicModule,
    PatientModule,
    FacultyModule,
    SharedModule,
    HttpClientModule,
    ReactiveFormsModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireMessagingModule,
    AngularFireModule.initializeApp(environment.firebase),
    ToastrModule.forRoot({
      positionClass: "toast-bottom-right",
      timeOut: 3000,
      preventDuplicates: true
    })
  ],
  providers: [
    MessagingService,
    NotificationService,
    AuthService,
    AdminAuthGuardService,
    ClinicAuthGuardService,
    FacultyAuthGuardService,
    CommonService,
    AuthGuardService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
