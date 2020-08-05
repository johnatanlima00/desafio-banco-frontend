import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service'
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public formLogin: FormGroup = new FormGroup({
    "email": new FormControl(null, [ Validators.required, Validators.email ]),
    "senha": new FormControl(null, [ Validators.required ])
  })

  constructor(
    private router: Router,
    public authService: AuthService,
    public storageService: StorageService
  ) { }

  ngOnInit() {
    if (this.storageService.getLocalUser()){
      this.authService.refreshToken()
        .subscribe((response) => {
          this.authService.successfulLogin(response.headers.get('Authorization'))
          this.router.navigate(['/home', 'detalhe'])
        })
    }
  }

  entrar(){
    this.authService.getToken(this.formLogin.value)
      .subscribe((response) => {
        this.authService.successfulLogin(response.headers.get('Authorization'))
        this.router.navigate(['/home', 'detalhe'])
      })
  }

}
