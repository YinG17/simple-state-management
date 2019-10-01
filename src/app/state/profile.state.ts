import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Profile } from './profile.model';
import { AddProfile, DeleteProfile, EditProfile } from './profile.actions';

export class ProfileStateModel {
  profiles: Profile[];
}


/**
 * state pretty much hold everything
 *
 * @description
 * - Each state can only hold a certain `state model`.
 * - Each state is a collection of data relevant to each other having the same interface.
 * - This `state` holds a collection of data which in this case is a collection of profile.
 *
 */
@State<ProfileStateModel>({
  name: 'profiles',
  defaults: {
    profiles: [
      { id: 1, name: 'Default Profile' }
    ]
  }
})
export class ProfileState {
  constructor() {
  }

  /**
   *
   * @param state the whole `profile` state
   *
   */
  @Selector()
  static getProfileList(state: ProfileStateModel) {
    return state.profiles;
  }

  /**
   *  `@Action` is a decorator which decorate a method with `action information`.
   *  `AddProfile` is the `action information` imported from `profile.actions.ts`.
   */
  @Action(AddProfile)
  /**
   * `addProfile` is where you can handle your business logic.
   * this can be named to as anything, following a certain naming convention.
   */
  addProfile(
    /**
     * `State Context`, this is where we can access a certain state given its model.
     *
     * we can pick which method to use from the state instead of referencing the whole state.
     */
    { getState, patchState }: StateContext<ProfileStateModel>,
    /**
     * the `payload` which will be passed on from `this.store.dispatch(new AddProfile(newProfile))`
     */
    { profile }: AddProfile 
  ) {
    /**
     * get current state from the `ProfileState`.
     */
    const state = getState();

    /**
     * do something with the state
     *
     * this is adding a new profile, which automatically increments the id to the highest profile id value from the list + 1.
     */
    let currId = 0;
    if (!state.profiles.length) {
      currId = 1;
    } else {
      currId = state.profiles[state.profiles.length - 1].id + 1;
    }
    profile.id = currId;

    /**
     * patching profile state with the current `profileState` and the new one added.
     */
    patchState({
      profiles: [...state.profiles, profile]
    });
  }

  @Action(DeleteProfile)
  deleteProfile(
    { getState, patchState }: StateContext<ProfileStateModel>,
    { id }: DeleteProfile
  ) {
    // console.log('ID to delete: ', id);

    const state = getState();
    patchState({
      profiles: state.profiles.filter(profile => profile.id !== id)
    });
  }

  @Action(EditProfile)
  editProfile(
    { getState, patchState }: StateContext<ProfileStateModel>,
    { profile }: EditProfile
  ) {
    const state = getState();
    const profileList = [...state.profiles];

    profileList.splice(profileList.findIndex(p => p.id === profile.id), 1, profile);
    patchState({
      profiles: profileList
    });
  }
}
