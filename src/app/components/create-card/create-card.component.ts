import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CardCredit } from 'src/app/models/card';
import { CardService } from 'src/app/services/card.service';

@Component({
  selector: 'app-create-card',
  templateUrl: './create-card.component.html',
  styleUrls: ['./create-card.component.css']
})
export class CreateCardComponent implements OnInit {

  forms: FormGroup;
  loading: boolean = false;
  title = 'Add Card';
  id: string | undefined;

  constructor(private fb: FormBuilder, private _cardService: CardService, private toastr: ToastrService) {

    this.forms = this.fb.group({
      headline: ['', Validators.required],
      cardNumber: ['', [Validators.required, Validators.minLength(16), Validators.maxLength(16)]],
      securityCode: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(3)]],
      expirationDate: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(5)]],

    })
  };

  ngOnInit(): void {
    this._cardService.getCard().subscribe(res => {
      this.title = 'Edit Card';
      this.id = res.id;
      this.forms.patchValue({
        headline: res.headline,
        cardNumber: res.cardNumber,
        expirationDate: res.expirationDate,
        securityCode: res.securityCode
      })
      console.log(res)
    })
  };

  saveCard() {
    if (this.id === undefined) {
      //created card
      this.createdCard();
    } else {
      //edit card
      this.editCard(this.id);
    }
  };

  editCard(id: string) {
    const cardData: any = {
      headline: this.forms.value.headline,
      expirationDate: this.forms.value.expirationDate,
      cardNumber: this.forms.value.cardNumber,
      securityCode: this.forms.value.securityCode,
      createDate: new Date(),
      refreshDate: new Date()
    };
    this.loading = true
    this._cardService.editCard(id, cardData).then(() => {
      this.loading = false
      this.toastr.info('Edit is Succesfully', 'Success');
      this.forms.reset();
      this.title = 'Add Card';
      this.id = undefined;
    })
  }

  createdCard() {
    const cardData: CardCredit = {
      headline: this.forms.value.headline,
      expirationDate: this.forms.value.expirationDate,
      cardNumber: this.forms.value.cardNumber,
      securityCode: this.forms.value.securityCode,
      createDate: new Date(),
      refreshDate: new Date()
    }
    // console.log(cardData)
    this.loading = true;
    this._cardService.saveCard(cardData).then(() => {
      // console.log('Card save');
      this.loading = false;
      this.toastr.success('Save card succesfully', 'success')
      this.forms.reset()
    }, error => {
      this.loading = false;
      this.toastr.error('Error saving card', 'Error saving card');
      console.log(error);
    })
  };

}
