import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { AuthService } from './auth.service';
import { CommonModule } from '@angular/common';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [ReactiveFormsModule, InputTextModule, PasswordModule,
    ButtonModule, InputGroupModule, InputGroupAddonModule, CommonModule, ],
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  loginForm!: FormGroup;
  @Output() loggedIn = new EventEmitter<boolean>();
  showPassword = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    console.log(this.loginForm.value);
    this.authService.login(this.loginForm.value).subscribe({
      next: (response: any) => {
        this.messageService.add({ severity: 'success', summary: 'Login successful', detail: 'Welcome back!' });
      },
      error: (error) => {
        console.error('Error logging in:', error);
        this.messageService.add({ severity: 'error', summary: 'Login failed', detail: 'Invalid credentials' });
      }
    });
  }

}
