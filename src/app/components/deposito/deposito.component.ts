import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Conta } from '../../shared/conta.model';
import { ClienteService } from '../../services/cliente.service';
import { StorageService } from '../../services/storage.service';
import { ContaCorrenteService } from '../../services/contacorrente.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import swal from 'sweetalert2'

@Component({
  selector: 'app-deposito',
  templateUrl: './deposito.component.html',
  styleUrls: ['./deposito.component.css'],
  providers: [ContaCorrenteService]
})
export class DepositoComponent implements OnInit {

  contas: Conta[]
  saldoCliente: number = 0
  
  public formDeposito: FormGroup = new FormGroup({
    "valorDeposito": new FormControl(null, [ Validators.required, Validators.min(1) ]),
    "contaDeposito": new FormControl(null, [ Validators.required ])
  })

  constructor(
    public router: Router,
    public clienteService: ClienteService, 
    public storageService: StorageService,
    public contaCorrenteService: ContaCorrenteService
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
        this.contas = contas
        contas.map(conta => {
          this.saldoCliente += conta.saldo
        })
      })
  }

  depositar() {
    let contaAtual = this.contas.find(conta => conta.id == this.formDeposito.get('contaDeposito').value)

    if (contaAtual.estado == 'ABERTA') {
    
      let contaDeposito: Conta = {
        id: contaAtual.id,
        estado: contaAtual.estado,
        saldo: contaAtual.saldo + parseInt(this.formDeposito.get('valorDeposito').value)
      }

      this.contaCorrenteService.atualizarSaldo(contaDeposito)
        .subscribe(() => {
          this.depositoComSucesso()
            .then(() => window.location.reload())
        })
    } else {
      this.contaFechada()
    }
  }

  async depositoComSucesso() {
    await swal.fire('Depósito feito com Sucesso!', 'Parabéns, seu depósito foi confirmado.', 'success')
  }

  async contaFechada() {
    await swal.fire('Conta encerrada.', 'A conta selecionada se encontra fechada, selecione outra conta.', 'error')
  }

}
