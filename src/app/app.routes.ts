import { Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { RegisterFormComponent } from './register-form/register-form.component';
import { AccountComponent } from './account/account.component';
import { EditAccountComponent } from './edit-account/edit-account.component';
import { TodosPageComponent } from './todos-page/todos-page.component';
import { UsersListComponent } from './users-list/users-list.component';
import { UserInfoComponent } from './user-info/user-info.component';
import { AddAdminComponent } from './add-admin/add-admin.component';

export const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'login', component: LoginFormComponent },
  { path: 'register', component: RegisterFormComponent },
  { path: 'account', component: AccountComponent },
  { path: 'update', component: EditAccountComponent },
  { path: 'lists', component: TodosPageComponent },
  { path: 'users', component: UsersListComponent },
  { path: 'user/:id', component: UserInfoComponent },
  { path: 'addAdmin', component: AddAdminComponent },
];
