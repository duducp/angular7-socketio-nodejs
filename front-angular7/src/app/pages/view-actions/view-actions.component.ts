import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as _ from 'lodash';
import { Socket } from 'ngx-socket-io';

interface Empresa {
  id: number,
  nome: string,
  valor_acao: number,
  atualizado_em?: Date
}


@Component({
  selector: 'app-view-actions',
  templateUrl: './view-actions.component.html',
  styleUrls: ['./view-actions.component.css']
})
export class ViewActionsComponent implements OnInit {

  empresas: Array<Empresa> = [];

  constructor(
    private router: Router,
    private socket: Socket
    ) { }

  ngOnInit() {
    const empresasLocal = [
      {
        id: 1,
        nome: "Empresa 1",
        valor_acao: 15000
      },
      {
        id: 2,
        nome: "Empresa 2",
        valor_acao: 10000
      },
      {
        id: 3,
        nome: "Empresa 3",
        valor_acao: 12000
      },
      {
        id: 4,
        nome: "Empresa 4",
        valor_acao: 13000
      },
      {
        id: 5,
        nome: "Empresa 5",
        valor_acao: 50000
      },
    ]

    this.empresas = _.cloneDeep(this.pegaEmpresasLocal());
    if (!this.empresas) {
      this.empresas = _.cloneDeep(empresasLocal);
      this.setaEmpresasLocal(empresasLocal);
    }

    this.socket.connect();
    this.getMessage();
  }

  protected setaEmpresasLocal(empresas) {
    try {
      localStorage.setItem('empresas', btoa(JSON.stringify(empresas)));
    } catch (e) {
      console.log(e)
    }
  }

  protected pegaEmpresasLocal() {
    try {
      return JSON.parse(atob(localStorage.getItem('empresas'))) || null;
    } catch(e) {
      console.log(e)
    }
  }

  protected getMessage() {
    this.socket.on("MESSAGE", res => {
      const index = _.findIndex(this.empresas, { id: parseInt(res.id, 10) });
      this.empresas[index]['valor_acao'] = res.valor_acao;
      this.empresas[index]['atualizado_em'] = res.atualizado_em;
      this.setaEmpresasLocal(this.empresas);
    })
  }

  protected editar(id) {
    this.router.navigate(['/' + id]);
  }
}
