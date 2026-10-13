import SiteLayout from "./(site)/layout";
import NotFound from "./(site)/not-found";

/** Unmatched URLs render outside the (site) group, so wrap them in the site chrome here. */
export default function RootNotFound() {
  return (
    <SiteLayout>
      <NotFound />
    </SiteLayout>
  );
}
