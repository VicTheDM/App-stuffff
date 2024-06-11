import { Router } from '@angular/router';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

// Models
import { LoginObject } from 'src/app/models/login_object';
// Servicios
import { AuthService } from 'src/app/services/auth.service';
import { SessionStorageService } from 'src/app/services/session-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  public user: LoginObject;
  public municipios:string[] = [];

  // UI
  public userInput     = false;
  public userPassword  = false;
  public loading       = false;
  public loadComplete  = false;
  public userComplete  = false;
  public passComplete  = false;
  public showPass      = false;
  public error         = false;
  public logo           = '';

  public simpleForm : FormGroup;
  public loginForm  : FormGroup;
  public municipioActual: string | null;

  @ViewChild('email') emailInput: ElementRef | undefined;
  @ViewChild('password') passwordInput: ElementRef | undefined;
  @ViewChild('loginButton') loginButton: ElementRef | undefined;

  constructor(
    private sessionStorage        : SessionStorageService,
    private readonly router       : Router,
    private formBuilder           : FormBuilder,
    private authenticationService : AuthService,
  ) {
    this.simpleForm = this.formBuilder.group({
      username : new FormControl('', [Validators.required]),
      password : new FormControl('', [Validators.required]),
    });
    this.sessionStorage.removeCurrentSession();
  }

  async onSubmit() {
    if (!this.error) {
      const $btnLoginButton = <HTMLButtonElement>document.getElementById('loginButton');
      this.loading = true;
      if (this.simpleForm.valid) {
        this.user = {
          username: this.simpleForm.value.username,
          password: this.simpleForm.value.password,
          remember: 0
        }
        await this.authenticationService.login(this.user).subscribe(data => {
          console.log("🚀 ~ LoginComponent ~ awaitthis.authenticationService.login ~ data:", data)
          //Formateo de los permisos
          // data.permissions = [...data.permissions[0].permissions]
          this.correctLogin(data);
        }, error => {
          this.error = true;
          this.loading = false;
          setTimeout(() => $btnLoginButton.focus(), 250);
          setTimeout(() => this.resetForm(), 3000);
        });
      }
    } else {
      this.resetForm()
    }
  }

  checkUser(event) {
    if(!this.userInput) {
      this.userInput    = this.userComplete = event.target.value.length > 4 ? true : false;
      this.userPassword = false;
    }
  }

  checkPass(event) {
    this.userPassword = this.passComplete = event.target.value.length > 4 ? true : false;
  }

  ngOnInit(): void {
    const $inputUser = document.getElementById('username');
    setTimeout(() => {
      const
        user = this.sessionStorage.getCurrentSession(),
        municipio: string = localStorage.getItem('municipio') || "",
        municipioToValidate = localStorage.getItem(municipio);
      if (municipioToValidate != "" && municipioToValidate != null) {
        if (user.accessToken !== undefined && user.accessToken !== null) {
          if (user.accessToken.token !== undefined && user.accessToken.token !== null) {
            this.redirectPage()
          }
        }
      }
      this.loadComplete = true;
      setTimeout(() => $inputUser.focus(), 1000);
    }, 500)
  }

  private correctLogin(data) {
    localStorage.setItem('municipio', this.simpleForm.value.municipio)
    this.sessionStorage.saveCurrentSession(data);
    this.redirectPage();
    setTimeout(() => window.location.reload(), 1000);
  }

  redirectPage() {
    this.router.navigate(['/bienvenido']);
  }

  showPassword(): void {
    const $inputPassword = <HTMLInputElement>document.getElementById('password');
    this.showPass = !this.showPass;
    if (this.showPass) {
      $inputPassword.value !== '' ? $inputPassword.select() : $inputPassword.focus();
    } else {
      $inputPassword.select()
    }
  }

  resetForm() {
    const $form = document.getElementById('form');
    const $inputPassword    = <HTMLInputElement>document.getElementById('password');
    const $inputuser        = <HTMLInputElement>document.getElementById('username');
    $inputPassword.value = '';
    $inputuser.value = '';
    this.error = false;
    this.loading = false;
    this.userPassword = this.userInput = this.passComplete = this.userComplete = false;
    $form.classList.remove('ng-submitted');
    setTimeout(() => $inputuser.focus(), 250);
  }
}
