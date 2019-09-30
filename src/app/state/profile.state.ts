import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Profile } from '../models/profile.model';

import { AddProfile, DeleteProfile, EditProfile } from '../actions/profile.actions';

export class ProfileStateModel {
  profiles: Profile[];
}

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
    window['profileState'] = this;
  }

  @Selector()
  static getProfileList(state: ProfileStateModel) {
    return state.profiles;
  }

  @Action(AddProfile) // `AddProfile` is a method imported from `profile.actions.ts`.
  addProfile(
    { getState, patchState }: StateContext<ProfileStateModel>,
    { profile }: AddProfile
  ) {
    const state = getState(); // get current `ProfileState`

    let currId = 0;
    if (!state.profiles.length) {
      currId = 1;
    } else {
      currId = state.profiles.length + 1;
    }
    profile.id = currId;

    patchState({ // patching profile state with the current `profileState` and the new one added.
      profiles: [...state.profiles, profile]
    });
  }

  @Action(DeleteProfile) // `AddProfile` is a method imported from `profile.actions.ts`.
  deleteProfile(
    { getState, patchState }: StateContext<ProfileStateModel>,
    { id }
  ) {
    // console.log('ID to delete: ', id);

    const state = getState();
    patchState({
      profiles: state.profiles.filter(profile => profile.id !== id)
    });
  }
}
