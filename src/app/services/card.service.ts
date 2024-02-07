import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { CardCredit } from '../models/card';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  constructor(private firebase: AngularFirestore) { }

  saveCard(card: CardCredit): Promise<any> {
    return this.firebase.collection('cards').add(card);
  }
}
