# MTCaptcha Demo Application

This is a demo application to test and verify the `ng-mtcaptcha` library.

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/mtcaptcha-public/mtcaptcha-angularjs-example.git
   cd mtcaptcha-angularjs-example
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Add your MTCaptcha sitekey:**
   - Open `src/app/app.ts`
   - Replace the sitekey value with your actual MTCaptcha sitekey:
   ```typescript
   sitekey = 'YOUR_ACTUAL_SITEKEY';
   ```

## Running the Demo

```bash
# Using npm script (recommended)
npm start

# Or using Angular CLI directly
ng serve demo

# Or specify a custom port
ng serve demo --port 4200
```

The application will be available at `http://localhost:4200`

## Demo Examples

The demo application includes **6 different examples** showcasing various customization options:

1. **Standard Size (Default)** - Basic configuration with standard widget size
2. **Mini Size** - Compact widget perfect for smaller forms or mobile interfaces
3. **Custom Language Text** - Customized button labels and messages
4. **Custom Styling** - Custom CSS styles to match your application theme
5. **Mini with Custom Text** - Combining mini size with custom language text
6. **Theme Configuration** - Applying different themes to the captcha widget

## ng-mtcaptcha Library Parameters

The `ng-mtcaptcha` library provides a flexible API through the `MTCaptchaComponent` with various input properties and output events. Below is a comprehensive guide to all available parameters.

### Component Inputs (Properties)

