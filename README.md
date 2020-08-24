# MTCaptcha-Angular-exapmple
Sample Implementation of MTCaptcha for  Angular


## MTCaptcha Express API

```
cd mt-node-api/
```

Install Node Modules 

```
npm install
```

Start API
```
npm run dev
```

API will be up at http://localhost:5000/

## MTCaptcha VueJS Application 

```
cd mt-angular-client
```

Install Node Modules via NPM
```
npm install
```

Start Angular Application

```
npm start
```
Application will be up at http://localhost:8080/

----
Inorder to run the application Register your domain at MTCaptcah ( https://admin.mtcaptcha.com/)
Get the Site key and update 
```
mt-angular-client/src/index.html
```

Need to update Site Private key on API to do backend Captcha Validation 

```
mt-node-api/config/config.js
```

Once the application is up go to 
http://localhost:8080/login

To see login page 

Test user name/password = test/test

