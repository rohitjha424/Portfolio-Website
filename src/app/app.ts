import { Component } from '@angular/core';
import { Navbar } from './components/navbar/navbar';
import { Footer } from './components/footer/footer';
import { Home } from './pages/home/home';

@Component({
  selector: 'app-root',
  imports: [Navbar, Footer, Home],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {}