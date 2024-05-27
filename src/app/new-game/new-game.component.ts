import { DbInsertPlayerService } from './../dbInsert-player.service';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IconsComponent } from '../icons/icons.component';
import { Player } from '../player/player';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-new-game',
  standalone: true,
  imports: [RouterLink, IconsComponent, ReactiveFormsModule],
  templateUrl: './new-game.component.html',
  styleUrl: './new-game.component.css'
})
export class NewGameComponent {
  constructor(
    public dbInsertPlayerService: DbInsertPlayerService
  ) {}

  form = new FormGroup({
    characterName: new FormControl(''),
    characterClass: new FormControl('warrior' || 'thief'),
  });

  public createPlayer() {
    const player = new Player(
      this.getCharacterNameFromForm(this.form),
      this.getCharacterClassFromForm(this.form)
    );
    // this.test(player);
    this.dbInsertPlayerService.createPlayer(player);
  }
  public getCharacterNameFromForm(form: typeof this.form) {
    let characterName = form.get('characterName')?.value;
    characterName = characterName ? characterName : 'Beleg'

    return characterName;
  }
  public getCharacterClassFromForm(form: typeof this.form) {
    let characterClass = form.get('characterClass')?.value;
    characterClass = characterClass ? characterClass : 'warrior'

    return characterClass;
  }

  public test(testSubject:any) {
    console.log(testSubject);
  }
  
}

