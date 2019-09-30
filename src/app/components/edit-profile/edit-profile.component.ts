import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { Profile } from 'src/app/state/profile.model';
import { FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';
import { EditProfile } from 'src/app/state/profile.actions';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit, AfterViewInit {

  @Input() profile: Profile;

  form = this.fb.group({
    id: [0],
    name: ['', Validators.required, Validators.minLength(5)]
  });

  constructor(private fb: FormBuilder, private store: Store) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.form.patchValue(this.profile);
  }


  editProfile() {
    if (this.form.invalid) {
      return;
    }
    this.store.dispatch(new EditProfile(this.form.value)).subscribe(() => {
      alert(`Profile with ID: ${this.profile.id} has been successfully editted!`);
    });
  }

}
