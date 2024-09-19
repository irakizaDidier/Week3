import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { HttpClientModule } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MainContentComponent } from './components/main-content/main-content.component';
import { themeReducer } from './store/reducers/theme.reducer';
import { environment } from '../environment/environment';
import { taskReducer } from './store/reducers/task.reducers';
import { TaskEffects } from './store/effects/task.effects';
import { TaskModalComponent } from './components/task-modal/task-modal.component';
import { CreateBoardModalComponent } from './components/create-board-modal/create-board-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    NavbarComponent,
    MainContentComponent,
    TaskModalComponent,
    CreateBoardModalComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    EffectsModule.forRoot([TaskEffects]),
    StoreModule.forRoot({
      theme: themeReducer,
      tasks: taskReducer,
    }),
    HttpClientModule,
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
