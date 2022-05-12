import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [    //Imports modules
    BrowserModule
  ],
  providers: [],  //Imports components
  bootstrap: [AppComponent]
})
export class AppModule { }
