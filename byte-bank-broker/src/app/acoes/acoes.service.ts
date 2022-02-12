import { Acao, AcoesApi } from './modelo/acoes';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, pluck } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AcoesService {
  constructor(private httpCliente: HttpClient) {}

  //A ordem importa
  public getAcoes(valor: string = ""): Observable<any> {
    const params = valor ? new HttpParams().append('valor', valor) : undefined;
    return this.httpCliente
      .get<AcoesApi>('http://localhost:3000/acoes', { params })
      .pipe(
        pluck('payload'),
        map((acoes) =>
          acoes.sort((acaoA, acaoB) => this.ordenaPorCodigo(acaoA, acaoB))
        )
      );
  }

  private ordenaPorCodigo(acaoA: Acao, acaoB: Acao) {
    if (acaoA.codigo > acaoB.codigo) {
      return 1;
    }
    if (acaoA.codigo < acaoB.codigo) {
      return -1;
    }
    return 0;
  }
}
