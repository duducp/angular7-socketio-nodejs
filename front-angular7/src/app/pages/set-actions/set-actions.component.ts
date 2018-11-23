import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import * as _ from 'lodash';
import * as moment from 'moment';
import { Socket } from 'ngx-socket-io';

@Component({
  selector: 'app-set-actions',
  templateUrl: './set-actions.component.html',
  styleUrls: ['./set-actions.component.css']
})
export class SetActionsComponent implements OnInit {
  empresa: any;
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private location: Location,
    private socket: Socket
  ) {
    this.form = this.formBuilder.group({
      valor_acao: [null, [Validators.required]],
    });
  }

  ngOnInit() {
    this.socket.connect();
    const id = parseInt(this.route.snapshot.params['id'], 10);
    const empresas = _.cloneDeep(JSON.parse(atob(localStorage.getItem('empresas'))));
    this.empresa = _.filter(empresas, { 'id': id })[0];

    this.form.patchValue({
      valor_acao: this.empresa['valor_acao']
    })
  }

  onSubmit() {
    const data = _.cloneDeep(this.empresa);
    const form = _.cloneDeep(this.form.value);
    data['valor_acao'] = form['valor_acao'];
    data['atualizado_em'] = moment().format();

    this.socket.emit('SEND_MESSAGE', data);
    this.cancelar();
  }

  cancelar() {
    this.location.back();
  }

}
