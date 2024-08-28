import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-add-admin',
  standalone: true,
  imports: [FormsModule, MatSnackBarModule, FontAwesomeModule],
  templateUrl: './add-admin.component.html',
  styleUrl: './add-admin.component.scss',
})
export class AddAdminComponent {
  faTrashCan = faTrashCan;
  url!: string | null;
  constructor(
    private adminService: AdminService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}
  onSubmit(form: NgForm) {
    if (form.invalid) {
      this.showSnackBar('All fields are required');
      return;
    }
    if (form.value.password !== form.value.confirmPassword) {
      this.showSnackBar('Passwords do not match');
      return;
    }
    this.adminService
      .addAdmin(
        form.value.username,
        form.value.fname,
        form.value.lname,
        form.value.password,
        this.url
      )
      .subscribe({
        next: () => {
          console.log('Admin added successfully');
          this.router.navigate(['/users']);
          this.showSnackBar('Admin added successfully.');
        },
        error: (err) => {
          console.error('Register failed', err);
          this.showSnackBar('This username is taken.');
        },
      });
  }

  onSelectFile(event: any) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      console.log(event.target.files[0]);
      reader.onload = (event: any) => {
        this.url = event.target.result;
      };
    }
  }

  cancelPhoto() {
    this.url = null;
  }

  private showSnackBar(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
    });
  }
}
