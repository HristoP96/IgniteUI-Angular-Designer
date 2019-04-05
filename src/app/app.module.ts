import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {IgxGridModule,
       IgxIconModule,
       IgxNavigationDrawerModule,
       IgxCardModule,
       IgxComboModule,
       IgxRadioModule,
       IgxGridComponent,
       IgxSwitchModule,
       IgxDropDownModule,
       IgxHierarchicalGridModule,
       IgxTreeGridModule,
       IgxSelectModule,
       IgxHierarchicalGridComponent,
       IgxTreeGridComponent,
       IgxComboComponent,
       IgxCheckboxModule
      } from 'igniteui-angular';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PageHeaderComponent } from './future-work/page-header/page-header.component';
import { FormsModule } from '@angular/forms';
import { FilterPipePipe } from './filter-pipe.pipe';
import { DesignAreaComponent } from './design-area/design-area.component';
import { StashComponent } from './future-work/stash/stash.component';
import {HttpClientModule} from '@angular/common/http';
import { DataService } from './data.service';
@NgModule({
  declarations: [
    AppComponent,
    PageHeaderComponent,
    FilterPipePipe,
    DesignAreaComponent,
    StashComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    IgxGridModule,
    IgxIconModule,
    IgxNavigationDrawerModule,
    IgxCardModule,
    IgxComboModule,
    IgxRadioModule,
    HttpClientModule,
    IgxSwitchModule,
    IgxDropDownModule,
    IgxHierarchicalGridModule,
    IgxTreeGridModule,
    IgxSelectModule,
    IgxCheckboxModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent],
  entryComponents: [IgxGridComponent, IgxHierarchicalGridComponent, IgxTreeGridComponent, IgxComboComponent]
})
export class AppModule {

}
