import { Component, OnDestroy, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { Subject, takeUntil } from 'rxjs'
import { UserApi } from 'src/app/interfaces/api.interface'
import { AuthService } from 'src/app/services/auth.service'

@Component({
  selector: 'signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent implements OnInit, OnDestroy {
  form!: FormGroup
  destroy$: Subject<boolean> = new Subject<boolean>()

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.setForm()
  }

  setForm(): void {
    this.form = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    })
  }

  signin(): void {
    const data: UserApi = { user: this.form.value }
    this.authService.signin(data)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response: UserApi) => {
          if (response?.user) {
            localStorage.setItem('user', JSON.stringify(response?.user))
            this.router.navigate(['/'])
          }
        },
        error: (error) => console.error(error),
      })
  }

  ngOnDestroy(): void {
    this.destroy$.next(true)
    this.destroy$.unsubscribe()
  }
}
