import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JuegaComponent } from './pages/juega/juega.component';

const routes: Routes = [{ path: '/', component: JuegaComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
