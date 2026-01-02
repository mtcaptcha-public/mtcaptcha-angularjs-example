import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MTCaptchaComponent, MTCaptchaService } from 'ng-mtcaptcha';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MTCaptchaComponent, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('MTCaptcha Demo');
  
  // Replace with your actual MTCaptcha sitekey
  // Get your sitekey from: https://www.mtcaptcha.com/
  sitekey = 'MTPublic-YourSiteKeyHere';
  
  // Status tracking
  isRendered = signal(false);
  hasError = signal(false);
  errorMessage = signal('');
  captchaToken = signal<string | null>(null);
  isExpired = signal(false);
  
  // Multiple captcha examples with different configurations
  // Example 1: Standard size (default)
  standardConfig = {
    sitekey: this.sitekey,
    widgetSize: 'standard' as const
  };
  
  // Example 2: Mini size
  miniConfig = {
    sitekey: this.sitekey,
    widgetSize: 'mini' as const
  };
  
  // Example 3: Custom language text
  customTextConfig = {
    sitekey: this.sitekey,
    widgetSize: 'standard' as const,
    customLangText: {
      'en': {
        'verify': 'Verify Me',
        'refresh': 'New Challenge',
        'mandatory': 'Please complete the verification'
      }
    }
  };
  
  // Example 4: Custom styling
  customStyleConfig = {
    sitekey: this.sitekey,
    widgetSize: 'standard' as const,
    customStyle: {
      'font-family': 'Arial, sans-serif',
      'font-size': '16px',
      'color': '#333333',
      'border-radius': '8px'
    }
  };
  
  // Example 5: Mini with custom text
  miniCustomTextConfig = {
    sitekey: this.sitekey,
    widgetSize: 'mini' as const,
    customLangText: {
      'en': {
        'verify': 'Verify',
        'refresh': 'Refresh'
      }
    }
  };
  
  // Example 6: Standard with theme
  themeConfig = {
    sitekey: this.sitekey,
    widgetSize: 'standard' as const,
    theme: 'light'
  };
  
  // Track tokens for each example
  exampleTokens = signal<Record<string, string | null>>({
    standard: null,
    mini: null,
    customText: null,
    customStyle: null,
    miniCustom: null,
    theme: null
  });
  
  constructor(private mtcaptchaService: MTCaptchaService) {
    // Subscribe to service observables
    this.mtcaptchaService.rendered$.subscribe(() => {
      console.log('✅ Captcha rendered via service');
      this.isRendered.set(true);
    });
    
    this.mtcaptchaService.error$.subscribe((error) => {
      console.error('❌ Captcha error via service:', error);
      this.hasError.set(true);
      // Better error message extraction
      let message = 'Unknown error';
      if (error?.message) {
        message = error.message;
      } else if (typeof error === 'string') {
        message = error;
      } else if (error?.toString) {
        message = error.toString();
      }
      this.errorMessage.set(message);
      console.error('Service error details:', {
        error,
        type: typeof error,
        message: error?.message,
        stack: error?.stack
      });
    });
    
    this.mtcaptchaService.verifyexpired$.subscribe(() => {
      console.log('⏰ Captcha expired');
      this.isExpired.set(true);
      this.captchaToken.set(null);
    });
  }
  
  onCaptchaRendered() {
    console.log('✅ Captcha rendered event fired');
    this.isRendered.set(true);
    this.hasError.set(false);
  }
  
  onCaptchaToken(token: string, exampleId?: string) {
    console.log('🎫 Captcha token received:', token, exampleId ? `(Example: ${exampleId})` : '');
    this.captchaToken.set(token);
    this.isExpired.set(false);
    
    if (exampleId) {
      const tokens = this.exampleTokens();
      this.exampleTokens.set({ ...tokens, [exampleId]: token });
    }
  }
  
  onCaptchaError(error: any) {
    console.error('❌ Captcha error event:', error);
    this.hasError.set(true);
    // Better error message extraction
    let message = 'Unknown error';
    if (error?.message) {
      message = error.message;
    } else if (typeof error === 'string') {
      message = error;
    } else if (error?.toString) {
      message = error.toString();
    }
    this.errorMessage.set(message);
    console.error('Error details:', {
      error,
      type: typeof error,
      message: error?.message,
      stack: error?.stack
    });
  }
  
  onCaptchaExpired() {
    console.log('⏰ Captcha expired event');
    this.isExpired.set(true);
    this.captchaToken.set(null);
  }
  
  resetStatus() {
    this.isRendered.set(false);
    this.hasError.set(false);
    this.errorMessage.set('');
    this.captchaToken.set(null);
    this.isExpired.set(false);
  }
}
