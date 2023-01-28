import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// import { SocialAuthService } from "@abacritt/angularx-social-login";
import { takeWhile } from 'rxjs';
declare const google: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, AfterViewInit {

  constructor(
    private router: Router,
    // private authService: SocialAuthService
  ) { }

  ngOnInit(): void {
    // this.authService.authState.pipe(takeWhile(() => true /* check if logged in to unsubscribe */)).subscribe((user) => {
    //   console.log(user)
    // });
  }

  ngAfterViewInit(): void {
    // window.handleCredentialResponse = (response: any) => {
    //   console.log("Encoded JWT ID token: " + response.credential);
    // }
    // window.onload = function () {
      google.accounts.id.initialize({
        client_id: "939503022711-9m2d1ejrp8ufj52m52iab1klqeqdk37k.apps.googleusercontent.com",
        callback: ((res: any) => {
          console.log(res)
        })
      });
      google.accounts.id.renderButton(
        document.getElementById("buttonDiv"),
        { theme: "outline", size: "large" }  // customization attributes
      );
      google.accounts.id.prompt(); // also display the One Tap dialog
    // }
  }

  public onLigin() {
    this.router.navigate(['/dashboard']);
  }

}
