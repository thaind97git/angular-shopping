import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS} from "@angular/common/http";
import { HttpModule } from '@angular/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

//Service
import { Constants } from './constants';
import { ProductService } from './service/product_service/product.service';

//Component
import { AppComponent } from './app.component';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { HomeComponent } from './component/home/home.component';
import { HeaderComponent } from './component/header/header.component';
import { ProductOverviewComponent } from './component/product-overview/product-overview.component';
import { SliderHomeComponent } from './component/slider-home/slider-home.component';
import { ShopingCartComponent } from './component/shoping-cart/shoping-cart.component';
import { AdminComponent } from './component/admin/admin.component';
import { AddProductComponent } from './component/admin/add-product/add-product.component';
import { AddUserComponent } from './component/admin/add-user/add-user.component';
import { AddColorComponent } from './component/admin/add-color/add-color.component';
import { ListProductComponent } from './component/admin/list-product/list-product.component';

import { RoutesModule } from './/routes.module';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MatButtonModule, MatCheckboxModule, 
        MatSelectModule, MatIconModule, MatFormFieldModule, 
        MatInputModule, MatCardModule, MatTabsModule, MatTableModule, MatPaginatorModule,
        MatHeaderRowDef} from '@angular/material';
import { NgMaterialMultilevelMenuModule } from 'ng-material-multilevel-menu';
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';

import { ToastrModule } from 'ngx-toastr';
import { TokenInterceptor } from './token-interceptor';
import {SlideshowModule} from 'ng-simple-slideshow';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    HeaderComponent,
    ProductOverviewComponent,
    SliderHomeComponent,
    ShopingCartComponent,
    AdminComponent,
    AddProductComponent,
    AddUserComponent,
    AddColorComponent,
    ListProductComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    ConfirmationPopoverModule.forRoot({
      confirmButtonType: 'danger'
    }),
    HttpModule,
    MatButtonModule,
    MatCheckboxModule,
    MatSelectModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatTabsModule,
    MatPaginatorModule,
    MatTableModule,
    BrowserModule,
    
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RoutesModule,
    NgMaterialMultilevelMenuModule,
    SlideshowModule
  ],
  providers: [ProductOverviewComponent, Constants, ProductService],
  bootstrap: [AppComponent]
})
export class AppModule { }
