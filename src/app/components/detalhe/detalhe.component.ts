import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClienteService } from '../../services/cliente.service';
import { StorageService } from '../../services/storage.service';
import { Cliente } from '../../shared/cliente.model';

@Component({
  selector: 'app-detalhe',
  templateUrl: './detalhe.component.html',
  styleUrls: ['./detalhe.component.css']
})
export class DetalheComponent implements OnInit {

  cliente: Cliente

  constructor(
    private router: Router,
    public clienteService: ClienteService, 
    public storageService: StorageService
  ) { }

  ngOnInit() {
    if (this.storageService.isUserLogged()) {
      this.carregarDados()
    }
    else {
      this.router.navigate(['/login'])
    }
  }

  carregarDados() {
    this.clienteService.getClienteInfo(this.storageService.getLocalUser().email)
    .then((cliente: Cliente) => {
        this.cliente = cliente
    })
  }

}
