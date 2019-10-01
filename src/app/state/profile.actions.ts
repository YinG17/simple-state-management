import { Profile } from './profile.model';

/**
 * `Action without payload`
 *
 * - this action simply contain a type which will serve as an Identifier.
 */
export class GetProfileList {
  static readonly type = '[Profile] List';
}

/**
 * `Actions with payload`
 *
 * - contains a type as the action's identifier
 * - this actions accepts argument with a certain type.
 */
export class AddProfile {
  static readonly type = '[Profile] Add';
  constructor(public profile: Profile) { }
}

export class EditProfile {
  static readonly type = '[Profile] Edit';
  constructor(public profile: Profile) { }
}

export class DeleteProfile {
  static readonly type = '[Profile] Delete';
  constructor(public id: number) { }
}



