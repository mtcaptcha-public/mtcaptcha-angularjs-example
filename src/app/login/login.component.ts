import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AlertService, AuthenticationService } from '@/_services';

declare var mtcaptcha;
declare var mtcaptchaConfig;

@Component({ templateUrl: 'login.component.html' })
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;
    verifiedtoken: any;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService,
    ) {
        // redirect to home if already logged in
        if (this.authenticationService.currentUserValue) {
            this.router.navigate(['/']);
        }
    }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
        mtcaptchaConfig.renderQueue.push('login-captcha');
        
        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    // convenience getter for easy access to form fields
    get f() { return this.loginForm.controls; }

    onSubmit() {
         this.submitted = true;

         // reset alerts on submit
            this.alertService.clear();

         // stop here if form is invalid
            if (this.loginForm.invalid) {
              return;
            }

         this.loading = true;
         this.verifiedtoken = mtcaptcha.getVerifiedToken()
         this.authenticationService.login(this.f.username.value, this.f.password.value, this.verifiedtoken)
             .pipe(first())
             .subscribe(
                 res => {
                    this.loading = true;
                    this.router.navigate([this.returnUrl]);
                 },
                 error => {
                    this.alertService.error(error.error.msg);
                     this.loading = false;
                 });
     }
}