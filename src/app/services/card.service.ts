import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { CardCredit } from '../models/card';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  private tarjeta$ = new Subject<any>;

  constructor(private firebase: AngularFirestore) { }

  saveCard(card: CardCredit): Promise<any> {
    return this.firebase.collection('cards').add(card);
  };

  getCards(): Observable<any> {
    // Aquí es donde aplicamos el ordenamiento por 'createDate' de forma descendente
    return this.firebase.collection('cards', ref => ref.orderBy('createDate', 'desc')).snapshotChanges();
  };

  deleteCard(id: string): Promise<any> {
    return this.firebase.collection('cards').doc(id).delete();
  };

  addCardEdit(card: CardCredit) {
    this.tarjeta$.next(card);
  };

  getCard(): Observable<CardCredit> {
    return this.tarjeta$.asObservable()
  };

  editCard(id: string, card: any): Promise<any> {
    return this.firebase.collection('cards').doc(id).update(card)
  }
}
