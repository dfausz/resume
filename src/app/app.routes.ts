import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { ExperienceComponent } from './experience/experience.component';
// import { SkillsComponent } from './skills/skills.component';

export const routes: Routes = [
  { path: 'about', component: AboutComponent},
  { path: '', component: ExperienceComponent },
//   { path: 'skills', component: SkillsComponent },
//   { path: '404', component: AboutComponent},
//   { path: '*', component: AboutComponent},
];
