import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { MainContentComponent } from './main-content.component';

@NgModule({
  declarations: [MainContentComponent],
  imports: [CommonModule, HomeRoutingModule],
})
export class HomeModule {}