#### `sitekey` (Required)
- **Type:** `string`
- **Required:** Yes
- **Description:** Your MTCaptcha sitekey (public key). Get your sitekey from [MTCaptcha Dashboard](https://www.mtcaptcha.com/)
- **Example:**
  ```typescript
  sitekey = 'MTPublic-YourSiteKeyHere';
  ```
  ```html
  <ng-mtcaptcha [sitekey]="sitekey"></ng-mtcaptcha>
  ```

#### `widgetSize` (Optional)
- **Type:** `'mini' | 'standard'`
- **Default:** `'standard'`
- **Description:** Controls the size of the captcha widget
  - `'standard'`: Full-size widget (default)
  - `'mini'`: Compact widget for smaller spaces
- **Example:**
  ```html
  <!-- Standard size (default) -->
  <ng-mtcaptcha [sitekey]="sitekey" [widgetSize]="'standard'"></ng-mtcaptcha>
  
  <!-- Mini size -->
  <ng-mtcaptcha [sitekey]="sitekey" [widgetSize]="'mini'"></ng-mtcaptcha>
  ```

#### `theme` (Optional)
- **Type:** `string`
- **Default:** Browser default
- **Description:** Theme for the captcha widget. Common values include `'light'`, `'dark'`, etc.
- **Example:**
  ```html
  <ng-mtcaptcha [sitekey]="sitekey" [theme]="'light'"></ng-mtcaptcha>
  ```

#### `customLangText` (Optional)
- **Type:** `Record<string, any> | string`
- **Description:** Customize language text and button labels. Can be provided as:
  - A JSON object
  - A JSON string
- **Example (Object):**
  ```typescript
  customLangText = {
    'en': {
      'verify': 'Verify Me',
      'refresh': 'New Challenge',
      'mandatory': 'Please complete the verification'
    }
  };
  ```
  ```html
  <ng-mtcaptcha 
    [sitekey]="sitekey" 
    [customLangText]="customLangText">
  </ng-mtcaptcha>
  ```
- **Example (String):**
  ```typescript
  customLangText = '{"en":{"verify":"Verify","refresh":"Refresh"}}';
  ```

#### `customStyle` (Optional)
- **Type:** `Record<string, any> | string`
- **Description:** Apply custom CSS styles to the captcha widget. Can be provided as:
  - A JSON object with CSS properties
  - A JSON string
- **Example (Object):**
  ```typescript
  customStyle = {
    'font-family': 'Arial, sans-serif',
    'font-size': '16px',
    'color': '#333333',
    'border-radius': '8px'
  };
  ```
  ```html
  <ng-mtcaptcha 
    [sitekey]="sitekey" 
    [customStyle]="customStyle">
  </ng-mtcaptcha>
  ```
- **Example (String):**
  ```typescript
  customStyle = '{"font-family":"Arial","font-size":"14px"}';
  ```

### Component Outputs (Events)

#### `token` Event
- **Type:** `EventEmitter<string>`
- **Description:** Emits the verification token when the captcha is successfully solved
- **Usage:**
  ```html
  <ng-mtcaptcha 
    [sitekey]="sitekey"
    (token)="onToken($event)">
  </ng-mtcaptcha>
  ```
  ```typescript
  onToken(token: string) {
    console.log('Captcha token:', token);
    // Send token to your backend for verification
  }
  ```

#### `rendered` Event
- **Type:** `EventEmitter<void>`
- **Description:** Emits when the captcha widget is fully rendered and ready
- **Usage:**
  ```html
  <ng-mtcaptcha 
    [sitekey]="sitekey"
    (rendered)="onRendered()">
  </ng-mtcaptcha>
  ```
  ```typescript
  onRendered() {
    console.log('Captcha is ready!');
  }
  ```

#### `expired` Event
- **Type:** `EventEmitter<void>`
- **Description:** Emits when the captcha verification token expires
- **Usage:**
  ```html
  <ng-mtcaptcha 
    [sitekey]="sitekey"
    (expired)="onExpired()">
  </ng-mtcaptcha>
  ```
  ```typescript
  onExpired() {
    console.log('Token expired, user needs to solve again');
  }
  ```

#### `error` Event
- **Type:** `EventEmitter<any>`
- **Description:** Emits when the captcha encounters an error
- **Usage:**
  ```html
  <ng-mtcaptcha 
    [sitekey]="sitekey"
    (error)="onError($event)">
  </ng-mtcaptcha>
  ```
  ```typescript
  onError(error: any) {
    console.error('Captcha error:', error);
  }
  ```

### Complete Example with All Parameters

```typescript
import { Component } from '@angular/core';
import { MTCaptchaComponent } from 'ng-mtcaptcha';

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [MTCaptchaComponent],
  template: `
    <ng-mtcaptcha 
      [sitekey]="sitekey"
      [widgetSize]="'standard'"
      [theme]="'light'"
      [customLangText]="customLangText"
      [customStyle]="customStyle"
      (rendered)="onRendered()"
      (token)="onToken($event)"
      (expired)="onExpired()"
      (error)="onError($event)">
    </ng-mtcaptcha>
  `
})
export class ExampleComponent {
  sitekey = 'MTPublic-YourSiteKeyHere';
  
  customLangText = {
    'en': {
      'verify': 'Verify',
      'refresh': 'Refresh'
    }
  };
  
  customStyle = {
    'font-family': 'Arial, sans-serif',
    'font-size': '14px'
  };
  
  onRendered() {
    console.log('Captcha rendered');
  }
  
  onToken(token: string) {
    console.log('Token:', token);
  }
  
  onExpired() {
    console.log('Token expired');
  }
  
  onError(error: any) {
    console.error('Error:', error);
  }
}
```

## MTCaptchaService API

The `MTCaptchaService` provides programmatic access to captcha functionality.

### Service Methods

#### `getVerifiedToken(): string | null`
- **Returns:** The current verified token if captcha is solved, `null` otherwise
- **Usage:**
  ```typescript
  constructor(private mtcaptchaService: MTCaptchaService) {}
  
  submitForm() {
    const token = this.mtcaptchaService.getVerifiedToken();
    if (token) {
      // Token is available, proceed with form submission
    } else {
      // Show error, captcha not solved
      this.mtcaptchaService.showMandatory();
    }
  }
  ```

#### `showMandatory(): void`
- **Description:** Shows a mandatory error message if the captcha is not solved
- **Usage:**
  ```typescript
  onSubmit() {
    const token = this.mtcaptchaService.getVerifiedToken();
    if (!token) {
      this.mtcaptchaService.showMandatory();
      return;
    }
    // Proceed with submission
  }
  ```

#### `setGlobalConfig(options: MTCaptchaOptions): void`
- **Description:** Configure global MTCaptcha settings
- **Usage:**
  ```typescript
  ngOnInit() {
    this.mtcaptchaService.setGlobalConfig({
      sitekey: this.sitekey,
      theme: 'light',
      widgetSize: 'standard',
      customLangText: { /* ... */ },
      customStyle: { /* ... */ }
    });
  }
  ```

### Service Observables

#### `token$: Observable<string | null>`
- **Description:** Observable that emits tokens when captcha is verified
- **Usage:**
  ```typescript
  ngOnInit() {
    this.mtcaptchaService.token$.subscribe(token => {
      if (token) {
        console.log('Token received:', token);
      }
    });
  }
  ```

#### `rendered$: Observable<void>`
- **Description:** Observable that emits when captcha is rendered
- **Usage:**
  ```typescript
  this.mtcaptchaService.rendered$.subscribe(() => {
    console.log('Captcha rendered');
  });
  ```

#### `verified$: Observable<string>`
- **Description:** Observable that emits when captcha is verified (includes token)
- **Usage:**
  ```typescript
  this.mtcaptchaService.verified$.subscribe(token => {
    console.log('Verified with token:', token);
  });
  ```

#### `verifyexpired$: Observable<void>`
- **Description:** Observable that emits when captcha verification expires
- **Usage:**
  ```typescript
  this.mtcaptchaService.verifyexpired$.subscribe(() => {
    console.log('Verification expired');
  });
  ```

#### `error$: Observable<any>`
- **Description:** Observable that emits when captcha encounters an error
- **Usage:**
  ```typescript
  this.mtcaptchaService.error$.subscribe(error => {
    console.error('Captcha error:', error);
  });
  ```

## What to Test

The demo application includes:

1. **Multiple Captcha Examples**
   - Standard size widget
   - Mini size widget
   - Custom language text
   - Custom styling
   - Combined configurations

2. **Event Handling**
   - `rendered` event - fires when captcha is rendered
   - `token` event - fires when captcha is solved
   - `error` event - fires if there's an error
   - `expired` event - fires when token expires

3. **Service Integration**
   - Service observables (`rendered$`, `error$`, `verifyexpired$`)
   - Token retrieval via service

4. **Status Monitoring**
   - Real-time status display
   - Token display when received
   - Error messages if any

## Testing Checklist

- [ ] All 6 captcha examples appear on page
- [ ] Standard size widget displays correctly
- [ ] Mini size widget displays correctly
- [ ] Custom text examples show customized labels
- [ ] Custom style examples apply custom CSS
- [ ] `rendered` event fires for each example
- [ ] No error events (check browser console)
- [ ] Can interact with each captcha (click/verify)
- [ ] `token` event fires when solved (check token badges)
- [ ] Tokens are displayed correctly for each example
- [ ] Check browser console for logs
- [ ] Verify MTCaptcha script loads (Network tab in DevTools)
- [ ] Test expiration (if applicable)

## Browser Console

Open the browser console to see detailed logs:
- ✅ Captcha rendered messages
- 🎫 Token received messages
- ❌ Error messages (if any)
- ⏰ Expiration messages

## Network Tab

In browser DevTools → Network tab, verify:
- `mtcaptcha.min.js` loads successfully (status 200)
- No failed requests

## Notes

- This demo application installs `ng-mtcaptcha` from npm (version ^0.5.0)
- The library is available at: https://www.npmjs.com/package/ng-mtcaptcha
- Make sure to run `npm install` before starting the application

