import { Component, OnDestroy, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { Subject } from 'rxjs'
import { UserApi } from 'src/app/interfaces/api.interface'
import { AuthService } from 'src/app/services/auth.service'

@Component({
  selector: 'signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit, OnDestroy {
  form!: FormGroup
  destroy$: Subject<boolean> = new Subject<boolean>()

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      email: [''],
      password: [''],
    })
  }

  signup(): void {
    const data: UserApi = { user: this.form.value }
    this.authService.signup(data).subscribe({
      next: () => this.router.navigate(['/']),
      error: (error) => console.error(error),
    })
  }

  ngOnDestroy(): void {
    this.destroy$.next(true)
    this.destroy$.unsubscribe()
  }
}
