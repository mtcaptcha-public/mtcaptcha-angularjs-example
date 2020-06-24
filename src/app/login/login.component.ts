import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AlertService, AuthenticationService } from '@/_services';

@Component({ templateUrl: 'login.component.html' })
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService
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
        this.renderCaptcha();
        mtcaptcha.renderUI("login-captcha",mtcaptchaConfig);
        console.log("abc");
        //this.mtcaptchaConfig.renderQueue.push('login-captcha');
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
        this.authenticationService.login(this.f.username.value, this.f.password.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.router.navigate([this.returnUrl]);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }
    renderCaptcha(){
      var mtcaptchaConfig = {
        "sitekey": "<YOUR SITEKEY>", // Get tie site key from Sites page of MTCaptcha admin site 
        "widgetSize": "mini",
        "theme": "overcast",
        "render": "explicit",
        "renderQueue": []
    };
      var mt_service = document.createElement('script');
      mt_service.async = true;
      mt_service.src = 'https://service.mtcaptcha.com/mtcv1/client/mtcaptcha.min.js';
      (
        document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]
      ).appendChild(mt_service);
      var mt_service2 = document.createElement('script');
      mt_service2.async = true;
      mt_service2.src = 'https://service.mtcaptcha.com/mtcv1/client/mtcaptcha2.min.js';
      (
        document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]
      ).appendChild(mt_service2);
      var mtcaptchaConfiguration = document.createElement('script');
      mtcaptchaConfiguration.text = "var mtcaptchaConfig = "+ JSON.stringify(mtcaptchaConfig);
      ( document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(mtcaptchaConfiguration);
      }
}
    