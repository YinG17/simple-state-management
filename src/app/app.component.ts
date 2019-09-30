import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Profile } from './state/profile.model';
import { ProfileState } from './state/profile.state';
import { Observable, pipe } from 'rxjs';
import { Select, Store } from '@ngxs/store';
import { GetProfileList, AddProfile, DeleteProfile } from './state/profile.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  @Select(ProfileState.getProfileList)
  profileList: Observable<Profile[]>;

  submit = false;

  form = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(5)]]
  });

  profiles: Profile[];

  constructor(private fb: FormBuilder, private store: Store) {
    this.store.dispatch(new GetProfileList()).subscribe();
  }

  addProfile() {
    if ( this.form.invalid ) {
      alert('name must be 5 characters and above');
      return;
    }
    this.submit = true;
    this.store.dispatch(new AddProfile(this.form.value)).subscribe(
      () => {
        alert('profile added!');
        this.form.patchValue({name: ''});
        this.submit = false;
      });
  }


  deleteProfile(id: number) {
    // console.log('delete profile with id: ', id);
    this.store.dispatch(new DeleteProfile(id)).subscribe(() => {
      alert('profile deleted!');
    });
  }

  get minErr() {
    return this.form.get('name').hasError('minlength');
  }


  get reqErr() {
    return this.form.get('name').hasError('required');
  }
}
