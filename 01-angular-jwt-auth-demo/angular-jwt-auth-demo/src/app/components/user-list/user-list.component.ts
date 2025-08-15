import { Component, OnInit } from '@angular/core';
import { UserService } from '../user-form/user.service';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [TableModule, CommonModule],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  users: any[] = [];
  loading = true;
  error: string | null = null;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getUsers().subscribe({
      next: (data: any) => {
        this.users = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Token not present';
        this.loading = false;
      }
    });
  }
}
