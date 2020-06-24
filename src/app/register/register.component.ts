import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AlertService, UserService, AuthenticationService } from '@/_services';

@Component({ templateUrl: 'register.component.html' })
export class RegisterComponent implements OnInit {
    registerForm: FormGroup;
    loading = false;
    submitted = false;

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private authenticationService: AuthenticationService,
        private userService: UserService,
        private alertService: AlertService
    ) {
        // redirect to home if already logged in
        if (this.authenticationService.currentUserValue) {
            this.router.navigate(['/']);
        }
    }

    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            username: ['', Validators.required],
            password: ['', [Validators.required, Validators.minLength(6)]]
        });
        this.renderCaptcha();
        mtcaptcha.renderUI("login-captcha",mtcaptchaConfig);
        console.log("abc");
    }

    // convenience getter for easy access to form fields
    get f() { return this.registerForm.controls; }

    onSubmit() {
        this.submitted = true;

        // reset alerts on submit
        this.alertService.clear();

        // stop here if form is invalid
        if (this.registerForm.invalid) {
            return;
        }

        this.loading = true;
        this.userService.register(this.registerForm.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.alertService.success('Registration successful', true);
                    this.router.navigate(['/login']);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }
    renderCaptcha(){
        var mtcaptchaConfig = {
          "sitekey": "MTPublic-Pgv2FUrNY", // Get tie site key from Sites page of MTCaptcha admin site 
          "widgetSize": "mini",
          "theme": "overcast",
          "render": "explicit",
          "renderQueue": []
      };
        var mt_service = document.createElement('script');
        mt_service.async = true;
        mt_service.src = 'https://qa-service.sadtron.com/mtcv1/client/mtcaptcha.min.js';
        (
          document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]
        ).appendChild(mt_service);
        var mt_service2 = document.createElement('script');
        mt_service2.async = true;
        mt_service2.src = 'https://qa-service.sadtron.com/mtcv1/client/mtcaptcha.min.js';
        (
          document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]
        ).appendChild(mt_service2);
        var mtcaptchaConfiguration = document.createElement('script');
        mtcaptchaConfiguration.text = "var mtcaptchaConfig = "+ JSON.stringify(mtcaptchaConfig);
        ( document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(mtcaptchaConfiguration);
        }
}
