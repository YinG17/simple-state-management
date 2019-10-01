import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Profile } from './state/profile.model';
import { ProfileState, ProfileStateModel } from './state/profile.state';
import { Observable, pipe } from 'rxjs';
import { Select, Store } from '@ngxs/store';
import { AddProfile, DeleteProfile } from './state/profile.actions';
import { withLatestFrom } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {

  idOnEdit = 0;
  submit = false;

  form = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(5)]]
  });


  @Select(ProfileState.getState)
  currentState: Observable<ProfileStateModel>;

  /**
   * Select a certain slice from the Store.
   *
   * this can be referenced if we would like to get the state even without invoking a function from it.
   */
  @Select(ProfileState.getProfileList)
  profileList: Observable<Profile[]>;

  constructor(private fb: FormBuilder, private store: Store) {
  }

  addProfile() {
    if ( this.form.invalid ) {
      alert('invalid name!');
      return;
    }

    this.submit = true;

    /**
     * dispatching a certain predefined action from the store.
     */
    this.store.dispatch(new AddProfile(this.form.value)).pipe(
      /**
       * this will get the latest state of a store slice.
       *
       * for example if we have a `profiles` and `posts` state in our store
       * we can get the `latest` data collection of the `posts` state just by referencing it with `withLatestFrom(posts)`
       * 
       * the return value we will recieve then is the `profiles` state along with the latest data collection from `posts` state.
       * 
       * @example
       * - this.store.dispatch(new AddProfile(newProfile))
       *      .pipe(withLatestFrom(postList))
       *     .subscribe(([profileList, postList]));
       */
      withLatestFrom(this.profileList)
    ).subscribe(
      ([profiles, latest]) => {
        console.log('profiles', profiles);
        console.log('latest', latest);
        alert('profile added!');
        this.form.patchValue({name: ''});
        this.submit = false;
      });
  }


  deleteProfile(id: number) {
    this.store.dispatch(new DeleteProfile(id)).subscribe(() => {
        /**
         * since the state handle the management of itself, we only need to wait for it's completion.
         */
      alert('profile deleted!');
    });
  }

  /**
   * non state things, ignore ....
   */
  get minErr() {
    return this.form.get('name').hasError('minlength');
  }

  get reqErr() {
    return this.form.get('name').hasError('required');
  }

  get touched() {
    return this.form.get('name').touched;
  }
}
