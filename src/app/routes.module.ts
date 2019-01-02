import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

/*[ Component ]*/
import { AppComponent } from './app.component';
import { ShopingCartComponent } from './component/shoping-cart/shoping-cart.component';
import { HomeComponent } from './component/home/home.component';
import { ProductOverviewComponent } from './component/product-overview/product-overview.component';
import { AdminComponent } from './component/admin/admin.component';
import { HeaderComponent } from './component/header/header.component';
import { AddProductComponent } from './component/admin/add-product/add-product.component';
import { AddUserComponent } from './component/admin/add-user/add-user.component';
import { AddColorComponent } from './component/admin/add-color/add-color.component';
import { ListProductComponent } from './component/admin/list-product/list-product.component';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { CheckLoginGuard } from './guard/check-login/check-login.guard';
import { CheckRoleGuard } from './guard/check-role/check-role.guard';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {
    path: '', component: HeaderComponent,
    children : [
      {path: 'home', component: HomeComponent, canActivate: [CheckLoginGuard]},
      {path: 'shoping-cart', component: ShopingCartComponent},
      {path: 'product-overview', component: ProductOverviewComponent},
    ]
  },
  {
    path: 'admin', component: AdminComponent, canActivate: [CheckLoginGuard, CheckRoleGuard],
    children : [
      {path: 'add-product', component: AddProductComponent},
      {path: 'add-user', component: AddUserComponent},
      {path: 'add-color', component: AddColorComponent},
      {path: 'list-product', component: ListProductComponent}
    ]
  }
  
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  declarations: []
})
export class RoutesModule { }
