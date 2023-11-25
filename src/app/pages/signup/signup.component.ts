import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { Subject, takeUntil } from 'rxjs'
import { User } from 'src/app/interfaces/user.interface'
import { ApiHttpService } from 'src/app/services/api-http.service'

export interface UserApi {
  user: User
}
@Component({
  selector: 'signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  form!: FormGroup
  destroy$: Subject<boolean> = new Subject<boolean>()

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiHttpService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      email: [''],
      password: [''],
    })
  }

  submit(): void {
    const data: UserApi = { user: this.form.value }
    this.apiService
      .post(`api/v1/users`, data)
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
}
