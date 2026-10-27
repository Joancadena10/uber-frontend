import { Component, inject, signal } from '@angular/core';
import {
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
  NavigationEnd
} from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  private router = inject(Router);

  ruta = signal('/login');
  sesion = signal(false);
  rol = signal('');
  nombre = signal('');

  constructor() {
    this.actualizarSesion();

    this.router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe(e => {
        this.ruta.set(e.urlAfterRedirects.split('?')[0]);
        this.actualizarSesion();
      });
  }

  actualizarSesion() {
    this.sesion.set(!!sessionStorage.getItem('uber_token'));
    this.rol.set(sessionStorage.getItem('uber_rol') || '');
    this.nombre.set(sessionStorage.getItem('uber_nombre') || '');
  }

  cerrarSesion() {
    sessionStorage.removeItem('uber_token');
    sessionStorage.removeItem('uber_rol');
    sessionStorage.removeItem('uber_nombre');

    this.actualizarSesion();
    this.router.navigateByUrl('/login');
  }
}