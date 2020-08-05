import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../../services/cliente.service';
import { StorageService } from '../../services/storage.service';
import { Conta } from '../../shared/conta.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-saldo',
  templateUrl: './saldo.component.html',
  styleUrls: ['./saldo.component.css']
})
export class SaldoComponent implements OnInit {

  saldoCliente: number = 0
  contasCliente: number = 0

  constructor(
    public router: Router,
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
    this.clienteService.getContasCliente(this.storageService.getLocalUser().email)
      .then((contas: Conta[]) => {
        contas.map(conta => {
          this.saldoCliente += conta.saldo
          this.contasCliente++
        })
      })
  }

}
