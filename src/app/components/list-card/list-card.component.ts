import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CardCredit } from 'src/app/models/card';
import { CardService } from 'src/app/services/card.service';

@Component({
  selector: 'app-list-card',
  templateUrl: './list-card.component.html',
  styleUrls: ['./list-card.component.css']
})
export class ListCardComponent implements OnInit {

  constructor(private _cardService: CardService, private toast: ToastrService) { };

  listCard: CardCredit[] = [];

  ngOnInit(): void {
    this.getCards();
  }

  getCards() {
    this._cardService.getCards().subscribe(cards => {
      console.log(cards);
      this.listCard = [];
      cards.forEach((card: any) => {
        this.listCard.push({
          id: card.payload.doc.id,
          ...card.payload.doc.data()
        })
      });
      console.log(this.listCard)
    })
  };

  deleteCard(id: any){
    this._cardService.deleteCard(id).then(() => {
      this.toast.success('Card Eliminate to the DataBase', 'Registerd eliminated')
    },error => {
      console.log(error)
      this.toast.error('Error','Error deleting card')
    })
  };

  modificationCard(card: any){
    this._cardService.addCardEdit(card);
  }
}
