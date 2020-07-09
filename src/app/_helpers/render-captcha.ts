import { Injectable } from '@angular/core';
import { mtcaptchaConfig } from '../env';


@Injectable({ providedIn: 'root' })
export class RenderCaptcha {

    renderCaptcha() {
        var mt_service = document.createElement('script');
        mt_service.async = true;
        mt_service.src = 'https://service.mtcaptcha.com/mtcv1/client/mtcaptcha.min.js';
        mt_service.id = "mt_service";
        (
            document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]
        ).appendChild(mt_service);
        var mt_service2 = document.createElement('script');
        mt_service2.async = true;
        mt_service2.src = 'https://service2.mtcaptcha.com/mtcv1/client/mtcaptcha.min.js';
        mt_service2.id = "mt_service2";

        (
            document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]
        ).appendChild(mt_service2);
        var mtcaptchaConfiguration = document.createElement('script');
        mtcaptchaConfiguration.text = "var mtcaptchaConfig = " + JSON.stringify(mtcaptchaConfig);
        mtcaptchaConfiguration.id="mtcaptchaConfiguration";
        (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(mtcaptchaConfiguration);
    }

    removeJS() {
        var mt_service = document.getElementById('mt_service');
        if (mt_service) {
            mt_service.parentNode.removeChild(mt_service);
        }
        var mt_service2 = document.getElementById('mt_service2');
        if (mt_service2) {
            mt_service2.parentNode.removeChild(mt_service2);
        }
        var mtcaptchaConfiguration = document.getElementById('mtcaptchaConfiguration');
        if (mtcaptchaConfiguration) {
            mtcaptchaConfiguration.parentNode.removeChild(mtcaptchaConfiguration);
        }
    }
}
