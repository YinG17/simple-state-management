import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgxsModule } from '@ngxs/store';
import { ProfileState } from './state/profile.state';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { SearchProfileComponent } from './components/search-profile/search-profile.component';
import { environment } from 'src/environments/environment.prod';

@NgModule({
  declarations: [
    AppComponent,
    EditProfileComponent,
    SearchProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgxsModule.forRoot([ProfileState], {   // initialize ProfileState
      developmentMode: true                // must be set to true when in dev mode.
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
