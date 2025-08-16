import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { UserService } from '../user-form/user.service';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth/auth.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';


@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [TableModule, CommonModule],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  private destroyRef = inject(DestroyRef);

  users: any[] = [];
  loading = false;
  error: string | null = null;

  constructor(
    private userService: UserService,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
     if (this.auth.isAuthenticated()) {
      this.error = null;
      this.loadUsers();
    } else {
      this.loading = false;
      this.error = 'Token not present';
    }

    this.auth.authState$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((logged) => {
        if (logged) {
          this.loadUsers();
        } else {
          this.users = [];
        }
      });
  }

  private loadUsers(): void {
    this.loading = true;
    this.error = null;

    this.userService.getUsers().subscribe({
      next: (data: any) => {
        this.users = data;
        this.loading = false;
      },
      error: () => {
        this.error = 'Token not present';
        this.loading = false;
      }
    });
  }
}
