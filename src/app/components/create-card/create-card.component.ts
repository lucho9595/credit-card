import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CardCredit } from 'src/app/models/card';
import { CardService } from 'src/app/services/card.service';

@Component({
  selector: 'app-create-card',
  templateUrl: './create-card.component.html',
  styleUrls: ['./create-card.component.css']
})
export class CreateCardComponent implements OnInit {

  forms: FormGroup;

  constructor(private fb: FormBuilder, private _cardService: CardService) {

    this.forms = this.fb.group({
      headline: ['', Validators.required],
      cardNumber: ['', [Validators.required, Validators.minLength(16), Validators.maxLength(16)]],
      securityCode: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(3)]],
      expirationDate: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(5)]],

    })
  };

  ngOnInit(): void {

  }

  createdCard() {
    console.log(this.forms);
    const cardData: CardCredit = {
      headline: this.forms.value.headline,
      expirationDate: this.forms.value.expirationDate,
      cardNumber: this.forms.value.cardNumber,
      securityCode: this.forms.value.securityCode,
      createDate: new Date(),
      refreshDate: new Date()
    }
    // console.log(cardData)
    this._cardService.saveCard(cardData).then(() => {
      console.log('Card save')
    }, error => {
      console.log(error);
    })
  }
}
