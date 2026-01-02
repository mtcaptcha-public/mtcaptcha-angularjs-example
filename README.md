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

## What to Test

The demo application includes:

1. **Basic Captcha Rendering**
   - Visual verification that the captcha widget appears
   - Check that the captcha is interactive

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

- [ ] Captcha widget appears on page
- [ ] `rendered` event fires (check status section)
- [ ] No error events (check status section)
- [ ] Can interact with captcha (click/verify)
- [ ] `token` event fires when solved (check status section)
- [ ] Token is displayed correctly
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

