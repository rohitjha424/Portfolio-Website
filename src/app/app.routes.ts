import { Routes } from '@angular/router';
import { Home } from '../app/pages/home/home';
import { About } from '../app/pages/about/about';
import { Projects } from '../app/pages/projects/projects';
import { Services } from '../app/pages/services/services';
import { Contact } from '../app/pages/contact/contact';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'about', component: About },
  { path: 'projects', component: Projects },
  { path: 'services', component: Services },
  { path: 'contact', component: Contact }
];