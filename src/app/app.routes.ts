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
import { authGuard } from './services/auth-guard';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';

export const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'login', component: LoginFormComponent },
  { path: 'register', component: RegisterFormComponent },
  { path: 'unauthorized', component: UnauthorizedComponent },
  {
    path: 'account',
    component: AccountComponent,
    canActivate: [() => authGuard(['ROLE_USER', 'ROLE_ADMIN'])],
  },
  {
    path: 'update',
    component: EditAccountComponent,
    canActivate: [() => authGuard(['ROLE_USER', 'ROLE_ADMIN'])],
  },
  {
    path: 'lists',
    component: TodosPageComponent,
    canActivate: [() => authGuard(['ROLE_USER', 'ROLE_ADMIN'])],
  },
  {
    path: 'users',
    component: UsersListComponent,
    canActivate: [() => authGuard(['ROLE_ADMIN'])],
  },
  {
    path: 'user/:id',
    component: UserInfoComponent,
    canActivate: [() => authGuard(['ROLE_ADMIN'])],
  },
  {
    path: 'addAdmin',
    component: AddAdminComponent,
    canActivate: [() => authGuard(['ROLE_ADMIN'])],
  },
];
