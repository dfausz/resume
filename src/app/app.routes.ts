import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ContentComponent } from './content/content.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, data: { animation: 'HomeComponent' } },
  { path: 'content', component: ContentComponent}
//   { path: 'skills', component: SkillsComponent },
//   { path: '404', component: AboutComponent},
//   { path: '*', component: AboutComponent},
];
