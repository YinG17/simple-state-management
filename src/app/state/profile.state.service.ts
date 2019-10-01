import { Injectable } from '@angular/core';
import { ProfileState, ProfileStateModel } from './profile.state';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Profile } from './profile.model';
import { AddProfile, DeleteProfile, EditProfile, SearchProfile } from './profile.actions';
import { withLatestFrom } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ProfileStateService {


  @Select(ProfileState.getState)
  currentState: Observable<ProfileStateModel>;

  @Select(ProfileState.getProfileList)
  profileList: Observable<Profile[]>;

  @Select(ProfileState.searchProfile)
  profilesSearch: Observable<Profile[]>;

  constructor(private store: Store) { }

  /**
   * @description calls on the `AddProfile` action of the `ProfileState` to add a new profile to the profile state.
   *
   * @param profile profile to add to the state
   */
  addProfile(profile: Profile) {
    /**
     * dispatching a certain predefined action from the store.
     */
    return this.store.dispatch(new AddProfile(profile)).pipe(
      /**
       * this will get the latest state of a store slice.
       *
       * for example if we have a `profiles` and `posts` state in our store
       * we can get the `latest` data collection of the `posts` state just by referencing it with `withLatestFrom(posts)`
       *
       * the return value we will receive the `profiles` state along with the latest data collection from `posts` state.
       *
       * @example
       * - this.profileStateService.addProfile(this.form.value).subscribe(
       * ([profiles, posts]) => {
       *   console.log('profiles', profiles);
       *   console.log('posts', posts);
       * });
       */
      withLatestFrom(this.profileList)
    );
  }


  /**
   * @description calls on the `EditProfile` action of the `ProfileState` to update a profile.
   *
   * @param profile editted profile to be passed on to the state action.
   */
  editProfile(profile: Profile) {
    return this.store.dispatch(new EditProfile(profile));
  }

  /**
   * @description calls on the `SearchProfile` action of the `ProfileState` to update its `SearchText` property.
   *
   * @param search search string to be passd on to the state action.
   */
  searchProfile(search: string) {
    return this.store.dispatch(new SearchProfile(search));
  }

  /**
   * @description calls on the `DeleteProfile` action of the `ProfileState` to delete a profile from it.
   *
   * @param id id of a profile which will be passed on to the state action.
   */
  deleteProfile(id: number) {
    return this.store.dispatch(new DeleteProfile(id));
  }
}
