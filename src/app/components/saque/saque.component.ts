import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Conta } from '../../shared/conta.model';
import { ClienteService } from '../../services/cliente.service';
import { StorageService } from '../../services/storage.service';
import { ContaCorrenteService } from 'src/app/services/contacorrente.service';

import swal from 'sweetalert2'

@Component({
  selector: 'app-saque',
  templateUrl: './saque.component.html',
  styleUrls: ['./saque.component.css'],
  providers: [ContaCorrenteService]
})
export class SaqueComponent implements OnInit {

  contas: Conta[]
  saldoCliente: number = 0
  
  public formSaque: FormGroup = new FormGroup({
    "valorSaque": new FormControl(null, [ Validators.required, Validators.min(1) ]),
    "contaSaque": new FormControl(null, [ Validators.required ])
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

  sacar() {
    let contaAtual = this.contas.find(conta => conta.id == this.formSaque.get('contaSaque').value)

    if (contaAtual.estado == 'ABERTA') {
      if (contaAtual.saldo >= parseInt(this.formSaque.get('valorSaque').value)){
      
        let contaSaque: Conta = {
          id: contaAtual.id,
          estado: contaAtual.estado,
          saldo: contaAtual.saldo - parseInt(this.formSaque.get('valorSaque').value)
        }

        this.contaCorrenteService.atualizarSaldo(contaSaque)
          .subscribe(() => {
            this.saqueComSucesso()
              .then(() => window.location.reload())
          })
      } else {
        this.saldoInsuficiente()
      }
    } else {
      this.contaFechada()
    }
  }

  async saqueComSucesso() {
    await swal.fire('Saque feito com Sucesso!', 'Parabéns, seu saque foi confirmado.', 'success')
  }

  async saldoInsuficiente() {
    await swal.fire('Saldo insuficiente.', 'O saque não pode ser feito.', 'error')
  }

  async contaFechada() {
    await swal.fire('Conta encerrada.', 'A conta selecionada se encontra fechada, selecione outra conta.', 'error')
  }

}
