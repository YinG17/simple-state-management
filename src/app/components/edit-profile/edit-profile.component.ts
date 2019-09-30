import { Component, OnInit, Input } from '@angular/core';
import { Profile } from 'src/app/state/profile.model';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {

  @Input() profile: Profile;

  

  constructor() { }

  ngOnInit() {
  }


  editProfile() {

  }

}
