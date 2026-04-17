import { Component, OnInit } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { DbService } from './servicios/db.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.html'
})
export class App implements OnInit {
  constructor(private db: DbService) {}

  async ngOnInit() {
    await this.db.iniciar();
    console.log("Base de datos lista");
  }
}