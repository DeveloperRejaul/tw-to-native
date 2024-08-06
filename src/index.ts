import { TailwindToNativeStyle } from './TailwindToNativeStyle';

(async () => {
  const gn = new TailwindToNativeStyle();
  await gn.init();
  gn.generate('profile-profile.ts: flex flex-1 justify-center items-center');
})();