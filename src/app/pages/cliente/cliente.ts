import { Component, inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-cliente',
  imports: [CurrencyPipe],
  templateUrl: './cliente.html',
  styleUrl: './cliente.css'
})
export class Cliente implements OnInit {

  private http = inject(HttpClient);

  tarifa: any = null;
  error = '';
  cargando = false;

  ngOnInit() {
    this.consultarTarifa();
  }

  consultarTarifa() {
    this.cargando = true;
    this.error = '';
    this.tarifa = null;

    // ENDPOINT DEL PROFESOR
    this.http.get<any>('/api/fares/active').subscribe({
      next: (respuesta) => {
        this.cargando = false;
        this.tarifa = respuesta.fare;

        if (!respuesta.success || !this.tarifa) {
          this.error = 'No se encontró una tarifa activa.';
        }
      },
      error: (err) => {
        this.cargando = false;
        this.error = `Error del servidor: HTTP ${err.status}`;
        console.error('Error API:', err);
      }
    });
  }
}