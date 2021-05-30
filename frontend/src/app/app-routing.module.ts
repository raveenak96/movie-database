import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MylistComponent } from './mylist/mylist.component'
import { WatchComponent } from './watch/watch.component';
import { HomeComponent } from './home/home.component'


const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  }, 
  { path: 'watch/:mediaType/:id', component: WatchComponent,
    data: {
      shouldReuseRoute: false
    },
  runGuardsAndResolvers: 'always' },
  { path: 'mylist', component: MylistComponent },
  {path: '**', component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{onSameUrlNavigation: 'reload',scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
